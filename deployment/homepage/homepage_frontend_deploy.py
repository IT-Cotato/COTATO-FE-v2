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
    env = dict(entry.split('=', 1) for entry in config['Env'] if '=' in entry)
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
    if candidate['Config']['Env'] != body['Env']:
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


def run(args):
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
    if args.mode == 'check':
        return
    token = datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S') + '-' + uuid.uuid4().hex[:6]
    original_name = old['Name'].lstrip('/')
    temporary_name = original_name + '-candidate-' + token
    backup_name = original_name + '-backup-' + token
    candidate_id = None
    old_stopped = False
    old_renamed = False
    old_policy_changed = False
    candidate_promoted = False
    committed = False
    try:
        candidate_id = docker('POST', '/containers/create?name=' + temporary_name, body)['Id']
        validate_candidate(inspect(candidate_id), body, image['Id'])
        emit('candidate-policy-verified', candidateStarted=False, memoryMiB=768, cacheMountVerified=True, authEnvironmentPreserved=True)
        if args.mode == 'verify-candidate':
            return
        # 4. Only --apply may replace the frontend. Backend, DB, images and original files are untouched.
        docker('POST', '/containers/' + old['Id'] + '/update', {'RestartPolicy': {'Name': 'no'}})
        old_policy_changed = True
        docker('POST', '/containers/' + old['Id'] + '/stop?t=20')
        old_stopped = True
        docker('POST', '/containers/' + old['Id'] + '/rename?name=' + backup_name)
        old_renamed = True
        docker('POST', '/containers/' + candidate_id + '/rename?name=' + original_name)
        candidate_promoted = True
        docker('POST', '/containers/' + candidate_id + '/start')
        deadline = time.monotonic() + 90
        while time.monotonic() < deadline:
            if inspect(candidate_id)['State']['Running'] and healthy(HOME):
                break
            time.sleep(1)
        else:
            raise RuntimeError('Frontend health verification did not pass.')
        validate_candidate(inspect(candidate_id), body, image['Id'])
        if not healthy(API_HEALTH):
            raise RuntimeError('Backend read-only health verification did not pass.')
        if any(fingerprint(inspect(key)) != value for key, value in others.items()):
            raise RuntimeError('An unrelated container changed during deployment.')
        committed = True
        emit('deployment-passed', sourceRevision=revision, memoryMiB=768, persistentCache=True, previousFrontendPreserved=True, otherContainersChanged=0, databaseCommands=0)
    finally:
        # 5. Failure restores the previous frontend. Cleanup can remove only this invocation's candidate.
        if args.mode == 'apply' and not committed:
            if candidate_id and inspect(candidate_id)['State']['Running']:
                docker('POST', '/containers/' + candidate_id + '/stop?t=10')
            if candidate_promoted:
                docker('POST', '/containers/' + candidate_id + '/rename?name=' + temporary_name)
            if old_renamed:
                docker('POST', '/containers/' + old['Id'] + '/rename?name=' + original_name)
            if old_policy_changed:
                docker('POST', '/containers/' + old['Id'] + '/update', {'RestartPolicy': old['HostConfig']['RestartPolicy']})
            if old_stopped:
                docker('POST', '/containers/' + old['Id'] + '/start')
                for attempt in range(30):
                    if healthy(HOME):
                        break
                    time.sleep(1)
                else:
                    raise RuntimeError('Previous frontend restarted but its health needs administrator attention.')
                emit('previous-frontend-restored', databaseCommands=0)
        if candidate_id and not committed:
            docker('DELETE', '/containers/' + candidate_id)  # No volumes/images/cache deletion flags.
            emit('temporary-candidate-removed', productionFrontendRestarted=old_stopped)
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
