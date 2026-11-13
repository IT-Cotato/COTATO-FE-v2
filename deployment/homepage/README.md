# 홈페이지 프론트 배포와 이미지 캐시 관리

GCP VM에서 홈페이지 프론트를 교체할 때 검증한 메모리·디스크 캐시 설정을 계승하기 위한 수동 배포 도구입니다. 새 이미지에 설정이 빠진 채 기존 프론트를 중지하지 않도록, 후보의 실제 Docker 설정을 먼저 검사합니다.

## 시작하기

다음 환경을 전제로 합니다.

- Linux AMD64, Docker, Python 3.9 이상, systemd를 사용합니다.
- 홈페이지 프론트가 이미 실행 중이며 호스트 포트는 `13701`, 기존 API 상태 확인 포트는 `13702`입니다.
- 프론트 작업 위치는 `/app`, 실행 명령은 `node apps/homepage/server.js`입니다.
- 이미지 캐시를 쓰는 앱 사용자는 UID/GID `1000:1000`입니다. SSH 로그인 계정의 UID를 뜻하지 않습니다.
- 새 이미지는 VM에 미리 적재하고, 40자리 `org.opencontainers.image.revision` 라벨을 포함해야 합니다. 이 도구는 빌드·업로드·외부 이미지 다운로드를 수행하지 않습니다.

아래 설치·교체 명령은 검토한 운영 작업에서 수동으로 실행합니다. 저장소에 파일을 추가하거나 PR을 생성하는 것만으로 실행되지 않습니다.

### 운영 도구 설치

저장소 루트에서 실행합니다. 기존 정책 파일은 덮어쓰지 않습니다.

```bash
sudo install -d -m 0755 /etc/cotato /usr/local/libexec
sudo install -m 0755 deployment/homepage/homepage_frontend_deploy.py /usr/local/libexec/cotato-homepage-frontend-deploy.py
sudo install -m 0755 deployment/homepage/cache-clean.py /usr/local/libexec/cotato-homepage-image-cache-clean.py
sudo ln -sfn /usr/local/libexec/cotato-homepage-frontend-deploy.py /usr/local/sbin/cotato-homepage-frontend-deploy

if sudo test -e /etc/cotato/homepage-frontend-runtime.json; then
  echo '기존 운영 정책을 유지합니다. 예시와 비교해 필수 설정을 확인하세요.'
else
  sudo install -m 0644 deployment/homepage/runtime.example.json /etc/cotato/homepage-frontend-runtime.json
fi
```

캐시는 원본 이미지나 DB와 다른 전용 경로를 사용합니다. 이미 경로가 있는데 관리 표식이 없다면 기존 데이터를 임의로 관리 대상으로 편입하지 않고 중단합니다.

```bash
set -e
CACHE_DIR=/var/lib/cotato/homepage-image-cache-v108
test "$(sudo realpath -m "$CACHE_DIR")" = "$CACHE_DIR"

if sudo test -e "$CACHE_DIR"; then
  sudo test ! -L "$CACHE_DIR"
  sudo grep -qxF 'cotato-generated-image-cache-20261114-v1' "$CACHE_DIR/.managed-generated-cache-v1"
else
  sudo install -d -o 1000 -g 1000 -m 0750 "$CACHE_DIR"
  printf '%s\n' 'cotato-generated-image-cache-20261114-v1' | sudo tee "$CACHE_DIR/.managed-generated-cache-v1" >/dev/null
  sudo chown root:root "$CACHE_DIR/.managed-generated-cache-v1"
  sudo chmod 0444 "$CACHE_DIR/.managed-generated-cache-v1"
fi

sudo install -m 0644 deployment/homepage/systemd/cotato-homepage-image-cache-clean.service /etc/systemd/system/
sudo install -m 0644 deployment/homepage/systemd/cotato-homepage-image-cache-clean.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now cotato-homepage-image-cache-clean.timer
```

## 사용 방법

빌드·적재한 **불변 이미지 ID**와 릴리즈명을 지정합니다. 태그만 전달하는 배포는 거부합니다.

```bash
sudo cotato-homepage-frontend-deploy --image sha256:<64자리_ID> --release <릴리즈명> --check
sudo cotato-homepage-frontend-deploy --image sha256:<64자리_ID> --release <릴리즈명> --verify-candidate
sudo cotato-homepage-frontend-deploy --image sha256:<64자리_ID> --release <릴리즈명> --apply
```

| 모드                 | 동작                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| 생략 또는 `--check`  | 정책·이미지·캐시·정리 타이머·기존 서비스 상태를 읽기 전용으로 확인합니다.                                |
| `--verify-candidate` | 실제 후보를 생성해 설정을 대조하고 제거합니다. 후보는 시작하지 않습니다.                                 |
| `--apply`            | 검증한 후보로 프론트만 교체합니다. 실패하면 이전 프론트의 이름·재시작 정책을 복원하고 응답을 확인합니다. |

```text
이미 적재한 새 이미지 + 기존 프론트 설정
                    │
                    ▼
       필수 정책·캐시·타이머 검사
          ├─ 누락 → 기존 프론트 유지
          └─ 통과
               │
               ▼
       후보 생성 → 실제 Docker 설정 대조
               │
               ▼ (--apply에서만)
       기존 프론트 중지·보존 → 새 프론트 시작
          ├─ 정상 → 새 프론트 사용
          └─ 실패 → 이전 프론트 복원·응답 확인
```

교체 중 짧은 접속 중단이 있을 수 있습니다. 이전 프론트는 중지 상태로 보존하며 이미지·볼륨을 일괄 삭제하지 않습니다. 동시 배포는 파일 잠금으로 차단합니다. 백엔드·DB·출석·점수 명령과 데이터 재계산은 수행하지 않습니다.

### 유지하는 정책

| 항목                                      | 값·의미                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 메모리 / 메모리+swap 합계                 | 각각 `768 MiB`, 추가 swap `0 MiB`입니다.                                                                |
| V8 old-space                              | `192 MiB`입니다.                                                                                        |
| `MALLOC_ARENA_MAX` / `UV_THREADPOOL_SIZE` | 각각 `2`입니다. 전체 HTTP 동시 요청을 2개로 제한한다는 뜻은 아닙니다.                                   |
| 파일시스템                                | 루트 읽기 전용을 유지하고 `.next/cache/images`만 기존 디스크에 쓰기 가능하게 연결합니다.                |
| 정리 시점                                 | 부팅 후 2분, 이후 1분 간격입니다.                                                                       |
| 용량 정리                                 | 512 MiB 초과 또는 디스크 여유 2 GiB 미만이면 오래된 관리 캐시부터 384 MiB·여유 2 GiB를 목표로 줄입니다. |
| 최근 쓰기 보호                            | 최근 60초 내 변경됐거나 수집 후 변경된 디렉터리는 건너뜁니다.                                           |

512 MiB는 강제 할당량이 아니라 주기적 정리 기준입니다. 관리 표식·43자 캐시 키·예상한 파일명을 확인하고 심볼릭 링크를 제외합니다. 정리 대상은 생성한 변환 캐시이며 GCS 원본 이미지는 이 디렉터리에 없습니다.

인증 환경·명령·포트·기존 보안 설정은 현재 프론트에서 메모리로 읽어 계승합니다. 비밀값을 로그나 새 `.env` 사본으로 저장하지 않습니다. 새로운 실행 구조·UID·캐시 위치·메모리 정책이 필요하면 스크립트와 정책을 함께 검토해야 합니다.

## 로컬 검증

Python 표준 라이브러리 검사부터 실행합니다. Docker·GCP·DB에 연결하지 않습니다.

```bash
python3 deployment/homepage/tests/run_checks.py --run-id <새_실행_ID>
```

실제 Docker 교체·복구 검사는 **로컬 Unix 소켓 Docker와 미리 적재한 호환 홈페이지 이미지**가 있을 때 선택해서 실행합니다. 원격 Docker 주소는 거부하며 시험 컨테이너는 내부 격리망에 둡니다. 백엔드 상태 확인은 시험 대체값이고, 운영 환경변수·운영 DB는 사용하지 않습니다.

```bash
python3 deployment/homepage/tests/docker_deployment.py --base-image <로컬_호환_이미지> --run-id <새_실행_ID>
```

이 검사는 동일한 앱 파일에 리비전 라벨만 바꾼 두 이미지를 사용합니다. 배포 설정 계승·실패 복구를 검증하며 신규 업무 코드의 호환성이나 이미지 처리의 최대 부하 성능을 검증하지 않습니다.

결과는 기본적으로 `.test-results/<실행_ID>.json`·`.jsonl`에 분리 보관합니다. `--output-dir`로 위치를 바꿀 수 있고 같은 실행 ID의 기존 결과를 덮어쓰지 않습니다. 원문 오류·개인 경로 대신 사례·시각·오류 종류를 기록합니다. [실행한 검증 결과](test-results/README.md)를 함께 확인하세요.

## 구조와 변경 규칙

- `homepage_frontend_deploy.py`: 현재 운영에 설치한 배포 스크립트 사본입니다.
- `runtime.example.json`: 비밀값 없는 정책 예시입니다. 실제 운영 설정 파일은 커밋하지 않습니다.
- `cache-clean.py`, `systemd/`: 현재 적용한 캐시 정리 스크립트와 서비스·타이머입니다.
- `tests/`: 합성 파일 검사와 선택적인 로컬 Docker 검사입니다.
- `test-results/`: 실행한 검증의 안전한 결과·한계를 기록합니다.

현재 GCP 배포에서 이 진입점을 사용해야 정책이 적용됩니다. 임의의 `docker run`이나 Vercel 배포에 설정을 강제로 주입하지 않으며 GitHub·Vercel 자동 배포를 연결하지 않습니다. VM을 새로 만들 때는 이 운영 도구·정책·타이머도 복원해야 합니다.

배포·캐시 설정 변경은 `develop` 대상 PR에서 검증하며 앱의 인증·출석·점수 코드와 섞지 않습니다. 운영 비밀값, 실제 회원 정보, 비공개 프로젝트·계정 식별자는 추가하지 않습니다.
