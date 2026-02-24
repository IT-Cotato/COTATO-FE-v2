
# COTATO Official FE v2

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br>

### COde Together, Arrive TOgether. IT 연합동아리 코테이토 
> 배포 링크 바로가기

[![코테이토 배포 링크][cotato-shield]][cotato-url]
[![리크루트 배포 링크][recruit-shield]][recruit-url]

<br>


![COTATO Main Banner](https://github.com/user-attachments/assets/9562e2b9-c48b-4bbe-be7a-3cdb4a29ea7f)

<br>

## 📋 목차

- [📖 프로젝트 개요](#-프로젝트-개요)
- [👤 팀원](#-팀원)
- [💡 주요 기능](#-주요-기능)
- [🖥️ 화면 UI](#️-화면-ui)
- [⚙️ 기술 스택 & 아키텍처](#️-기술-스택--아키텍처)
- [📝 개발 컨벤션](#-개발-컨벤션)
- [⭐ 설치 및 실행](#-설치-및-실행)
<br>

---

# 📖 프로젝트 개요

> [!IMPORTANT]  
> **COTATO Official**은 `COde Together, Arrive TOgether`라는 비전을 실천하는 IT 연합동아리 코테이토의 공식 플랫폼입니다.

기존 홈페이지의 활동 아카이빙 부재와 불편한 UI를 개선하기 위한 **v2 리뉴얼 프로젝트**입니다. <br>
이번 **v2 리뉴얼 프로젝트**는 사용자 중심의 설계를 통해 동아리의 가치를 명확히 전달하고 운영 효율을 극대화하는 데 집중했습니다.

<br>

---

## 👤 팀원

<table align="center">
  <tr>
    <td align="center" width="200">
      <a href="https://github.com/choyeon2e">
        <img src="https://avatars.githubusercontent.com/u/46335139?v=4" width="120" height="120" style="border-radius: 50%;" alt="김초연"/>
      </a>
      <br />
      <a href="https://github.com/choyeon2e"><strong>김초연</strong></a>
      <br />
      <sub><b>Frontend Leader</b></sub>
    </td>
    <td align="center" width="200">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/194193856?v=4" width="120" height="120" style="border-radius: 50%;" alt="김민아"/>
      </a>
      <br />
      <a href="https://github.com/kimminna"><strong>김민아</strong></a>
      <br />
      <sub><b>Frontend Dev</b></sub>
    </td>
    <td align="center" width="200">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/155097020?v=4" width="120" height="120" style="border-radius: 50%;" alt="양희정"/>
      </a>
      <br />
      <a href="https://github.com/DandelionQZ"><strong>양희정</strong></a>
      <br />
      <sub><b>Frontend Dev</b></sub>
    </td>
    <td align="center" width="200">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/163178666?v=4" width="120" height="120" style="border-radius: 50%;" alt="하지민"/>
      </a>
      <br />
      <a href="https://github.com/JiiminHa"><strong>하지민</strong></a>
      <br />
      <sub><b>Frontend Dev</b></sub>
    </td>
  </tr>
</table>

<br>

---

## 💡 주요 기능

### 🏠 Homepage (`apps/homepage`)
- **동아리 브랜딩**: 코테이토의 정체성과 활동 내역을 한눈에 확인
- **세션 아카이빙**: 매주 진행되는 교육 세션 자료와 기록 보관
- **출석**: 세션별 출석 관리 및 위치 정보 기반 출석 진행
- **CS 퀴즈 바로가기**: 부원들의 기술 역량 강화를 위한 퀴즈 풀이 시스템 [mait.kr](https://mait.kr) 바로가기
- **마이페이지**: 개인별 출석 현황 및 상벌점 실시간 조회

### 🔐 Recruit (`apps/recruit`)
- **지원 프로세스**: 구글 폼을 대체하는 자체 지원서 작성 및 임시저장 기능을 제공
- **어드민 대시보드 제공**: 운영진이 지원서를 심사하고 합격 여부를 대량으로 관리
- **실시간 알림**: 지원 상태 변경 및 공지사항을 실시간으로 확인

<br>

---

## 🖥️ 화면 UI

### 🏠 Homepage (`apps/homepage`)
> 코테이토의 브랜딩과 활동 아카이빙을 담당하는 메인 플랫폼입니다.

<div align="center">

| HOME | ABOUT US | PROJECT |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/f329a61f-d47e-4537-a773-1016689c8602" width="300" alt="HOME"/> | <img src="https://github.com/user-attachments/assets/93d578c6-e41c-47c0-b0fa-cc4a6b8fd6a5" width="300" alt="ABOUT_US"/> | <img src="https://github.com/user-attachments/assets/1958a43d-4824-4e1d-9715-20e70dbf738f" width="300" alt="PROJECT"/> |
| 코테이토 비전 및 메인 랜딩 | 동아리 히스토리 및 소개 | 프로젝트 통합 아카이빙 |

| MYPAGE | MYPAGE_ADMIN | MYPAGE_ADMIN |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/4242ebc8-d908-497b-bd73-a499761831eb" width="300" alt="MYPAGE"/> | <img src="https://github.com/user-attachments/assets/c3de398c-6ded-4919-92df-e06bc52f6222" width="300" alt="MYPAGE_ADMIN"/> | <img src="https://github.com/user-attachments/assets/9723e545-c369-4fca-b086-c261955d25af" width="300" alt="MYPAGE_ADMIN"/> |
| 개인 활동 통계 및 정보 | 운영진 전용 통합 관리 자동화 시스템 | 운영진 전용 통합 관리 자동화 시스템 |

</div>
<br>

### 🔐 Recruit (`apps/recruit`)
> 신규 부원 모집 및 운영진의 효율적인 심사 프로세스를 지원합니다.

<div align="center">

| APPLY | ADMIN  | 
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/d788393f-c674-435d-af92-8b83ce027650" width="300" alt="Apply Form"/> | <img src="https://github.com/user-attachments/assets/8b4b9aed-4eb1-46c9-83e5-4574843248ea" width="300" alt="Admin Dashboard"/> | 
| 신입기수 지원서 작성 | 운영진용 서류/면접 평가 |

</div>
<br>

# ⚙️ 기술 스택 & 아키텍처

## 📦 기술 스택

> [!TIP]
> 고성능 빌드 시스템과 타입 안정성을 바탕으로 효율적인 협업 환경을 구축했습니다.<br>
> **Turborepo**와 **pnpm workspace**를 통해 반복되는 UI 컴포넌트와 설정을 모듈화하여 개발 생산성을 극대화했습니다.


### 🖌️ 모노레포 패키지 상세 구조
기존의 파편화된 구조에서 벗어나, 모노레포를 이용해 `packages`에서 정의된 표준을 `apps`에서 소비하는 선순환 구조를 구축했습니다.

```text
.
├── 🚀 apps
│   ├── homepage        # 공식 홈페이지 (cotato.kr)
│   └── recruit         # 리크루트 페이지 (recruit.cotato.kr)
│
└── 📦 packages
    ├── ui              # 디자인 시스템 기반 공통 컴포넌트
    ├── tailwind-config # 공통 테마 및 스타일 규격
    ├── typescript-config # 엄격한 타입 체크를 위한 전역 설정
    └── eslint-config   # 일관된 코드 품질을 위한 린팅 룰
```
<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/ecab0f32-6c8c-46f8-b612-d892348d1919" width="450" alt="FE-architecture-1"/>
  <img src="https://github.com/user-attachments/assets/6fa93a4f-9441-4303-89cd-bfbdb91809c8" width="450" alt="FE-architecture-2"/>
</div>
<br>

### 📦 핵심 기술
- **Workspaces**: `pnpm`을 통한 효율적인 패키지 의존성 관리
- **Build System**: `Turborepo`를 활용한 빌드 캐싱 및 파이프라인 최적화
- **Data Fetching**: `React Query` 기반의 서버 상태 관리 (Apps 간 공통 Query Key 공유)
- **Shared UI**: `packages/ui`를 통해 홈페이지와 리크루트 앱 간의 일관된 디자인 시스템 유지

### 🏗️ Monorepo Architecture
- **Turborepo**: 고성능 빌드 시스템 및 캐싱 지원을 통한 파이프라인 최적화
- **pnpm Workspace**: 의존성 관리 최적화 및 로컬 패키지 간 효율적 공유

### ⚡ Framework & Language
- **Next.js**: React 기반 SSR/SSG 지원 및 서버 컴포넌트 활용
- **TypeScript**: 강력한 타입 시스템을 통한 안정적인 코드 작성

### 🎨 Styling & State
- **Tailwind CSS**: 유틸리티 클래스 기반의 빠른 스타일링 및 응답형 디자인
- **Zustand**: 가볍고 직관적인 전역 상태 관리
- **React Query**: `@tanstack/react-query`를 이용한 서버 상태 캐싱 및 관리

### 🛠️ Code Quality & Tools
- **ESLint & Prettier**: 코드 품질 유지 및 팀 컨벤션 자동 적용
- **Husky**: Git hook을 통한 커밋 전 lint/format 자동 검사
- **SVGR**: SVG를 React 컴포넌트로 변환하여 관리
- **CodeRabbit**: AI 기반 코드 리뷰 및 자동 피드백 시스템 도입
<br>

---

# 📝 개발 컨벤션

> [!IMPORTANT]
> 모든 팀원은 원활한 협업을 위해 아래 명시된 규칙을 반드시 준수합니다.
<br>

## 📁 파일 및 폴더 네이밍

| 형식 | 대상 | 예시 |
| :--- | :--- | :--- |
| **PascalCase** | 컴포넌트 파일 | `HomeClient.tsx` |
| **camelCase** | 일반 함수, 커스텀 훅, 스토어 | `formatDate.ts`, `useClickOutside.tsx`, `useAuthStore.ts` |
| **kebab-case** | 일반 파일(styles, mocks), 폴더명, 아이콘 | `mock-faq.ts`, `app/`, `brand-logo.svg` |
| **📌** | mutation, query, api, schema, type | `useApply.mutation.ts`, `auth.api.ts`, `admin.schema.ts` |

- **컴포넌트 선언**: 페이지/레이아웃은 `export default function`, 일반 컴포넌트는 `export const` (Arrow Function) 사용
- **컴포넌트 위치**: 특정 도메인 전용 컴포넌트는 해당 폴더 내 `_components/`에서 관리
- **경로**: `@`를 이용한 절대경로 사용
<br>

## 🎄 브랜치 전략 (Git Flow)

**Format**: `prefix/scope/이슈번호-작업내용` (kebab-case 사용)
- **Scope**: `recruit`, `homepage`, `root`(공통)
- **예시**: `feat/recruit/1-apply-form`, `fix/homepage/12-login-error`

| 머릿말 | 설명 |
| :--- | :--- |
| **main** | 실제 서비스 브랜치 |
| **develop** | 배포 전 작업 기준 브랜치 (Default) |
| **feat** | 새로운 기능 단위 구현 |
| **fix** | 버그 수정 및 에러 해결 |
| **refactor** | 기능 변경 없는 코드 구조 개선 |
| **hotfix** | 서비스 중 긴급 수정 |
<br>

## ✉️ 커밋 메시지 컨벤션

**Format**: `prefix(scope): 작업내용 (#이슈번호)`
- **예시**: `feat(recruit): 지원서 제출 기능 구현 (#5)`

1. 제목과 본문을 빈 행으로 분리합니다.
2. 본문에는 '어떻게'보다 **'무엇을, 왜'** 변경했는지 설명합니다.
3. 제목 끝에 마침표(`.`)는 금지하며, 첫 글자는 대문자로 작성합니다.

<br>

## 🚀 모노레포 프로젝트 관리 (GitHub)

- **Label**: `Recruit`와 `Homepage` 라벨을 색상으로 구분하여 PR에 적용합니다.
- **Milestone**: PR 생성 시 해당되는 마일스톤을 반드시 연결하여 진행 상황을 가시화합니다.
- **SVGR**: SVG 추가 시 `current`, `currentColor`를 적용하여 스타일 제어가 가능하도록 합니다.
<br>

---

# ⭐ 설치 및 실행

## 📋 필수 환경

> [!WARNING]
> 프로젝트 실행 전에 반드시 아래 환경을 확인해주세요.

**필수 환경:**
- **Node.js 18** 이상
- **pnpm** (권장 패키지 매니저)

```bash
# 환경 확인
node -v
pnpm -v
```
<br>

## 💾 설치 과정

1. Repository 클론
```bash
git clone https://github.com/IT-Cotato/COTATO-FE-v2.git
cd COTATO-FE-v2
```

2. 전체 의존성 설치 (Root에서 실행)
```bash
pnpm install
```

3. 전체 프로젝트 실행
```bash
pnpm dev
```
<br>

> [!NOTE]
> - Homepage: http://localhost:3001
> - Recruit: http://localhost:3000
<br>

---


<div align="center">

![Cotato_Project](https://github.com/user-attachments/assets/6be75673-97f5-43bc-8a05-fdd781c34bec)

</div>

[cotato-shield]: https://img.shields.io/badge/-cotato.kr-FF9900?style=for-the-badge
[recruit-shield]: https://img.shields.io/badge/-recruit.cotato.kr-F5A9A9?style=for-the-badge

[cotato-url]: https://www.cotato.kr
[recruit-url]: https://www.recruit.cotato.kr
