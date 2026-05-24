# storybook 스킬

## 트리거

다음 요청이 오면 이 스킬을 사용한다:

- "스토리 만들어줘", "스토리북 작성해줘"
- "컴포넌트 문서화해줘"
- `/storybook`

---

## 프로젝트 구조

```
packages/ui/
├── .storybook/
│   ├── main.ts          # Storybook 설정 (Vite builder, addons)
│   ├── preview.ts       # 전역 데코레이터, 배경, 뷰포트, 다크모드
│   ├── manager.ts       # Cotato 커스텀 테마 적용
│   └── theme.ts         # Cotato 테마 (primary: #f87d02, bg: #1f1f1f)
└── src/components/
    └── {폴더}/
        ├── {Component}.tsx
        └── {Component}.stories.tsx  ← 컴포넌트와 같은 폴더에 위치
```

---

## 스토리 작성 규칙

### 파일 위치

스토리 파일은 **컴포넌트와 같은 폴더**에 위치한다.

```
src/components/buttons/Button.tsx
src/components/buttons/Button.stories.tsx  ← 올바름
src/stories/Button.stories.tsx             ← 잘못됨
```

### title 네이밍

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

### CSF3 패턴 (필수)

```tsx
import type {Meta, StoryObj} from '@storybook/react';
import {ComponentName} from './ComponentName';

const meta = {
  title: 'Components/{Category}/{ComponentName}',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### 스토리 작성 체크리스트

- [ ] `tags: ['autodocs']` 포함
- [ ] 기본 상태(Default/Primary) 스토리 포함
- [ ] disabled 상태 스토리 포함 (해당 시)
- [ ] error 상태 스토리 포함 (Form 컴포넌트)
- [ ] interactive 컴포넌트는 `render` 함수로 상태 관리
- [ ] argTypes에 주요 prop의 control 타입 명시
- [ ] 제네릭 컴포넌트는 구체적인 타입으로 인스턴스화

### Interactive 컴포넌트 패턴

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

### 제네릭 컴포넌트 패턴

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

---

## 디자인 토큰

### 색상 (CSS 변수)

```
--color-primary: #f87d02
--color-secondary: #ffb800
--color-neutral-50 ~ --color-neutral-800
--color-text-default: #f5f5f5
--color-text-muted: #9e9e9e
--color-alert: #e5484d
--color-chip: #68ca3a
```

### 타이포그래피 클래스

```
text-h1 ~ text-h5
text-body-l, text-body-l-b, text-body-l-sb
text-body-m, text-body-m-sb
text-body-s
```

---

## 로컬 개발 명령어

```bash
pnpm --filter @repo/ui storybook        # 개발 서버
pnpm --filter @repo/ui build-storybook  # 빌드
pnpm --filter @repo/ui chromatic        # Chromatic 배포 (토큰 필요)
```

---

## Chromatic 자동 배포

`.github/workflows/chromatic.yml` — `packages/ui/**` 변경 시 자동 실행:

- `main` 브랜치 push: 전체 배포
- PR: 변경된 스토리만 시각적 리그레션 테스트
