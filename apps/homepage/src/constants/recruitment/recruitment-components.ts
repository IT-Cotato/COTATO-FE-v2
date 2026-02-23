import {
  ActivityCategoryType,
  PositionType,
} from '@/schemas/recruitments/recruitments.schema';

export const QUALIFICATIONS_CARD_ITEMS = [
  {
    qualification: 'session',
    illustrationSrc: '/images/qualification-card/clock.webp',
    description: '매주 금요일 19시\n정기세션 참여가능한 자',
  },
  {
    qualification: 'grade',
    illustrationSrc: '/images/qualification-card/univ.webp',
    description: '서울, 경기권 대학교\n4학기 이상 수료자',
  },
  {
    qualification: 'department',
    illustrationSrc: '/images/qualification-card/notebook.webp',
    description: '개발자 지원 시 컴퓨터/IT\n관련학과 주·복수 전공생',
  },
];

export const POSITION_CARD_STYLES: Record<PositionType, string> = {
  PM: 'hover:bg-[conic-gradient(from_0deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-300)_2%,var(--color-neutral-50)_98%,#D9D9D9_100%)]',
  DE: 'hover:bg-[conic-gradient(from_108deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-300)_2%,var(--color-neutral-50)_98%,#D9D9D9_100%)]',
  FE: 'hover:bg-[conic-gradient(from_194deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-300)_2%,var(--color-neutral-50)_98%,#D9D9D9_100%)]',
  BE: 'hover:bg-[conic-gradient(from_293deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-50)_2%,var(--color-neutral-300)_98%,#D9D9D9_100%)]',
};

export const ACTIVITY_CARD_STYLES: Record<
  ActivityCategoryType,
  {
    style: string;
    coverImageUrl: string;
    photoImageUrl: string;
  }
> = {
  OT: {
    style: 'opacity-100',
    coverImageUrl: '/images/activity-card/ot-bg.webp',
    photoImageUrl: '/images/activity-card/ot-photo.webp',
  },
  SESSION: {
    style: 'opacity-40',
    coverImageUrl: '/images/activity-card/session-bg.webp',
    photoImageUrl: '/images/activity-card/session-photo.webp',
  },
  MT: {
    style: 'opacity-40',
    coverImageUrl: '/images/activity-card/mt-bg.webp',
    photoImageUrl: '/images/activity-card/mt-photo.webp',
  },
  DEVTALK: {
    style: 'opacity-80',
    coverImageUrl: '/images/activity-card/dev-talk-bg.webp',
    photoImageUrl: '/images/activity-card/dev-talk-photo.webp',
  },
  COKERTHON: {
    style: 'opacity-70',
    coverImageUrl: '/images/activity-card/cokerthon-bg.webp',
    photoImageUrl: '/images/activity-card/cokerthon-photo.webp',
  },
  DEMODAY: {
    style: 'opacity-40',
    coverImageUrl: '/images/activity-card/demoday-bg.webp',
    photoImageUrl: '/images/activity-card/demoday-photo.webp',
  },
};
