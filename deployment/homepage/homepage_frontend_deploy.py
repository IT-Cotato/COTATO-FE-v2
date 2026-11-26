#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Deploy only the homepage frontend, applying the persisted runtime policy before replacement."""
import argparse
import copy
from datetime import datetime, timezone
import fcntl
import hashlib
import http.client
import json
import os
from pathlib import Path
import re
import socket
import subprocess
import time
from urllib.parse import quote
from urllib.request import urlopen
import uuid

POLICY = Path('/etc/cotato/homepage-frontend-runtime.json')
CACHE = Path('/var/lib/cotato/homepage-image-cache-v108')
TARGET = '/app/apps/homepage/.next/cache/images'
TIMER = 'cotato-homepage-image-cache-clean.timer'
FRONTEND_PORT = '13701'
HOME = 'http://127.0.0.1:13701/'
API_HEALTH = 'http://127.0.0.1:13702/actuator/health'


def emit(stage, **values):
    print(json.dumps({'stage': stage, **values}, ensure_ascii=False), flush=True)


def command(args):
    result = subprocess.run(args, capture_output=True, text=True, timeout=30)
    if result.returncode:
        raise RuntimeError('Operation failed; sensitive command output omitted.')
    return result.stdout


class DockerConnection(http.client.HTTPConnection):
    """Use the local Docker socket; container secrets stay in memory on this VM."""

    def __init__(self):
        super().__init__('localhost', timeout=45)

    def connect(self):
        self.sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.sock.connect('/var/run/docker.sock')


def docker(method, path, body=None):
    connection = DockerConnection()
    payload = json.dumps(body).encode() if body is not None else None
    try:
        connection.request(method, path, body=payload, headers={'Content-Type': 'application/json'})
        response = connection.getresponse()
        raw = response.read()
        if response.status >= 300:
            raise RuntimeError('Docker operation failed; sensitive response omitted.')
        return json.loads(raw) if raw else None
    finally:
        connection.close()


def inspect(container_id):
    return docker('GET', '/containers/' + container_id + '/json')


def fingerprint(container):
    fields = {k: container[k] for k in ['Image', 'Config', 'HostConfig']}
    fields['state'] = {k: container['State'][k] for k in ['Running', 'StartedAt']}
    return hashlib.sha256(json.dumps(fields, sort_keys=True).encode()).hexdigest()


def load_policy(path=POLICY):
    value = json.loads(path.read_text())
    if value.get('version') != 1:
        raise ValueError('Unsupported runtime policy.')
    # 1. Reject missing or weakened settings before any container or application is touched.
    required = {'memoryMiB': 768, 'memorySwapTotalMiB': 768, 'nodeOldSpaceMiB': 192, 'readonlyRootfs': True}
    if any(type(value.get(k)) is not type(v) or value[k] != v for k, v in required.items()):
        raise ValueError('Runtime memory policy does not match the validated profile.')
    if value.get('environment') != {'MALLOC_ARENA_MAX': '2', 'UV_THREADPOOL_SIZE': '2'}:
        raise ValueError('Runtime allocator or worker settings are missing.')
    cache = value['generatedImageCache']
    expected = {'source': str(CACHE), 'target': TARGET, 'cleanupTriggerMiB': 512, 'cleanupTargetMiB': 384, 'quietSeconds': 60, 'cleanupTimer': TIMER}
    if any(cache.get(k) != v for k, v in expected.items()):
        raise ValueError('Generated cache policy does not match the validated profile.')
    return value


def build_body(current, image, policy, release):
    config = copy.deepcopy(current['Config'])
    host = copy.deepcopy(current['HostConfig'])
    # Add new image defaults without replacing active runtime values such as auth settings.
    env = environment((image.get('Config') or {}).get('Env'))
    env.update(environment(config['Env']))
    env.update(policy['environment'])
    env['NODE_OPTIONS'] = '--max-old-space-size=' + str(policy['nodeOldSpaceMiB'])
    config['Env'] = [key + '=' + value for key, value in env.items()]
    # 2. Use an immutable local image while preserving the existing app command and auth environment.
    config['Image'] = image['Id']
    labels = config.get('Labels') or {}
    labels.pop('org.opencontainers.image.revision', None)
    labels.update((image.get('Config') or {}).get('Labels') or {})
    labels.update({'cotato.homepage.release': release, 'cotato.homepage.component': 'frontend', 'cotato.homepage.runtime-policy': '1'})
    config['Labels'] = labels
    host['Memory'] = policy['memoryMiB'] * 1024**2
    host['MemorySwap'] = policy['memorySwapTotalMiB'] * 1024**2
    host['ReadonlyRootfs'] = True
    host['Binds'] = [entry for entry in host.get('Binds') or [] if entry.split(':')[1] != TARGET]
    host['Binds'].append(str(CACHE) + ':' + TARGET + ':rw')
    host['Mounts'] = [entry for entry in host.get('Mounts') or [] if entry.get('Target') != TARGET]
    body = {**config, 'HostConfig': host}
    body['NetworkingConfig'] = {'EndpointsConfig': {name: {'Aliases': endpoint.get('Aliases') or []} for name, endpoint in current['NetworkSettings']['Networks'].items()}}
    return body


def validate_candidate(candidate, body, image_id):
    if candidate['Image'] != image_id:
        raise ValueError('Candidate image mismatch.')
    if environment(candidate['Config']['Env']) != environment(body['Env']):
        raise ValueError('Candidate environment mismatch.')
    for key in ['Cmd', 'Entrypoint', 'User', 'WorkingDir']:
        if candidate['Config'].get(key) != body.get(key):
            raise ValueError('Application startup configuration changed.')
    for key in ['Memory', 'MemorySwap', 'ReadonlyRootfs', 'PortBindings', 'RestartPolicy', 'NanoCpus', 'SecurityOpt', 'CapDrop', 'Tmpfs']:
        if candidate['HostConfig'].get(key) != body['HostConfig'].get(key):
            raise ValueError('Candidate runtime policy mismatch.')
    mounts = [mount for mount in candidate['Mounts'] if mount['Destination'] == TARGET]
    if len(mounts) != 1 or mounts[0]['Source'] != str(CACHE) or not mounts[0]['RW']:
        raise ValueError('Persistent image cache mount is missing.')


def healthy(url):
    try:
        with urlopen(url, timeout=4) as response:
            return response.status == 200
    except Exception:
        return False


def environment(values):
    return dict(entry.split('=', 1) for entry in values or [] if '=' in entry)


def verify_cache_write(image_id, body):
    """Probe only the managed cache as the app user, without starting the app or copying secrets."""
    filename = '.deployment-write-probe-' + uuid.uuid4().hex
    script = """const fs = require('fs');
const path = %s;
let created = false;
try {
  if (process.getuid() !== 1000 || process.getgid() !== 1000) process.exit(3);
  const fd = fs.openSync(path, 'wx', 0o600);
  created = true;
  try { fs.writeSync(fd, 'cache-write-probe'); } finally { fs.closeSync(fd); }
  fs.unlinkSync(path);
  created = false;
} catch (_) { process.exitCode = 2; }
finally { if (created) { try { fs.unlinkSync(path); } catch (_) { process.exitCode = 2; } } }
""" % json.dumps(TARGET + '/' + filename)
    labels = {'cotato.homepage.component': 'cache-write-probe'}
    if (body.get('Labels') or {}).get('cotato.deployment-test'):
        labels['cotato.deployment-test'] = body['Labels']['cotato.deployment-test']
    probe = {'Image': image_id, 'User': body.get('User', ''), 'Entrypoint': ['node'],
             'Cmd': ['-e', script], 'Env': ['NODE_OPTIONS=--max-old-space-size=64'],
             'Labels': labels, 'HostConfig': {'NetworkMode': 'none', 'ReadonlyRootfs': True,
             'Memory': 128 * 1024**2, 'MemorySwap': 128 * 1024**2, 'PidsLimit': 32,
             'NanoCpus': 200000000, 'CapDrop': ['ALL'], 'SecurityOpt': ['no-new-privileges'],
             'Binds': [str(CACHE) + ':' + TARGET + ':rw']}}
    probe_id = None
    try:
        probe_id = docker('POST', '/containers/create', probe)['Id']
        docker('POST', '/containers/' + probe_id + '/start')
        result = docker('POST', '/containers/' + probe_id + '/wait')
        if result['StatusCode'] != 0:
            raise RuntimeError('The app user cannot write and remove generated cache files.')
        emit('cache-write-probe-passed', appUID=1000, appGID=1000)
    finally:
        # Only this invocation's probe is removed; the managed cache itself is retained.
        try:
            if probe_id:
                docker('DELETE', '/containers/' + probe_id + '?force=true')
        finally:
            (CACHE / filename).unlink(missing_ok=True)


def wait_for_home(container_id, timeout):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if inspect(container_id)['State']['Running'] and healthy(HOME):
            return True
        time.sleep(1)
    return False


def reconcile(container_id, condition, path, body=None):
    """Confirm actual Docker state, including operations applied before their reply was lost."""
    for attempt in range(3):
        try:
            current = inspect(container_id)
            if condition(current):
                return current
            docker('POST', path, body)
        except Exception:
            # A failed reply is ambiguous: re-inspect before retrying an idempotent target state.
            continue
    current = inspect(container_id)
    if not condition(current):
        raise RuntimeError('Docker state could not be restored; manual recovery is required.')
    return current


def restore_previous(old, candidate_id, original_name, temporary_name):
    """Restore only the prior frontend and verify it before a failed candidate can be removed."""
    if candidate_id:
        candidate = reconcile(candidate_id, lambda c: not c['State']['Running'],
                              '/containers/' + candidate_id + '/stop?t=10')
        if candidate['Name'].lstrip('/') == original_name:
            reconcile(candidate_id, lambda c: c['Name'].lstrip('/') == temporary_name,
                      '/containers/' + candidate_id + '/rename?name=' + temporary_name)
    identifier = old['Id']
    restarted = not inspect(identifier)['State']['Running']
    reconcile(identifier, lambda c: c['Name'].lstrip('/') == original_name,
              '/containers/' + identifier + '/rename?name=' + original_name)
    restart_policy = old['HostConfig']['RestartPolicy']
    reconcile(identifier, lambda c: c['HostConfig']['RestartPolicy'] == restart_policy,
              '/containers/' + identifier + '/update', {'RestartPolicy': restart_policy})
    reconcile(identifier, lambda c: c['State']['Running'], '/containers/' + identifier + '/start')
    if not wait_for_home(identifier, 30):
        raise RuntimeError('Previous frontend is running but its health needs administrator attention.')
    emit('previous-frontend-restored', previousFrontendRestarted=restarted, databaseCommands=0)


def preflight(args):
    policy = load_policy()
    # 3. Preflight is read-only. Missing cache maintenance or an unavailable image blocks deployment.
    if CACHE.resolve() != CACHE or not CACHE.is_dir() or (CACHE/'.managed-generated-cache-v1').is_symlink() or (CACHE/'.managed-generated-cache-v1').read_text().strip() != 'cotato-generated-image-cache-20261114-v1':
        raise ValueError('Managed generated cache is unavailable.')
    if command(['systemctl', 'is-active', TIMER]).strip() != 'active' or command(['systemctl', 'is-enabled', TIMER]).strip() != 'enabled':
        raise ValueError('Cache maintenance must be enabled before deployment.')
    image = docker('GET', '/images/' + quote(args.image, safe=':') + '/json')
    if image['Id'] != args.image or image['Architecture'] != 'amd64' or image['Os'] != 'linux':
        raise ValueError('The exact compatible image must already be loaded.')
    revision = ((image.get('Config') or {}).get('Labels') or {}).get('org.opencontainers.image.revision', '')
    if not re.fullmatch(r'[0-9a-f]{40}', revision):
        raise ValueError('The image must declare its source revision.')
    all_containers = [inspect(item['Id']) for item in docker('GET', '/containers/json?all=true')]
    targets = [c for c in all_containers if c['State']['Running'] and any(binding['HostPort'] == FRONTEND_PORT for bindings in (c['HostConfig'].get('PortBindings') or {}).values() for binding in bindings or [])]
    if len(targets) != 1 or '/app' != targets[0]['Config']['WorkingDir'] or targets[0]['Config'].get('Cmd') != ['node', 'apps/homepage/server.js']:
        raise ValueError('Exactly one existing homepage frontend must be identified.')
    old = targets[0]
    others = {c['Id']: fingerprint(c) for c in all_containers if c['Id'] != old['Id']}
    body = build_body(old, image, policy, args.release)
    if not healthy(HOME) or not healthy(API_HEALTH):
        raise ValueError('The existing homepage and backend must be healthy.')
    emit('preflight-passed', mode=args.mode, memoryMiB=768, oldSpaceMiB=192, allocatorArenas=2, workerPool=2, persistentCache=True, sourceRevision=revision, databaseCommands=0)
    return old, image, body, others


def promote(old, candidate_id, original_name, backup_name, body, image, others):
    # 4. Only --apply may replace the frontend. Backend, DB and original files are untouched.
    docker('POST', '/containers/' + old['Id'] + '/update', {'RestartPolicy': {'Name': 'no'}})
    docker('POST', '/containers/' + old['Id'] + '/stop?t=20')
    docker('POST', '/containers/' + old['Id'] + '/rename?name=' + backup_name)
    docker('POST', '/containers/' + candidate_id + '/rename?name=' + original_name)
    docker('POST', '/containers/' + candidate_id + '/start')
    if not wait_for_home(candidate_id, 90):
        raise RuntimeError('Frontend health verification did not pass.')
    validate_candidate(inspect(candidate_id), body, image['Id'])
    if not healthy(API_HEALTH):
        raise RuntimeError('Backend read-only health verification did not pass.')
    if any(fingerprint(inspect(key)) != value for key, value in others.items()):
        raise RuntimeError('An unrelated container changed during deployment.')


def run(args):
    old, image, body, others = preflight(args)
    if args.mode == 'check':
        return
    # Probe with no network or runtime auth environment before touching the existing frontend.
    verify_cache_write(image['Id'], body)
    token = datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S') + '-' + uuid.uuid4().hex[:6]
    original_name = old['Name'].lstrip('/')
    temporary_name = original_name + '-candidate-' + token
    backup_name = original_name + '-backup-' + token
    candidate_id = None
    replacement_attempted = False
    committed = False
    try:
        candidate_id = docker('POST', '/containers/create?name=' + temporary_name, body)['Id']
        validate_candidate(inspect(candidate_id), body, image['Id'])
        emit('candidate-policy-verified', candidateStarted=False, memoryMiB=768, cacheMountVerified=True, authEnvironmentPreserved=True)
        if args.mode == 'verify-candidate':
            return
        # Set intent before the RPC: an exception does not prove Docker made no change.
        replacement_attempted = True
        promote(old, candidate_id, original_name, backup_name, body, image, others)
        committed = True
        emit('deployment-passed', sourceRevision=body['Labels']['org.opencontainers.image.revision'], memoryMiB=768, persistentCache=True, previousFrontendPreserved=True, otherContainersChanged=0, databaseCommands=0)
    finally:
        # 5. Failure restores the previous frontend. Cleanup can remove only this invocation's candidate.
        if replacement_attempted and not committed:
            try:
                restore_previous(old, candidate_id, original_name, temporary_name)
            except Exception:
                emit('rollback-needs-attention', previousFrontendPreserved=True)
                raise  # Preserve both containers if recovery itself cannot be confirmed.
        if candidate_id and not committed:
            docker('DELETE', '/containers/' + candidate_id)  # No volumes/images/cache deletion flags.
            emit('temporary-candidate-removed', previousFrontendRestored=replacement_attempted)
        if args.mode == 'verify-candidate' and any(fingerprint(inspect(key)) != value for key, value in {old['Id']: fingerprint(old), **others}.items()):
            raise RuntimeError('Existing containers changed during candidate verification.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--image', required=True, help='Already loaded immutable sha256 image ID.')
    parser.add_argument('--release', required=True, help='Homepage release label.')
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument('--check', dest='mode', action='store_const', const='check')
    modes.add_argument('--verify-candidate', dest='mode', action='store_const', const='verify-candidate')
    modes.add_argument('--apply', dest='mode', action='store_const', const='apply')
    parser.set_defaults(mode='check')
    args = parser.parse_args()
    if not re.fullmatch(r'sha256:[0-9a-f]{64}', args.image) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]{0,63}', args.release):
        parser.error('An immutable image ID and valid release label are required.')
    if os.geteuid() != 0:
        parser.error('Run this deployment entry point with administrator privileges.')
    try:
        with open('/run/lock/cotato-homepage-frontend-deploy.lock', 'w') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            run(args)
    except Exception as error:
        emit('deployment-refused-or-recovered', errorType=type(error).__name__, sensitiveDetailsOmitted=True)
        raise SystemExit(1)


if __name__ == '__main__':
    main()
