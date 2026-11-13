# -*- coding: utf-8 -*-
"""Exercise the real Docker replacement flow with isolated synthetic frontend containers only."""
import argparse
import contextlib
import copy
from datetime import datetime
import hashlib
import importlib.util
import io
import json
import os
import re
import uuid
from pathlib import Path
import socket
import subprocess
import tempfile
import time
import traceback
from types import SimpleNamespace
from urllib.request import urlopen
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base-image', default='cotato-homepage-production:v1.0.8')
parser.add_argument('--run-id', default='docker-deploy-' + datetime.now(ZoneInfo('Asia/Seoul')).strftime('%Y%m%d-%H%M%S') + '-' + uuid.uuid4().hex[:6])
parser.add_argument('--output-dir', type=Path, default=ROOT/'.test-results')
args = parser.parse_args()
if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]{0,79}', args.run_id) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._/:@-]{0,200}', args.base_image):
    parser.error('A safe run ID and already loaded compatible base image are required.')
RUN = args.run_id
args.output_dir.mkdir(parents=True, exist_ok=True)
OUTPUT = args.output_dir / (RUN + '.json')
EVENTS = args.output_dir / (RUN + '.jsonl')
TEST_ENV = os.environ.copy()
LABEL = 'cotato.deployment-test=' + RUN


def now():
    return datetime.now(ZoneInfo('Asia/Seoul')).isoformat()


def cmd(args):
    p = subprocess.run(args, capture_output=True, text=True, timeout=90, env=TEST_ENV)
    if p.returncode:
        emit('fixture-command-stopped', operation='/'.join(args[:2]), exitCode=p.returncode)
        raise RuntimeError('Local fixture operation failed; raw output omitted.')
    return p.stdout.strip()


def emit(stage, **values):
    item = {'atKST': now(), 'stage': stage, **values}
    result['events'].append(item)
    with EVENTS.open('a', encoding='utf8') as f:
        f.write(json.dumps(item, ensure_ascii=False) + '\n')
    print(json.dumps(item, ensure_ascii=False), flush=True)


def case(name, function):
    try:
        function()
        emit('case-passed', case=name)
        result['passedCases'] += 1
    except Exception as error:
        emit('case-failed', case=name, errorType=type(error).__name__)
        result['failedCases'] += 1
        raise


assert not OUTPUT.exists() and not EVENTS.exists()
result = {'runId': RUN, 'sourceScriptSHA256': hashlib.sha256((ROOT/'homepage_frontend_deploy.py').read_bytes()).hexdigest(), 'purpose': 'Runtime policy validation, real isolated Docker replacement, and rollback', 'executionLocation': 'Local Docker AMD64 emulation; internal test network; synthetic settings only', 'startedAtKST': now(), 'successCriteria': 'Missing policy rejected; new image inherits limits/cache/auth fixture; failed replacement restores prior frontend; production actions0; cleanup succeeds', 'controlledSubstitutes': ['Backend health check is a local test substitute; no real backend or DB', 'New image changes source-revision metadata only; application filesystem is unchanged'], 'passedCases': 0, 'failedCases': 0, 'events': [], 'productionActions': 0}
OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf8')
token = uuid.uuid4().hex[:12]
network = 'cotato-deployment-test-' + token
name = 'cotato-deployment-test-frontend-' + token
image_name = 'cotato-homepage-deployment-fixture:' + token
docker_ready = False
network_created = False
image_created = False
canary = None
try:
    spec = importlib.util.spec_from_file_location('deployment', ROOT/'homepage_frontend_deploy.py')
    deploy = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(deploy)
    endpoint = json.loads(cmd(['docker', 'context', 'inspect']))[0]['Endpoints']['docker']['Host']
    if not endpoint.startswith('unix://'):
        raise ValueError('Only a local Unix Docker endpoint is allowed.')
    docker_socket = endpoint.removeprefix('unix://')
    TEST_ENV.pop('DOCKER_CONTEXT', None)
    TEST_ENV['DOCKER_HOST'] = endpoint
    docker_ready = True
    cmd(['docker', 'image', 'inspect', args.base_image])
    base_class = deploy.DockerConnection

    class LocalDockerConnection(base_class):
        """Connect tests to the local Docker Desktop socket, never a cloud endpoint."""

        def connect(self):
            self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            self.sock.connect(docker_socket)

    deploy.DockerConnection = LocalDockerConnection
    with tempfile.TemporaryDirectory(prefix='cotato-deploy-contract-') as temp:
        temp = Path(temp).resolve()
        cache = temp/'cache'
        cache.mkdir()
        cache.chmod(0o777)
        (cache/'.managed-generated-cache-v1').write_text('cotato-generated-image-cache-20261114-v1')
        deploy.CACHE = cache
        policy = {'version': 1, 'memoryMiB': 768, 'memorySwapTotalMiB': 768, 'nodeOldSpaceMiB': 192, 'environment': {'MALLOC_ARENA_MAX': '2', 'UV_THREADPOOL_SIZE': '2'}, 'readonlyRootfs': True, 'generatedImageCache': {'source': str(cache), 'target': deploy.TARGET, 'cleanupTriggerMiB': 512, 'cleanupTargetMiB': 384, 'quietSeconds': 60, 'cleanupTimer': deploy.TIMER}}
        policy_file = temp/'policy.json'
        policy_file.write_text(json.dumps(policy))
        load_policy = deploy.load_policy
        deploy.load_policy = lambda: load_policy(policy_file)

        def valid_policy():
            assert deploy.load_policy()['memoryMiB'] == 768

        case('valid-runtime-policy', valid_policy)
        for field in ['memoryMiB', 'nodeOldSpaceMiB', 'environment', 'generatedImageCache']:
            def invalid_policy(field=field):
                broken = copy.deepcopy(policy)
                del broken[field]
                policy_file.write_text(json.dumps(broken))
                try:
                    deploy.load_policy()
                except (ValueError, KeyError):
                    pass
                else:
                    raise AssertionError('Missing policy accepted.')
                finally:
                    policy_file.write_text(json.dumps(policy))
            case('reject-missing-' + field, invalid_policy)

        # Build a second immutable image with identical application bits and a distinct revision label.
        revision = hashlib.sha1(b'controlled-deployment-fixture-20261114').hexdigest()
        (temp/'Dockerfile').write_text('FROM ' + args.base_image + '\nLABEL org.opencontainers.image.revision="' + revision + '"\n')
        cmd(['docker', 'build', '--platform', 'linux/amd64', '--network', 'none', '--pull=false', '-t', image_name, str(temp)])
        image_created = True
        old_image = json.loads(cmd(['docker', 'image', 'inspect', args.base_image]))[0]['Id']
        new_image = json.loads(cmd(['docker', 'image', 'inspect', image_name]))[0]['Id']
        assert old_image != new_image
        cmd(['docker', 'network', 'create', '--internal', '--label', LABEL, network])
        network_created = True
        with socket.socket() as available_port:
            available_port.bind(('127.0.0.1', 0))
            port = str(available_port.getsockname()[1])
        cmd(['docker', 'run', '-d', '--name', name, '--platform', 'linux/amd64', '--network', network, '--label', LABEL, '--label', 'cotato.homepage.release=fixture-before', '--memory', '768m', '--memory-swap', '768m', '--cpus', '0.6', '--read-only', '--tmpfs', '/tmp:rw,nosuid,nodev,size=32m', '--env', 'NODE_OPTIONS=--max-old-space-size=192', '--env', 'HOSTNAME=0.0.0.0', '--env', 'TEST_AUTH_FIXTURE=synthetic-only', '--publish', '127.0.0.1:' + port + ':3000', args.base_image])
        original = deploy.docker('GET', '/containers/' + name + '/json')
        canary = cmd(['docker', 'create', '--name', name + '-canary', '--network', 'none', '--label', LABEL, args.base_image])
        deploy.FRONTEND_PORT = port
        deploy.HOME = 'http://127.0.0.1:' + port + '/'
        def fixture_health(url):
            if url == deploy.API_HEALTH:
                return True
            procedure = "fetch('http://127.0.0.1:3000/',{signal:AbortSignal.timeout(3000)}).then(r=>process.exit(r.status===200?0:1)).catch(()=>process.exit(1))"
            p = subprocess.run(['docker', 'exec', name, 'node', '-e', procedure], capture_output=True, text=True, timeout=10, env=TEST_ENV)
            return p.returncode == 0
        original_health = fixture_health
        deploy.healthy = fixture_health
        original_command = deploy.command
        deploy.command = lambda args: ('active\n' if args[1] == 'is-active' else 'enabled\n') if args[0] == 'systemctl' else original_command(args)
        deadline = time.monotonic() + 45
        while not original_health(deploy.HOME):
            assert time.monotonic() < deadline
            time.sleep(1)
        events = []
        deploy.emit = lambda stage, **values: (events.append({'stage': stage, **values}), emit(stage, **values))
        # Production run() enumerates all containers; tests restrict this view to labeled fixtures.
        raw_docker = deploy.docker

        def scoped_docker(method, path, body=None):
            if method == 'GET' and path == '/containers/json?all=true':
                return [c for c in raw_docker(method, path) if c.get('Labels', {}).get('cotato.deployment-test') == RUN]
            return raw_docker(method, path, body)

        deploy.docker = scoped_docker
        args = SimpleNamespace(image=new_image, release='fixture-after', mode='check')

        def plan_only():
            before = deploy.fingerprint(deploy.inspect(original['Id']))
            deploy.run(args)
            assert before == deploy.fingerprint(deploy.inspect(original['Id']))

        case('check-does-not-restart-or-create', plan_only)

        def candidate_only():
            before = deploy.fingerprint(deploy.inspect(original['Id']))
            args.mode = 'verify-candidate'
            deploy.run(args)
            assert before == deploy.fingerprint(deploy.inspect(original['Id']))
            assert any(x['stage'] == 'temporary-candidate-removed' for x in events)

        case('candidate-inherits-policy-without-start', candidate_only)

        def replace():
            args.mode = 'apply'
            deploy.run(args)
            current = deploy.docker('GET', '/containers/' + name + '/json')
            assert current['Image'] == new_image and current['State']['Running']
            env = dict(x.split('=', 1) for x in current['Config']['Env'])
            assert env['TEST_AUTH_FIXTURE'] == 'synthetic-only'
            assert env['MALLOC_ARENA_MAX'] == env['UV_THREADPOOL_SIZE'] == '2'
            assert env['NODE_OPTIONS'] == '--max-old-space-size=192'
            assert current['HostConfig']['Memory'] == current['HostConfig']['MemorySwap'] == 768*1024**2
            assert current['Config']['Labels']['org.opencontainers.image.revision'] == revision
            assert not deploy.inspect(original['Id'])['State']['Running']

        case('new-immutable-image-replacement-retains-runtime', replace)

        def rollback():
            current = deploy.docker('GET', '/containers/' + name + '/json')
            restart = copy.deepcopy(current['HostConfig']['RestartPolicy'])
            args.image = old_image
            ticks = iter([0, 1000])
            old_time = deploy.time
            deploy.time = SimpleNamespace(monotonic=lambda: next(ticks, 1000), sleep=time.sleep)
            try:
                try:
                    deploy.run(args)
                except RuntimeError:
                    pass
                else:
                    raise AssertionError('Failed health must reject deployment.')
            finally:
                deploy.time = old_time
            restored = deploy.docker('GET', '/containers/' + name + '/json')
            assert restored['Id'] == current['Id'] and restored['State']['Running']
            assert restored['HostConfig']['RestartPolicy'] == restart
            assert restored['Image'] == new_image

        case('failed-health-restores-previous-frontend', rollback)
        result['passed'] = result['failedCases'] == 0
except Exception as error:
    result['passed'] = False
    emit('run-stopped', errorType=type(error).__name__, sourceFrames=[{'file': Path(frame.filename).name, 'line': frame.lineno} for frame in traceback.extract_tb(error.__traceback__)])
finally:
    # Remove only this run's labeled local fixtures, retaining any cleanup failure in the evidence.
    remaining = []
    cleanup_errors = []
    if docker_ready:
        try:
            ids = cmd(['docker', 'ps', '-aq', '--filter', 'label=' + LABEL]).split()
            for container in ids:
                cmd(['docker', 'rm', '-f', container])
            if network_created:
                cmd(['docker', 'network', 'rm', network])
            if image_created:
                cmd(['docker', 'image', 'rm', image_name])
            remaining = cmd(['docker', 'ps', '-aq', '--filter', 'label=' + LABEL]).split()
        except Exception as error:
            cleanup_errors.append(type(error).__name__)
            result['passed'] = False
    result['cleanupErrorTypes'] = cleanup_errors
    result['fixtureContainersRemaining'] = len(remaining) if not cleanup_errors else None
    result['finishedAtKST'] = now()
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf8')
    print(json.dumps({'runId': RUN, 'passed': result.get('passed'), 'passedCases': result['passedCases'], 'failedCases': result['failedCases'], 'fixtureContainersRemaining': result['fixtureContainersRemaining']}, ensure_ascii=False), flush=True)
raise SystemExit(0 if result.get('passed') and not remaining and not cleanup_errors else 1)
