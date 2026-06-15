---
name: cotato-release
description: COTATO 프로젝트 릴리즈 자동화 워크플로우. "릴리즈해줘", "release PR", /release 입력 시 사용. develop→release/X.Y.Z→main, GitHub Release draft 자동 생성.
license: MIT
metadata:
  author: cotato
  version: '1.0.0'
---

# release 스킬

## 트리거

다음 요청이 오면 이 스킬을 사용한다:

- "릴리즈해줘", "릴리즈 만들어줘", "릴리즈 올려줘"
- "release 브랜치 만들어줘", "release PR 올려줘"
- `/release`

---

## 핵심 원칙

1. **버전 확인 먼저**: 사용자가 버전을 명시하지 않으면 최신 태그를 확인하고 다음 버전을 제안한다.
2. **develop → release/X.Y.Z → main 흐름**: release 브랜치는 항상 `develop` 기준으로 생성한다.
3. **GitHub Release draft 먼저**: `gh release create --draft --generate-notes`로 자동 생성된 What's Changed를 가져온다.
4. **PR 본문 = Release 노트**: 자동 생성된 내용을 그대로 PR 본문으로 사용한다. 수정하지 않는다.
5. **PR은 draft로 생성하지 않는다**: release PR은 바로 Open 상태로 연다.

---

## 워크플로우

### Step 1 — 버전 결정

```bash
gh release list --limit 1
```

버전이 명시되지 않은 경우: 최신 태그를 보여주고 다음 버전 (patch +1) 을 제안한다.
사용자 확인 후 진행한다.

### Step 2 — release 브랜치 생성 및 push

```bash
git checkout develop
git pull origin develop
git checkout -b release/X.Y.Z
git push -u origin release/X.Y.Z
```

### Step 3 — GitHub Release draft 생성 (자동 노트 포함)

```bash
gh release create vX.Y.Z \
  --draft \
  --generate-notes \
  --title "vX.Y.Z" \
  --target release/X.Y.Z
```

### Step 4 — 자동 생성된 Release 노트 추출

```bash
RELEASE_NOTES=$(gh release view vX.Y.Z --json body --jq '.body')
```

### Step 5 — release PR 생성

```bash
gh pr create \
  --title "[RELEASE]: vX.Y.Z" \
  --body "$RELEASE_NOTES" \
  --base main \
  --head release/X.Y.Z
```

---

## 실제 실행 스크립트

```bash
VERSION="X.Y.Z"

git checkout develop && git pull origin develop
git checkout -b release/$VERSION
git push -u origin release/$VERSION

gh release create v$VERSION \
  --draft \
  --generate-notes \
  --title "v$VERSION" \
  --target release/$VERSION

NOTES=$(gh release view v$VERSION --json body --jq '.body')

gh pr create \
  --title "[RELEASE]: v$VERSION" \
  --body "$NOTES" \
  --base main \
  --head release/$VERSION
```

---

## 결과 출력

```
✅ 릴리즈 준비 완료

- 브랜치: release/X.Y.Z
- GitHub Release (draft): https://github.com/IT-Cotato/COTATO-FE-v2/releases/tag/vX.Y.Z
- PR: <URL>

다음 단계:
1. PR 리뷰 후 main에 머지
2. GitHub Release draft를 publish (Releases 탭에서 직접)
```

---

## 주의사항

- **Release publish는 자동으로 하지 않는다**: draft 상태로만 생성. PR 머지 후 사람이 직접 publish한다.
- **버전 태그는 `v` 접두사 포함**: `1.0.2`로 입력해도 내부에서 `v`를 붙인다.
- `--generate-notes`는 직전 태그 이후 `main`에 머지된 PR 기준으로 수집한다.
- 이미 같은 태그가 존재하면 `gh release delete vX.Y.Z` 후 재시도한다.

---

## 금지

- release 브랜치를 `main` 또는 `develop` 외 브랜치에서 파지 않는다
- PR을 merge하지 않는다
- Release를 publish(공개)하지 않는다 — draft 상태 유지
- What's Changed 내용을 임의로 편집하거나 요약하지 않는다
