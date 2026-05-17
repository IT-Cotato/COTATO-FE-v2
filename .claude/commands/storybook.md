# Storybook 전문가 명령어

이 명령어는 Cotato Design System의 Storybook 전문가로서 동작합니다.
스토리 작성, 컴포넌트 문서화, Chromatic 배포에 관한 모든 작업을 지원합니다.

## 프로젝트 구조

```
packages/ui/
├── .storybook/
│   ├── main.ts          # Storybook 설정 (Vite builder, addons)
│   ├── preview.ts       # 전역 데코레이터, 배경, 뷰포트, 다크모드
│   ├── manager.ts       # Cotato 커스텀 테마 적용
│   └── theme.ts         # Cotato 테마 정의 (primary: #f87d02, bg: #1f1f1f)
├── src/
│   ├── stories/
│   │   └── Introduction.mdx   # 디자인 시스템 온보딩 문서
│   └── components/
│       └── {폴더}/
│           └── {Component}.stories.tsx  # 컴포넌트와 같은 폴더에 위치
```

## 스토리 작성 규칙

### 1. 파일 위치

스토리 파일은 반드시 **컴포넌트와 같은 폴더**에 위치합니다.

```
src/components/buttons/Button.tsx
src/components/buttons/Button.stories.tsx  ← 올바름
src/stories/Button.stories.tsx             ← 잘못됨
```

### 2. title 네이밍 컨벤션

```
Components/{카테고리}/{컴포넌트명}
```

| 카테고리     | 컴포넌트                                    |
| ------------ | ------------------------------------------- |
| `Buttons`    | Button, FullButton                          |
| `Form`       | FormInput, FormTextarea, FormFile, FormLink |
| `Feedback`   | Spinner, StatusChip                         |
| `Overlay`    | Modal, ConfirmModal                         |
| `Navigation` | Pagination                                  |
| `Selection`  | Checkbox, CheckboxFilter, StatusDropdown    |
| `Brand`      | CotatoLogo, HeroMainBanner                  |

### 3. CSF3 패턴 (필수)

```tsx
import type {Meta, StoryObj} from '@storybook/react';
import {ComponentName} from './ComponentName';

const meta = {
  title: 'Components/{Category}/{ComponentName}',
  component: ComponentName,
  tags: ['autodocs'], // 자동 API 문서 생성 (필수)
  argTypes: {
    // 각 prop의 control 타입 명시
  },
  args: {
    // 모든 스토리에 공통으로 적용할 기본값
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### 4. 스토리 작성 체크리스트

새 스토리를 작성할 때 반드시 확인:

- [ ] `tags: ['autodocs']` 포함 (자동 문서화)
- [ ] 기본 상태(Default/Primary) 스토리 포함
- [ ] disabled 상태 스토리 포함 (해당 시)
- [ ] error 상태 스토리 포함 (Form 컴포넌트)
- [ ] interactive 컴포넌트는 `render` 함수로 상태 관리
- [ ] argTypes에 주요 prop의 control 타입 명시
- [ ] 제네릭 컴포넌트는 구체적인 타입으로 인스턴스화

### 5. Interactive 컴포넌트 패턴

상태가 필요한 컴포넌트(Modal, Pagination 등)는 `render` 함수 사용:

```tsx
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label='열기' onClick={() => setIsOpen(true)} />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='제목' />
      </>
    );
  },
};
```

### 6. 제네릭 컴포넌트 패턴

`StatusChip<T>`, `StatusDropdown<T>`, `CheckboxFilter<T>` 같은 제네릭 컴포넌트:

```tsx
type MyStatus = 'ACTIVE' | 'INACTIVE';

const config: Record<MyStatus, {label: string; className: string}> = {
  ACTIVE: {label: '활성', className: 'bg-chip'},
  INACTIVE: {label: '비활성', className: 'bg-neutral-400'},
};

const meta = {
  // ...
} satisfies Meta<typeof StatusChip<MyStatus>>;
```

## 디자인 토큰 참조

### 색상 (CSS 변수)

```css
--color-primary: #f87d02 --color-secondary: #ffb800 --color-neutral-50
  ~--color-neutral-800 (50, 100, 200, 300, 400, 500, 600, 700, 800)
  --color-text-default: #f5f5f5 --color-text-muted: #9e9e9e
  --color-alert: #e5484d --color-chip: #68ca3a;
```

### 타이포그래피 클래스

```
text-h1 ~ text-h5
text-body-l, text-body-l-b, text-body-l-sb
text-body-m, text-body-m-sb
text-body-s
```

### ColorKey 타입 (Button 등에서 사용)

```ts
type ColorKey =
  | 'primary' | 'secondary' | 'hover' | 'active' | 'disabled' | 'alert'
  | 'neutral-50' ~ 'neutral-800'
  | 'text-default' | 'text-muted' | 'text-disabled'
  | 'white' | 'chip'
```

## 로컬 개발

```bash
# UI 패키지에서 Storybook 실행
pnpm --filter @repo/ui storybook

# 빌드
pnpm --filter @repo/ui build-storybook
```

## Chromatic 배포

### 수동 배포

```bash
# CHROMATIC_PROJECT_TOKEN 환경변수 필요
pnpm --filter @repo/ui chromatic
```

### 자동 배포

`.github/workflows/chromatic.yml` — `packages/ui/**` 변경 시 자동 실행:

- `main` 브랜치 push: 전체 배포
- PR: 변경된 스토리만 시각적 리그레션 테스트

### Chromatic 프로젝트 토큰 설정

1. [Chromatic](https://www.chromatic.com/)에서 프로젝트 생성
2. GitHub 레포 Settings → Secrets → `CHROMATIC_PROJECT_TOKEN` 추가

## 자주 묻는 질문

### Q: SVG import가 안 됩니다

`vite-plugin-svgr`이 필요합니다. `.storybook/main.ts`의 `viteFinal`에서 플러그인을 추가하세요.

### Q: Tailwind CSS 클래스가 적용 안 됩니다

`preview.ts`에서 `import '../src/styles.css'`가 선언되어 있는지 확인하세요.

### Q: `'use client'` 컴포넌트가 Storybook에서 오류납니다

Storybook은 CSR 환경이므로 `'use client'` 지시어를 무시합니다. 정상 동작합니다.

### Q: framer-motion 애니메이션이 테스트에서 불안정합니다

스토리에 `parameters: { chromatic: { pauseAnimationAtEnd: true } }`를 추가하세요.
