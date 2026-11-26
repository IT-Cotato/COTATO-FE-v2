# 홈페이지 프론트 배포 도구

새 프론트 컨테이너에도 메모리·이미지 캐시 설정을 적용하고, 상태 확인 실패 시 이전 프론트로 복구하기 위한 수동 배포 도구입니다. 이 폴더를 추가하거나 PR을 생성하는 것만으로 배포되지 않습니다.

## 파일 구성

| 파일                          | 용도                                                           |
| ----------------------------- | -------------------------------------------------------------- |
| `homepage_frontend_deploy.py` | 정책 검사, 후보 생성, 프론트 교체와 실패 복구를 처리합니다.    |
| `runtime.example.json`        | 비밀값 없는 메모리·캐시 정책 예시입니다. 실행 로그가 아닙니다. |
| `cache-clean.py`, `systemd/`  | 생성한 이미지 캐시의 만료·용량 정리를 처리합니다.              |
| `tests/`                      | 운영과 분리된 정책·캐시·로컬 Docker 검증 코드입니다.           |

## 설치 전제

Linux AMD64, Docker, Python 3.9 이상, systemd를 사용합니다. 기존 홈페이지 프론트가 `/app`에서 `node apps/homepage/server.js`로 실행 중이어야 하며, 호스트 프론트 포트는 `13701`, API 상태 확인 포트는 `13702`입니다.

검토한 운영 작업에서 다음 위치에 파일을 설치합니다. 기존 운영 정책은 예시로 덮어쓰지 않습니다.

| 저장소 파일                   | 설치 위치                                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `homepage_frontend_deploy.py` | `/usr/local/libexec/cotato-homepage-frontend-deploy.py`에 설치하고 `/usr/local/sbin/cotato-homepage-frontend-deploy`로 연결합니다. |
| `cache-clean.py`              | `/usr/local/libexec/cotato-homepage-image-cache-clean.py`에 설치합니다.                                                            |
| `runtime.example.json`        | `/etc/cotato/homepage-frontend-runtime.json`의 필수값을 준비할 때 참고합니다.                                                      |
| `systemd/`의 두 파일          | `/etc/systemd/system/`에 설치하고 정리 타이머를 활성화·자동 시작으로 설정합니다.                                                   |

캐시 경로는 `/var/lib/cotato/homepage-image-cache-v108`이며 앱 UID/GID `1000:1000`이 쓸 수 있어야 합니다. 새 전용 경로를 만들 때만 `.managed-generated-cache-v1`에 `cotato-generated-image-cache-20261114-v1`을 기록하고 관리자가 소유한 읽기 전용 표식으로 둡니다. 이미 경로가 있는데 표식이 없거나 다르면 기존 데이터를 관리 대상으로 편입하지 않고 중단합니다.

## 배포

새 이미지는 VM에 미리 적재하고 40자리 `org.opencontainers.image.revision` 라벨을 포함해야 합니다. 이 도구는 이미지 빌드·전송·다운로드를 수행하지 않습니다.

```bash
sudo cotato-homepage-frontend-deploy --image sha256:<64자리_ID> --release <릴리즈명> --check
sudo cotato-homepage-frontend-deploy --image sha256:<64자리_ID> --release <릴리즈명> --verify-candidate
sudo cotato-homepage-frontend-deploy --image sha256:<64자리_ID> --release <릴리즈명> --apply
```

- 생략 또는 `--check`: 정책·이미지·캐시·타이머·기존 서비스 상태만 확인합니다.
- `--verify-candidate`: 앱 사용자로 캐시 쓰기·삭제를 시험한 뒤 후보의 Docker 설정을 검사하고 제거합니다. 후보 앱은 시작하지 않습니다.
- `--apply`: 같은 사전 검사를 통과한 뒤 프론트를 교체합니다. 실패하면 Docker 실제 상태를 조회해 이전 이름·재시작 정책·실행 상태와 응답을 복원합니다. 짧은 접속 중단이 있을 수 있습니다. 복구를 확인하지 못하면 두 컨테이너를 보존하고 관리자 확인을 요구합니다.

새 이미지의 기본 환경변수에 기존 운영값을 덮어쓰고 메모리 정책을 적용하므로 기존 인증 환경·명령·포트·보안 설정을 계승합니다. 비밀값을 로그나 별도 `.env`에 저장하지 않습니다. 캐시 검사는 네트워크 없이 앱 UID/GID `1000:1000`으로 실행하는 일회성 Node 컨테이너이며 인증 환경을 복사하거나 앱을 시작하지 않습니다. 시험 파일과 컨테이너만 정리합니다. 정상 교체 후 이전 프론트는 중지 상태로 보존합니다. 백엔드·DB·출석·점수 명령과 이미지·볼륨 일괄 삭제는 수행하지 않습니다.

## 유지하는 설정

| 항목                                      | 값                                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 메모리 / 메모리+swap 합계                 | 각각 768 MiB이며 추가 swap은 0 MiB입니다.                                                                                |
| V8 old-space                              | 192 MiB입니다.                                                                                                           |
| `MALLOC_ARENA_MAX` / `UV_THREADPOOL_SIZE` | 각각 2입니다. 전체 HTTP 동시 요청 수를 2개로 제한하는 설정은 아닙니다.                                                   |
| 캐시 마운트                               | 루트 읽기 전용을 유지하고 `.next/cache/images`를 기존 디스크에 쓰기 가능하게 연결합니다.                                 |
| 캐시 정리                                 | 1분 간격으로 실행하며 512 MiB 초과 또는 디스크 여유 2 GiB 미만이면 오래된 캐시부터 384 MiB·여유 2 GiB를 목표로 줄입니다. |

512 MiB는 강제 할당량이 아닌 주기적 정리 기준입니다. 최근 60초 내 변경 항목은 보호하며, 관리 표식·예상한 파일명을 검사하고 심볼릭 링크를 제외합니다. 스캔 전후와 삭제 직전에 디렉터리 세대를 대조합니다. 갱신 중 사라지거나 재생성된 항목은 건너뛰고 다음 항목을 처리하며, 권한·디스크 오류는 실패로 남깁니다. 독립적인 앱 쓰기와의 완전한 배타 처리는 아니며 크기는 스캔 시점 추정값입니다. GCS 원본 이미지는 정리 경로에 없습니다.

## 로컬 검증

```bash
python3 -m unittest discover -s deployment/homepage/tests -p 'test_*.py' -v
python3 deployment/homepage/tests/docker_deployment.py --base-image <적재한_로컬_호환_이미지> --run-id <새_실행_ID> --output-dir <저장소_밖_결과_경로>
```

첫 검사는 Python 표준 라이브러리와 합성 파일·Docker 응답만 사용합니다. 두 번째 검사는 로컬 Unix 소켓 Docker와 사전 적재 이미지를 사용하며 원격 Docker 주소를 거부합니다. 실제 Docker 교체·복구, 캐시 권한 거부, 정지 후 응답 유실을 시험하되 백엔드 상태는 대체값입니다. 두 이미지는 앱 파일이 같고 합성 기본 환경변수·리비전 라벨만 다릅니다.

Docker 검증 결과 JSON·JSONL은 `--output-dir`로 저장소 밖 위치를 지정해 보관합니다. 생략 시 Git에서 제외한 `.test-results/`를 사용하며 기존 실행 ID를 덮어쓰지 않습니다. 결과 로그는 커밋하지 않고 PR 본문에는 요약만 남깁니다.

이 진입점을 사용한 GCP 수동 배포에 적용되는 설정입니다. GitHub·Vercel 자동 배포를 연결하지 않습니다. 새 VM이나 다른 앱 실행 구조로 옮길 때는 운영 도구·정책·캐시 경로·타이머를 함께 검토해야 합니다.
