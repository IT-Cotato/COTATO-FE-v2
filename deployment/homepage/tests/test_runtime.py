"""Test deployment boundaries and generated-cache cleanup with synthetic local files only."""
import configparser
import copy
import errno
import importlib.util
import json
import os
from pathlib import Path
import shutil
import tempfile
import time
from types import SimpleNamespace
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

    def test_new_image_defaults_merge_below_existing_runtime_values(self):
        """새 기본 환경변수는 추가하고 기존 인증·런타임 값과 정책 우선순위를 보존한다."""
        image = {'Id': 'sha256:' + '2' * 64, 'Config': {'Env': [
            'NEW_IMAGE_DEFAULT=fixture', 'AUTH_TEST_FIXTURE=image-default',
            'NODE_OPTIONS=--max-old-space-size=999']}}
        body = deployment.build_body(self.fixture(), image, self.write(), 'fixture')
        env = deployment.environment(body['Env'])
        self.assertEqual(env['NEW_IMAGE_DEFAULT'], 'fixture')
        self.assertEqual(env['AUTH_TEST_FIXTURE'], 'synthetic-only')
        self.assertEqual(env['NODE_OPTIONS'], '--max-old-space-size=192')
        candidate = {'Image': image['Id'], 'Config': {k: body[k] for k in ['Env', 'Cmd', 'Entrypoint', 'User', 'WorkingDir']}, 'HostConfig': body['HostConfig'], 'Mounts': [{'Destination': deployment.TARGET, 'Source': str(self.cache), 'RW': True}]}
        candidate['Config']['Env'] = list(reversed(body['Env']))
        deployment.validate_candidate(candidate, body, image['Id'])


class DeploymentRecoveryTests(unittest.TestCase):
    """Simulate replies lost after Docker mutations; never run an app or contact a daemon."""

    def setUp(self):
        old = RuntimePolicyTests.fixture(self)
        old.update({'Id': 'old', 'Name': '/fixture-homepage', 'Image': old['Config']['Image'],
                    'State': {'Running': True, 'StartedAt': 'fixture-before'}})
        self.old = copy.deepcopy(old)
        self.image = {'Id': 'sha256:' + '2' * 64, 'Config': {'Labels': {'org.opencontainers.image.revision': '2' * 40}}}
        policy = json.loads((ROOT / 'runtime.example.json').read_text())
        self.body = deployment.build_body(old, self.image, policy, 'fixture')
        self.containers = {'old': old}
        self.calls = []
        self.events = []
        self.fault = lambda path: False
        self.faults = 0
        self.args = SimpleNamespace(image=self.image['Id'], release='fixture', mode='apply')
        for name, value in [('preflight', lambda args: (copy.deepcopy(self.old), self.image, self.body, {})),
                            ('verify_cache_write', lambda *args: None), ('docker', self.docker),
                            ('healthy', lambda url: True), ('wait_for_home', lambda *args: True),
                            ('emit', lambda stage, **values: self.events.append(stage))]:
            replacement = patch.object(deployment, name, value)
            replacement.start()
            self.addCleanup(replacement.stop)

    def docker(self, method, path, body=None):
        self.calls.append((method, path))
        if method == 'POST' and path.startswith('/containers/create'):
            self.containers['candidate'] = {'Id': 'candidate', 'Image': body['Image'],
                'Name': '/' + path.split('name=')[1], 'Config': copy.deepcopy(body),
                'HostConfig': copy.deepcopy(body['HostConfig']),
                'State': {'Running': False, 'StartedAt': ''},
                'Mounts': [{'Destination': deployment.TARGET, 'Source': str(deployment.CACHE), 'RW': True}]}
            return {'Id': 'candidate'}
        identifier = path.split('/')[2].split('?')[0]
        if method == 'GET':
            return copy.deepcopy(self.containers[identifier])
        if method == 'DELETE':
            del self.containers[identifier]
            return None
        current = self.containers[identifier]
        if '/update' in path:
            current['HostConfig']['RestartPolicy'] = {'MaximumRetryCount': 0, **body['RestartPolicy']}
        elif '/stop' in path:
            current['State']['Running'] = False
        elif '/rename?' in path:
            current['Name'] = '/' + path.split('name=')[1]
        elif '/start' in path:
            current['State']['Running'] = True
            current['State']['StartedAt'] = 'fixture-after'
        else:
            raise AssertionError('Unexpected synthetic Docker operation.')
        if self.fault(path):
            self.faults += 1
            raise OSError('Synthetic reply loss after state change.')

    def assert_restored(self):
        current = self.containers['old']
        self.assertTrue(current['State']['Running'])
        self.assertEqual(current['Name'], self.old['Name'])
        self.assertEqual(current['HostConfig']['RestartPolicy'], self.old['HostConfig']['RestartPolicy'])
        self.assertEqual(current['Config']['Env'], self.old['Config']['Env'])
        self.assertNotIn('candidate', self.containers)

    def test_reply_loss_after_each_replacement_mutation_restores_old(self):
        """정책 변경·정지·두 이름 변경·시작 뒤 응답 유실 모두 실제 상태로 복구한다."""
        for fragment in ['/old/update', '/old/stop', '/old/rename', '/candidate/rename', '/candidate/start']:
            with self.subTest(operation=fragment):
                self.containers = {'old': copy.deepcopy(self.old)}
                self.faults = 0
                self.fault = lambda path: fragment in path and self.faults == 0
                with self.assertRaises(OSError):
                    deployment.run(self.args)
                self.assertEqual(self.faults, 1)
                self.assert_restored()

    def test_recovery_itself_reconciles_lost_replies(self):
        """복구 중 이름·정책·시작 응답이 유실되어도 반영된 상태를 다시 조회한다."""
        self.fault = lambda path: ('/containers/old/rename?name=fixture-homepage' == path or
                                  path == '/containers/old/start' or
                                  path == '/containers/old/update' and self.containers['old']['HostConfig']['RestartPolicy']['Name'] == 'unless-stopped')
        with patch.object(deployment, 'wait_for_home', lambda identifier, timeout: timeout == 30):
            with self.assertRaises(RuntimeError):
                deployment.run(self.args)
        self.assertEqual(self.faults, 3)
        self.assert_restored()

    def test_failed_recovery_preserves_both_containers_for_attention(self):
        """이전 프론트의 상태 확인까지 실패하면 복구용 컨테이너를 자동 삭제하지 않는다."""
        with patch.object(deployment, 'wait_for_home', lambda *args: False):
            with self.assertRaises(RuntimeError):
                deployment.run(self.args)
        self.assertIn('candidate', self.containers)
        self.assertIn('rollback-needs-attention', self.events)
        self.assertTrue(self.containers['old']['State']['Running'])

    def test_failed_cache_probe_blocks_before_any_frontend_mutation(self):
        """캐시 쓰기 실패 시 기존 프론트 정지·변경·후보 생성 전에 거부한다."""
        with patch.object(deployment, 'verify_cache_write', side_effect=RuntimeError('fixture cache denied')):
            with self.assertRaises(RuntimeError):
                deployment.run(self.args)
        self.assertEqual(self.calls, [])
        self.assertEqual(self.containers['old'], self.old)


class CacheWriteProbeTests(unittest.TestCase):
    """Check the app-user probe's permission boundary and cleanup using synthetic replies."""

    def test_probe_isolated_from_network_auth_and_application_startup(self):
        calls = []

        def fake(method, path, body=None):
            calls.append((method, path, body))
            return {'Id': 'probe'} if '/create' in path else {'StatusCode': 0}

        with tempfile.TemporaryDirectory() as directory, patch.object(deployment, 'CACHE', Path(directory)), patch.object(deployment, 'docker', fake), patch.object(deployment, 'emit'):
            deployment.verify_cache_write('fixture-image', {'User': 'node', 'Env': ['AUTH_TEST_FIXTURE=synthetic-only']})
        body = calls[0][2]
        self.assertEqual(body['User'], 'node')
        self.assertEqual(body['HostConfig']['NetworkMode'], 'none')
        self.assertTrue(body['HostConfig']['ReadonlyRootfs'])
        self.assertEqual(body['Entrypoint'], ['node'])
        self.assertTrue(body['Cmd'][1].startswith('const fs'))
        self.assertNotIn('apps/homepage/server.js', body['Cmd'][1])
        self.assertEqual(body['Env'], ['NODE_OPTIONS=--max-old-space-size=64'])
        self.assertEqual(calls[-1][:2], ('DELETE', '/containers/probe?force=true'))

    def test_probe_nonzero_exit_is_rejected_and_removed(self):
        calls = []

        def fake(method, path, body=None):
            calls.append((method, path))
            return {'Id': 'probe'} if '/create' in path else {'StatusCode': 2}

        with tempfile.TemporaryDirectory() as directory, patch.object(deployment, 'CACHE', Path(directory)), patch.object(deployment, 'docker', fake):
            with self.assertRaises(RuntimeError):
                deployment.verify_cache_write('fixture-image', {'User': 'node'})
        self.assertEqual(calls[-1], ('DELETE', '/containers/probe?force=true'))


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

    def test_file_disappearing_during_scan_does_not_abort_other_entries(self):
        """파일 stat 직전 삭제를 재현해 해당 키만 건너뛰고 다른 만료 캐시를 정리한다."""
        changing = self.add('j', 20, expired=True)
        other = self.add('k', 20, expired=True)
        file = next(changing.iterdir())
        original = Path.lstat

        def disappearing(path, *args, **kwargs):
            if path == file:
                file.unlink()
            return original(path, *args, **kwargs)

        with patch.object(Path, 'lstat', disappearing):
            result = self.clean()
        self.assertTrue(changing.exists())
        self.assertFalse(other.exists())
        self.assertEqual(result['만료정리수'], 1)
        self.assertEqual(result['건너뛴항목수'], 1)

    def test_recreated_directory_is_deferred_after_scan(self):
        """같은 키의 새 세대를 스캔 중 만들면 새 파일을 보존하고 다른 정리는 계속한다."""
        changing = self.add('l', 20, expired=True)
        other = self.add('m', 20, expired=True)
        original = Path.rglob

        def recreating(path, pattern):
            files = list(original(path, pattern))
            yield from files
            if path == changing:
                shutil.rmtree(changing)
                changing.mkdir()
                (changing / '60.9999999999999.new.webp').write_bytes(b'new')

        with patch.object(Path, 'rglob', recreating):
            result = self.clean()
        self.assertTrue((changing / '60.9999999999999.new.webp').exists())
        self.assertFalse(other.exists())
        self.assertEqual(result['건너뛴항목수'], 1)

    def test_transient_deletion_race_does_not_abort_other_entries(self):
        """삭제 중 사라짐·재생성 충돌은 해당 항목만 건너뛰며 다음 키를 처리한다."""
        for code in [errno.ENOENT, errno.ENOTDIR, errno.ENOTEMPTY]:
            with self.subTest(errno=code):
                changing = self.add('n', 20, expired=True)
                other = self.add('o', 20, expired=True)
                original = shutil.rmtree

                def racing(path, *args, **kwargs):
                    if path == changing:
                        raise OSError(code, 'synthetic concurrent rewrite')
                    return original(path, *args, **kwargs)

                with patch.object(cleanup.shutil, 'rmtree', racing):
                    result = self.clean()
                self.assertTrue(changing.exists())
                self.assertFalse(other.exists())
                self.assertEqual(result['만료정리수'], 1)
                shutil.rmtree(changing)

    def test_refresh_after_scan_is_preserved_before_delete(self):
        """스캔 후 삭제 직전에 갱신한 키를 다시 확인하고 보존한다."""
        changing = self.add('q', 20, expired=True)
        other = self.add('r', 20, expired=True)
        original = Path.lstat
        calls = []

        def refreshing(path, *args, **kwargs):
            if path == changing:
                calls.append(True)
                if len(calls) == 3:
                    (changing / '60.9999999999999.new.webp').write_bytes(b'new')
            return original(path, *args, **kwargs)

        with patch.object(Path, 'lstat', refreshing):
            result = self.clean()
        self.assertTrue((changing / '60.9999999999999.new.webp').exists())
        self.assertFalse(other.exists())
        self.assertEqual(result['만료정리수'], 1)

    def test_real_permission_errors_remain_visible(self):
        """권한 오류는 동시 갱신으로 간주하지 않고 실패를 호출자에게 전달한다."""
        self.add('p', 20, expired=True)
        with patch.object(cleanup.shutil, 'rmtree', side_effect=PermissionError(errno.EACCES, 'synthetic permission denied')):
            with self.assertRaises(PermissionError):
                self.clean()


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
