"""Record portable checks as separate safe JSON/JSONL runs without production access."""
import argparse
from datetime import datetime
import hashlib
import json
from pathlib import Path
import re
import unittest
import uuid
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]


def now():
    return datetime.now(ZoneInfo('Asia/Seoul')).isoformat()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run-id', default='runtime-checks-' + datetime.now(ZoneInfo('Asia/Seoul')).strftime('%Y%m%d-%H%M%S') + '-' + uuid.uuid4().hex[:6])
    parser.add_argument('--output-dir', type=Path, default=ROOT / '.test-results')
    args = parser.parse_args()
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]{0,79}', args.run_id):
        parser.error('A safe run ID is required.')
    args.output_dir.mkdir(parents=True, exist_ok=True)
    summary_path = args.output_dir / (args.run_id + '.json')
    event_path = args.output_dir / (args.run_id + '.jsonl')
    if summary_path.exists() or event_path.exists():
        parser.error('Use a new run ID; previous evidence must not be overwritten.')
    summary = {'runId': args.run_id, '목적': '배포 정책 계승·캐시 정리 경계·systemd 설정 일치 검증', '실행위치': '로컬 Python·합성 임시 파일, Docker·클라우드·DB 연결 없음', '시작KST': now(), '방법': 'stdlib unittest discovery: tests/test_*.py', '성공기준': '전체 사례 통과, 실제 업무 쓰기0건', '소스SHA256': {name: hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in ['homepage_frontend_deploy.py', 'cache-clean.py']}}
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf8')

    def emit(event):
        event = {'시각KST': now(), **event}
        with event_path.open('a', encoding='utf8') as file:
            file.write(json.dumps(event, ensure_ascii=False) + '\n')
        print(json.dumps(event, ensure_ascii=False), flush=True)

    class SafeResult(unittest.TestResult):
        """Retain case IDs and error types while omitting traceback paths and fixture values."""

        def startTest(self, test):
            super().startTest(test)
            emit({'이벤트': '시작', '사례': test.id()})

        def addSuccess(self, test):
            super().addSuccess(test)
            emit({'이벤트': '통과', '사례': test.id()})

        def addFailure(self, test, error):
            super().addFailure(test, error)
            emit({'이벤트': '불통과', '사례': test.id(), '오류종류': error[0].__name__})

        def addError(self, test, error):
            super().addError(test, error)
            emit({'이벤트': '오류', '사례': test.id(), '오류종류': error[0].__name__})

    result = SafeResult()
    suite = unittest.defaultTestLoader.discover(str(ROOT / 'tests'), pattern='test_*.py')
    suite.run(result)
    summary.update({'종료KST': now(), '전체사례수': result.testsRun, '실패수': len(result.failures), '오류수': len(result.errors), '통과': result.wasSuccessful(), '운영접속수': 0, '업무쓰기수': 0})
    summary_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf8')
    print(json.dumps(summary, ensure_ascii=False), flush=True)
    return 0 if result.wasSuccessful() else 1


if __name__ == '__main__':
    raise SystemExit(main())
