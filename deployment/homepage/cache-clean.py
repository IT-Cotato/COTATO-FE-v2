"""새로 생성한 홈페이지 이미지 캐시만 정리하며 원본 파일과 업무 데이터에는 접근하지 않는다."""
import argparse
import errno
import json
from pathlib import Path
import re
import shutil
import stat
import time

MARKER = '.managed-generated-cache-v1'
MARKER_VALUE = 'cotato-generated-image-cache-20261114-v1'
KEY = re.compile(r'^[A-Za-z0-9_-]{43}$')
TRANSIENT = {errno.ENOENT, errno.ENOTDIR, errno.ENOTEMPTY}


def generation(info):
    return info.st_dev, info.st_ino, info.st_mtime_ns


def clean(root, max_bytes, target_bytes, min_free_bytes, quiet_seconds):
    # 1. 관리 표식이 있는 실제 전용 경로만 정리한다.
    root = Path(root).absolute()
    marker = root / MARKER
    if root != root.resolve() or not root.is_dir() or root.is_symlink() or not marker.is_file() or marker.is_symlink() or marker.read_text().strip() != MARKER_VALUE:
        raise ValueError('관리표식 검증 실패: 정리하지 않음')
    now = time.time()
    records = []
    skipped = 0
    for path in root.iterdir():
        if path.name == MARKER:
            continue
        try:
            before = path.lstat()
            if not stat.S_ISDIR(before.st_mode) or not KEY.fullmatch(path.name):
                skipped += 1
                continue
            size = 0
            expires = []
            unsafe = False
            for file in path.rglob('*'):
                info = file.lstat()
                if stat.S_ISDIR(info.st_mode):
                    continue
                bits = file.name.split('.', 2)
                if not stat.S_ISREG(info.st_mode) or len(bits) < 3 or not bits[0].isdigit() or not bits[1].isdigit():
                    unsafe = True
                    break
                size += info.st_size
                expires.append(int(bits[1]) / 1000)
            # Next.js는 같은 키를 삭제·재생성한다. 스캔 중 바뀐 세대는 다음 회차로 미룬다.
            after = path.lstat()
            if unsafe or generation(before) != generation(after):
                skipped += 1
                continue
            records.append({'path': path, 'bytes': size, 'generation': generation(after),
                            'mtime_ns': after.st_mtime_ns, 'age': now - after.st_mtime,
                            'expired': bool(expires) and all(expiry < now for expiry in expires)})
        except OSError as error:
            if error.errno not in TRANSIENT:
                raise  # 권한·디스크 오류를 정상적인 동시 갱신으로 숨기지 않는다.
            skipped += 1

    removed_expired = 0
    removed_capacity = 0
    reclaimed = 0
    total = sum(item['bytes'] for item in records)

    def remove(item):
        nonlocal total, reclaimed, skipped
        if item.get('attempted'):
            return False
        item['attempted'] = True
        path = item['path']
        try:
            # 2. 삭제 직전에도 같은 세대·60초 이상 미갱신 상태인지 확인한다.
            current = path.lstat()
            if item['age'] < quiet_seconds or not stat.S_ISDIR(current.st_mode) or generation(current) != item['generation']:
                skipped += 1
                return False
            assert path.parent == root and KEY.fullmatch(path.name)
            shutil.rmtree(path)
        except OSError as error:
            if error.errno not in TRANSIENT:
                raise
            skipped += 1
            return False
        total -= item['bytes']
        reclaimed += item['bytes']
        return True

    # 3. 만료된 파생 캐시를 우선 제거한다. 원본 이미지는 이 경로에 없다.
    for item in records:
        if item['expired'] and remove(item):
            removed_expired += 1
    # 4. 용량 기준 초과 시 조용한 캐시부터 정리한다. 크기는 스캔 시점의 추정값이다.
    if total > max_bytes or shutil.disk_usage(root).free < min_free_bytes:
        for item in sorted(records, key=lambda record: record['mtime_ns']):
            if total <= target_bytes and shutil.disk_usage(root).free >= min_free_bytes:
                break
            if remove(item):
                removed_capacity += 1
    return {'만료정리수': removed_expired, '용량정리수': removed_capacity, '건너뛴항목수': skipped,
            '정리바이트': reclaimed, '잔여관리캐시바이트': total, '용량기준바이트': max_bytes,
            '용량기준초과잔여': total > max_bytes, '원본및DB접근': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', default='/var/lib/cotato/homepage-image-cache-v108')
    parser.add_argument('--max-bytes', type=int, default=512 * 1024**2)
    parser.add_argument('--target-bytes', type=int, default=384 * 1024**2)
    parser.add_argument('--min-free-bytes', type=int, default=2 * 1024**3)
    parser.add_argument('--quiet-seconds', type=int, default=60)
    args = parser.parse_args()
    try:
        assert 0 <= args.target_bytes <= args.max_bytes and args.min_free_bytes >= 0 and args.quiet_seconds >= 0
        print(json.dumps(clean(args.root, args.max_bytes, args.target_bytes, args.min_free_bytes, args.quiet_seconds), ensure_ascii=False))
    except Exception as error:
        print(json.dumps({'정리실행': False, '오류종류': type(error).__name__, '원문': '생략'}, ensure_ascii=False))
        raise SystemExit(2)
