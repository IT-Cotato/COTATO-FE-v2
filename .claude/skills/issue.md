# issue 스킬

## 트리거

다음 요청이 오면 이 스킬을 사용한다:

- `/issue [타입] [제목 또는 설명]`
- "이슈 만들어줘", "GitHub 이슈 생성", "이슈 열어줘"

인자 없이 실행하면 현재 대화 컨텍스트에서 작업 내용을 자동으로 추론한다.

---

## 이슈 타입

> **⚠️ CRITICAL: 이슈 제목 prefix는 반드시 `[TYPE]:` 형태로 콜론(:)을 포함한다. `[TYPE]` 단독으로 쓰는 것은 금지.**

| 타입       | 이슈 제목 prefix | 타입 라벨          |
| ---------- | ---------------- | ------------------ |
| `feat`     | `[FEAT]:`        | `✨ Feature`       |
| `fix`      | `[FIX]:`         | `🐛 Bug`           |
| `refactor` | `[REFACTOR]:`    | `💦 Refactor`      |
| `design`   | `[DESIGN]:`      | `🎨 Style`         |
| `style`    | `[STYLE]:`       | `🎨 Style`         |
| `ui`       | `[UI]:`          | `📷 UI`            |
| `docs`     | `[DOCS]:`        | `📄 Documentation` |
| `test`     | `[TEST]:`        | `🌊 TEST`          |
| `chore`    | `[CHORE]:`       | `🧹 CHORE`         |
| `ci`       | `[CI]:`          | `😎 DevOps`        |
| `perf`     | `[PERF]:`        | `💦 Refactor`      |
| `security` | `[SECURITY]:`    | `🐛 Bug`           |

## 라벨 자동화 구조

> - **type 라벨**: `.github/workflows/type-labeler.yml` — 이슈/PR 제목의 `[TYPE]:` 패턴 감지 후 **자동** 부착
> - **scope 라벨 (이슈)**: workflow로 처리되지 않으므로 `--label`로 직접 지정
> - **scope 라벨 (PR)**: `.github/labeler.yml` 이 변경 파일 기반으로 **자동** 부착

이슈 생성 시 `--label`은 scope 라벨만 지정한다. type 라벨은 workflow가 자동으로 붙여준다.

| scope         | 스코프 라벨   |
| ------------- | ------------- |
| `homepage`    | `🥔 HOMEPAGE` |
| `recruit`     | `🥔 RECRUIT`  |
| `root` / `ui` | `🍟 COMMON`   |

---

## 이슈 본문 템플릿

### Feature Request — feat / refactor / design / style / ui / docs / test / chore / ci / perf

```markdown
### 🛠️ 만들고자 한 기능 설명

{작업 목적과 내용을 2-3문장으로 서술}

### ✅ TODO LIST

- [ ] {세부 작업 1}
- [ ] {세부 작업 2}
- [ ] {세부 작업 3}

### ⏰ 예상 작업 기간

{컨텍스트 기반 예상 기간, 모르면 "-"}

### 📝 참고 링크(선택)

### 🗣️ ETC(선택)

### 📸 피그마 스크린샷
```

### Bug Report — fix / security

```markdown
## 어떤 버그인가요?

{버그를 간결하게 설명}

<br><br>

## 어떤 상황에서 발생한 버그인가요?

- **Given**: {사전 조건}
- **When**: {어떤 행동을 했을 때}
- **Then**: {어떤 문제가 발생했는지}

<br><br>

## 예상 결과

{정상적으로 동작했어야 할 결과}

<br><br>

## 참고자료

{관련 스크린샷, 에러 로그 등 — 없으면 생략}
```

---

## 브랜치 네이밍 컨벤션

```
{type}/{scope}/{이슈번호}-{kebab-case-영어설명}
```

- `scope`: `recruit` / `homepage` / `root` / `ui` — 이슈 내용에 맞는 스코프 선택
- `설명`: 이슈 제목을 **영어**로 의미 번역 후 kebab-case 변환 (한국어 그대로 금지)
- 최대 50자 이내로 축약

```
feat/recruit/5-user-login
fix/homepage/7-main-layout-broken
refactor/root/12-auth-hook-cleanup
chore/ui/15-storybook-config-update
```

---

## 워크플로우

### Phase 1 — 분석 및 계획 수립

1. 인자에서 타입과 설명 파싱. 없으면 현재 대화 컨텍스트에서 추론.
2. 타입에 맞는 템플릿 선택 후 내용 채우기.
3. `git config user.name`으로 작성자 확인.
4. 계획표 출력 후 **사용자 승인 대기**

계획표 출력 형식:

```
## 이슈 생성 계획

타입: feat
제목: [FEAT]: 사용자 로그인 구현
Assignee: @me
라벨: ✨ Feature, 🥔 HOMEPAGE

### 이슈 본문 미리보기
---
(본문 내용)
---

생성될 브랜치: feat/recruit/{번호}-user-login
Base 브랜치: develop

계속 진행할까요?
```

### Phase 2 — 이슈 생성

> 제목은 반드시 `[TYPE]:` 형태로 콜론을 포함한다.

```bash
gh issue create \
  --title "[FEAT]: 제목" \
  --body "$(cat <<'EOF'
...
EOF
)" \
  --assignee "@me" \
  --label "🥔 HOMEPAGE"
```

> type 라벨(`✨ Feature` 등)은 `type-labeler.yml` workflow가 자동 부착하므로 생략.
> scope 라벨(`🥔 HOMEPAGE` 등)은 이슈에 workflow가 없으므로 직접 지정.

출력된 이슈 URL에서 번호 파싱.

### Phase 3 — 브랜치 생성 및 체크아웃

```bash
git checkout -b {type}/{scope}/{번호}-{description} origin/develop
```

결과 출력:

```
이슈 생성 완료: #{번호} — {제목}
   URL: https://github.com/IT-Cotato/COTATO-FE-v2/issues/{번호}
브랜치 생성 완료: {type}/{scope}/{번호}-{description}
   이제 작업을 시작할 수 있습니다.
```

---

## 주의사항

- assignee는 항상 `@me`
- `gh` CLI 미인증 시 `gh auth login` 먼저 안내
- 같은 이름의 브랜치가 이미 있으면 사용자에게 알리고 다른 이름 제안
- `origin/develop`이 없는 경우 사용자에게 base 브랜치를 물어본다

---

## 금지

- 사용자 승인 없이 이슈를 생성하지 않는다
- **`[TYPE]` 뒤에 콜론(:)을 빠뜨리지 않는다 — `[FEAT]`은 틀렸고 `[FEAT]:`이 맞다**
- 브랜치 설명에 한국어를 그대로 쓰지 않는다 (반드시 영어 kebab-case 변환)
- `gh` 인증 상태를 확인하지 않고 실행하지 않는다
- `--label` 없이 이슈를 생성하지 않는다
