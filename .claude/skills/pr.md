# pr 스킬

## 트리거

다음 요청이 오면 이 스킬을 사용한다:

- "PR 만들어줘", "PR 올려줘", `pull request`
- "리뷰 요청 준비해줘"
- `/pr`

---

## 핵심 원칙

1. **전체 커밋 히스토리 기준**: `develop` 브랜치에서 갈라진 전체 변경을 분석한다. 최신 커밋 하나만 보지 않는다.
2. **제목은 [TYPE]: 한국어 요약** 형식 (예: `[FEAT]: 로그인 API 연동`)
3. **WHY 중심**: 무엇을 바꿨는지는 diff가 대신한다. 본문에는 왜 이 변경이 필요했는지를 적는다.
4. **base 브랜치는 반드시 확인**: 기본값은 `develop`. 다르면 사용자에게 먼저 물어본다.

---

## 워크플로우

1. `git log develop...HEAD --oneline`으로 포함될 커밋 전체 확인
2. `git diff develop...HEAD --stat`으로 전체 변경 파악
3. 브랜치 push 여부 확인 → 없으면 `git push -u origin <branch>` 수행
4. PR 본문 초안 작성 (아래 템플릿 참고)
5. draft PR로 열지 일반 PR로 열지 사용자에게 확인
6. `gh pr create` 실행

---

## PR 제목 형식

```
[TYPE]: <전체 변경사항을 아우르는 한국어 요약>
```

| 커밋 타입  | TYPE       |
| ---------- | ---------- |
| `feat`     | `FEAT`     |
| `fix`      | `FIX`      |
| `design`   | `DESIGN`   |
| `refactor` | `REFACTOR` |
| `docs`     | `DOCS`     |
| `test`     | `TEST`     |
| `chore`    | `CHORE`    |

---

## PR 본문 — PULL_REQUEST_TEMPLATE.md 형식 준수

`.github/PULL_REQUEST_TEMPLATE.md` 의 모든 섹션을 빠짐없이 채운다:

```markdown
## ISSUE 🔗

close #<이슈번호> <!-- 이슈 번호가 확인되면 작성, 없으면 빈 칸 -->

<br><br>

## What is this PR? 🔍

<!-- 커밋 수에 따라 아래 구조 적용 -->

<br><br>

## Screenshot 📷

<!-- 구현된 기능/디자인 gif — 에이전트는 가이드 주석만 유지 -->

<br><br>

## Test Checklist ✔

- [ ] <검증 항목 1>
- [ ] <검증 항목 2>
```

### What is this PR? 작성 규칙

커밋이 1개인 경우:

```markdown
- **💡 배경**: 왜 이 작업이 필요했는지 설명합니다.
- **✨ 주요 변경사항**: 무엇을 어떻게 바꿨는지 설명합니다.
- **🧪 리뷰 포인트**: 리뷰어가 집중해야 할 부분 (불명확하면 생략 가능)
```

커밋이 2개 이상인 경우:

```markdown
### 1. feat(recruit): 사용자 프로필 컴포넌트 추가

- **💡 배경**: ...
- **✨ 주요 변경사항**: ...
- **🧪 리뷰 포인트**: ...

### 2. fix(recruit): 토큰 갱신 오류 수정

- **💡 배경**: ...
- **✨ 주요 변경사항**: ...
```

---

## 작성 스타일 규칙

- **서술형**: "~했습니다", "~되었습니다" 체 사용. 명사형·축약형 금지
  - 나쁜 예: "토큰 갱신 로직 수정" → 좋은 예: "토큰 갱신 로직을 수정했습니다"
- **불필요한 수식어 제거**: "~를 진행했습니다", "~에 대해서" 금지
  - 나쁜 예: "리팩토링을 진행했습니다" → 좋은 예: "리팩토링했습니다"
- **중복 제거**: 여러 커밋 간 겹치는 표현은 통합한다

---

## gh pr create 호출 형식

```bash
gh pr create \
  --title "[FEAT]: PR 제목" \
  --body "$(cat <<'EOF'
## ISSUE 🔗

close #12

<br><br>

## What is this PR? 🔍

...

<br><br>

## Screenshot 📷

<!-- 구현된 기능/디자인 gif -->

<br><br>

## Test Checklist ✔

- [ ] 기능 동작 확인
- [ ] 엣지 케이스 확인
EOF
)"
```

---

## 금지

- PR을 merge하지 않는다 (사용자가 명시적으로 요청해도 확인 절차를 거친다)
- force-push로 base 브랜치를 덮어쓰지 않는다
- reviewer, label, milestone은 사용자가 명시한 경우에만 추가한다
