---
name: cotato-code-review
description: COTATO 프로젝트 코드 리뷰 워크플로우. "코드 리뷰해줘", "review" 입력 시 사용. CRITICAL/HIGH/MEDIUM/LOW 심각도 분류, 프로젝트 컨벤션 준수 확인.
license: MIT
metadata:
  author: cotato
  version: '1.0.0'
---

# code-review 스킬

## 트리거

다음 요청이 오면 이 스킬을 사용한다:

- "코드 리뷰해줘", "이 코드 좀 봐줘", `review`
- "PR 리뷰해줘"
- "이 diff 검토해줘"

---

## 핵심 원칙

1. **findings-first**: 문제가 있으면 먼저 나열한 뒤 설명한다. 칭찬 먼저 하지 않는다.
2. **심각도 명시**: 모든 지적에 심각도를 붙인다.
3. **이유 설명**: "이렇게 해라"만 쓰지 않고, 왜 바꿔야 하는지 한 문장을 덧붙인다.
4. **대안 제시**: 문제를 지적하면 반드시 더 나은 방법을 제안한다.

---

## 심각도 분류

| 심각도   | 의미                          | 머지 여부           |
| -------- | ----------------------------- | ------------------- |
| CRITICAL | 보안 취약점, 데이터 손실 위험 | 반드시 수정 후 머지 |
| HIGH     | 버그, 명확한 로직 오류        | 수정 권장           |
| MEDIUM   | 유지보수 문제, 성능 우려      | 고려 권장           |
| LOW      | 스타일, 사소한 제안           | 선택                |

---

## 리뷰 관점 (순서대로 확인)

1. **보안**: 하드코딩된 비밀값, XSS, 미검증 입력, 민감 정보 노출
2. **정확성**: 로직 오류, 엣지 케이스 누락, 타입 불일치
3. **프로젝트 컨벤션 준수**:
   - ESLint `max-warnings: 0` — 경고 0개 유지
   - `singleQuote: true`, `printWidth: 80`
   - 컴포넌트: `export const`, 페이지/레이아웃: `export default function`
   - 파일명 컨벤션 (PascalCase 컴포넌트, camelCase 훅/유틸, kebab-case 폴더)
4. **설계**: 함수 크기(<50줄), 파일 크기(<800줄), 단일 책임 원칙
5. **가독성**: 이름이 의도를 전달하는지, 매직 넘버, 불필요한 주석

---

## 출력 형식

```
## 리뷰 결과

### [CRITICAL] 하드코딩된 API 키
파일: src/services/api/auth.api.ts:12
문제: API 키가 소스코드에 직접 박혀 있어 git 히스토리에 노출됩니다.
수정: 환경변수 process.env.NEXT_PUBLIC_API_KEY로 교체하세요.

### [HIGH] null 체크 누락
파일: src/utils/parser.ts:34
문제: user가 null일 때 user.id 접근이 런타임 에러를 발생시킵니다.
수정: 옵셔널 체이닝 user?.id를 사용하거나 early return으로 처리하세요.

---
총 CRITICAL: 1 / HIGH: 1 / MEDIUM: 0 / LOW: 2
```

---

## 금지

- 아무 문제가 없을 때 "좋습니다!" 같은 빈 칭찬만 하지 않는다
- 코드 전체를 다시 써주지 않는다 (지적과 제안에 집중)
- 언어 스타일 취향 차이를 CRITICAL로 올리지 않는다
