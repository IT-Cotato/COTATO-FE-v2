"""Test deployment boundaries and generated-cache cleanup with synthetic local files only."""
import configparser
import copy
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import time
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, ROOT / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


deployment = load('homepage_deployment', 'homepage_frontend_deploy.py')
cleanup = load('homepage_cache_cleanup', 'cache-clean.py')


class RuntimePolicyTests(unittest.TestCase):
    """Exercise the policy and candidate builders without contacting Docker or production."""

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='homepage-policy-')
        self.addCleanup(self.temporary.cleanup)
        self.directory = Path(self.temporary.name).resolve()
        self.cache = self.directory / 'cache'
        self.policy = json.loads((ROOT / 'runtime.example.json').read_text())
        self.policy['generatedImageCache']['source'] = str(self.cache)
        self.file = self.directory / 'policy.json'
        self.patch = patch.object(deployment, 'CACHE', self.cache)
        self.patch.start()
        self.addCleanup(self.patch.stop)

    def write(self, value=None):
        self.file.write_text(json.dumps(self.policy if value is None else value))
        return deployment.load_policy(self.file)

    def test_valid_example_policy(self):
        """배포 예시가 실제 정책 로더의 필수 조건을 충족한다."""
        self.assertEqual(self.write()['memoryMiB'], 768)

    def test_missing_policy_fields_are_rejected(self):
        """메모리·힙·환경·캐시 누락 시 Docker 작업 전 거부한다."""
        for field in ['memoryMiB', 'nodeOldSpaceMiB', 'environment', 'generatedImageCache']:
            with self.subTest(field=field):
                policy = copy.deepcopy(self.policy)
                del policy[field]
                with self.assertRaises((ValueError, KeyError)):
                    self.write(policy)

    def test_weakened_profile_is_rejected(self):
        """잘못된 타입·메모리·읽기 전용·환경 값으로 진행하지 않는다."""
        for field, value in [('memoryMiB', '768'), ('memoryMiB', 300), ('memorySwapTotalMiB', 1536), ('readonlyRootfs', False), ('environment', {})]:
            with self.subTest(field=field, value=value):
                policy = copy.deepcopy(self.policy)
                policy[field] = value
                with self.assertRaises(ValueError):
                    self.write(policy)

    def fixture(self):
        return {
            'Config': {
                'Image': 'sha256:' + '1' * 64,
                'Env': ['AUTH_TEST_FIXTURE=synthetic-only', 'NODE_OPTIONS=--max-old-space-size=256'],
                'Cmd': ['node', 'apps/homepage/server.js'],
                'Entrypoint': ['docker-entrypoint.sh'],
                'User': 'node', 'WorkingDir': '/app',
                'Labels': {'org.opencontainers.image.revision': '1' * 40},
            },
            'HostConfig': {
                'Memory': 300 * 1024**2, 'MemorySwap': 300 * 1024**2,
                'ReadonlyRootfs': True, 'NanoCpus': 600000000,
                'Binds': ['/fixture/assets:/app/assets:ro'],
                'Mounts': [{'Type': 'bind', 'Source': '/fixture/old-cache', 'Target': deployment.TARGET}],
                'PortBindings': {'3000/tcp': [{'HostIp': '127.0.0.1', 'HostPort': '13701'}]},
                'RestartPolicy': {'Name': 'unless-stopped', 'MaximumRetryCount': 0},
                'SecurityOpt': ['no-new-privileges'], 'CapDrop': ['ALL'],
                'Tmpfs': {'/tmp': 'rw,nosuid,nodev,size=32m'},
            },
            'NetworkSettings': {'Networks': {'fixture-network': {'Aliases': ['fixture-frontend']}}},
        }

    def body(self):
        current = self.fixture()
        before = copy.deepcopy(current)
        image = {'Id': 'sha256:' + '2' * 64, 'Config': {'Labels': {'org.opencontainers.image.revision': '2' * 40}}}
        body = deployment.build_body(current, image, self.write(), 'fixture-release')
        self.assertEqual(current, before)
        return body, image

    def test_new_image_inherits_policy_and_unrelated_settings(self):
        """새 이미지에 정책을 적용하면서 인증 시험값·포트·CPU·보안을 보존한다."""
        body, image = self.body()
        env = dict(value.split('=', 1) for value in body['Env'])
        self.assertEqual(body['Image'], image['Id'])
        self.assertEqual(env['AUTH_TEST_FIXTURE'], 'synthetic-only')
        self.assertEqual(env['NODE_OPTIONS'], '--max-old-space-size=192')
        self.assertEqual(env['MALLOC_ARENA_MAX'], '2')
        self.assertEqual(env['UV_THREADPOOL_SIZE'], '2')
        self.assertEqual(body['HostConfig']['Memory'], 768 * 1024**2)
        self.assertEqual(body['HostConfig']['MemorySwap'], 768 * 1024**2)
        self.assertEqual(body['HostConfig']['PortBindings'], self.fixture()['HostConfig']['PortBindings'])
        self.assertEqual(body['HostConfig']['SecurityOpt'], ['no-new-privileges'])
        self.assertEqual(body['HostConfig']['NanoCpus'], 600000000)
        self.assertIn('/fixture/assets:/app/assets:ro', body['HostConfig']['Binds'])
        self.assertEqual(body['HostConfig']['Mounts'], [])
        self.assertEqual(body['Labels']['org.opencontainers.image.revision'], '2' * 40)

    def test_candidate_requires_writable_cache_and_exact_environment(self):
        """캐시 마운트 누락·읽기 전용 또는 환경 누락 후보를 거부한다."""
        body, image = self.body()
        candidate = {'Image': image['Id'], 'Config': {k: body[k] for k in ['Env', 'Cmd', 'Entrypoint', 'User', 'WorkingDir']}, 'HostConfig': body['HostConfig'], 'Mounts': [{'Destination': deployment.TARGET, 'Source': str(self.cache), 'RW': True}]}
        deployment.validate_candidate(candidate, body, image['Id'])
        for broken in [[], [{'Destination': deployment.TARGET, 'Source': str(self.cache), 'RW': False}]]:
            changed = copy.deepcopy(candidate)
            changed['Mounts'] = broken
            with self.assertRaises(ValueError):
                deployment.validate_candidate(changed, body, image['Id'])
        changed = copy.deepcopy(candidate)
        changed['Config']['Env'] = []
        with self.assertRaises(ValueError):
            deployment.validate_candidate(changed, body, image['Id'])


class CacheCleanupTests(unittest.TestCase):
    """Use generated fixture names and outside canaries to verify the cleanup boundary."""

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='homepage-cache-')
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name).resolve()
        self.root = self.base / 'cache'
        self.root.mkdir()
        (self.root / cleanup.MARKER).write_text(cleanup.MARKER_VALUE)

    def add(self, key, size, expired=False, age=120):
        directory = self.root / (key * 43)
        directory.mkdir()
        expires = time.time() + (-3600 if expired else 3600)
        (directory / ('60.' + str(int(expires * 1000)) + '.etag.upstream.webp')).write_bytes(b'x' * size)
        os.utime(directory, (time.time() - age, time.time() - age))
        return directory

    def clean(self, maximum=512*1024**2, target=384*1024**2):
        return cleanup.clean(self.root, maximum, target, 0, 60)

    def test_expired_cache_only_and_outside_symlink_preserved(self):
        """만료 파생물만 정리하고 외부 링크 대상·미만료 캐시는 보존한다."""
        expired = self.add('a', 20, expired=True)
        fresh = self.add('b', 20)
        outside = self.base / 'outside'
        outside.mkdir()
        canary = outside / 'preserve.txt'
        canary.write_text('synthetic canary')
        (self.root / ('c' * 43)).symlink_to(outside, target_is_directory=True)
        result = self.clean()
        self.assertFalse(expired.exists())
        self.assertTrue(fresh.exists())
        self.assertEqual(canary.read_text(), 'synthetic canary')
        self.assertEqual(result['만료정리수'], 1)

    def test_capacity_cleanup(self):
        """용량 초과 시 오래된 관리 캐시부터 목표 이하로 줄인다."""
        for index, key in enumerate(['d', 'e', 'f']):
            self.add(key, 70, age=300-index)
        result = self.clean(100, 80)
        self.assertEqual(result['용량정리수'], 2)
        self.assertEqual(result['잔여관리캐시바이트'], 70)

    def test_recent_cache_is_deferred(self):
        """최근 생성한 캐시는 기준을 초과해도 다음 회차로 미룬다."""
        recent = self.add('g', 140, expired=True, age=0)
        result = self.clean(100, 80)
        self.assertTrue(recent.exists())
        self.assertTrue(result['용량기준초과잔여'])

    def test_missing_marker_refuses_cleanup(self):
        """표식이 없으면 삭제하지 않는다."""
        generated = self.add('h', 20, expired=True)
        (self.root / cleanup.MARKER).unlink()
        with self.assertRaises(ValueError):
            self.clean()
        self.assertTrue(generated.exists())

    def test_symlink_root_refuses_cleanup(self):
        """관리 루트 자체가 심볼릭 링크이면 정리하지 않는다."""
        generated = self.add('i', 20, expired=True)
        link = self.base / 'link'
        link.symlink_to(self.root, target_is_directory=True)
        with self.assertRaises(ValueError):
            cleanup.clean(link, 100, 80, 0, 60)
        self.assertTrue(generated.exists())


class SystemdContractTests(unittest.TestCase):
    """Check that packaged units target only the managed generated-cache location."""

    def test_cleanup_units_match_runtime_policy(self):
        """서비스의 쓰기 경계·실행 계정과 타이머 연결을 함께 확인한다."""
        service = configparser.ConfigParser(interpolation=None)
        service.read(ROOT / 'systemd/cotato-homepage-image-cache-clean.service')
        timer = configparser.ConfigParser(interpolation=None)
        timer.read(ROOT / 'systemd/cotato-homepage-image-cache-clean.timer')
        policy = json.loads((ROOT / 'runtime.example.json').read_text())
        self.assertEqual(service['Service']['ReadWritePaths'], policy['generatedImageCache']['source'])
        self.assertEqual(service['Service']['User'], '1000')
        self.assertEqual(service['Service']['Group'], '1000')
        self.assertEqual(service['Service']['ProtectSystem'], 'strict')
        self.assertEqual(service['Service']['PrivateNetwork'], 'yes')
        self.assertEqual(service['Service']['MemoryMax'], '64M')
        self.assertEqual(timer['Timer']['Unit'], 'cotato-homepage-image-cache-clean.service')
        self.assertEqual(timer['Timer']['OnUnitActiveSec'], '1min')


if __name__ == '__main__':
    unittest.main()
