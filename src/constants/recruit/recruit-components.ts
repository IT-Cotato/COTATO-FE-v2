import ClockImg from '@/assets/illustrations/qualifications-clock.webp';
import UnivImg from '@/assets/illustrations/qualifications-univ.webp';
import NotebookImg from '@/assets/illustrations/qualifications-notebook.webp';
import OTBg from '@/assets/backgrounds/activity-card/ot-bg.webp';
import SessionBg from '@/assets/backgrounds/activity-card/session-bg.webp';
import MTBg from '@/assets/backgrounds/activity-card/mt-bg.webp';
import DevTalkBg from '@/assets/backgrounds/activity-card/dev-talk-bg.webp';
import CokerthonBg from '@/assets/backgrounds/activity-card/cokerthon-bg.webp';
import DemodayBg from '@/assets/backgrounds/activity-card/demoday-bg.webp';
import {
  ActivityCategoryType,
  PositionType,
} from '@/schemas/recruit/recruit-components.schema';
import {StaticImageData} from 'next/image';

export const QUALIFICATIONS_CARD_ITEMS = [
  {
    qualification: 'session',
    illustrationSrc: ClockImg,
    description: '매주 금요일 19시\n정기세션 참여가능한 자',
  },
  {
    qualification: 'grade',
    illustrationSrc: UnivImg,
    description: '서울, 경기권 대학교\n4학기 이상 수료자',
  },
  {
    qualification: 'department',
    illustrationSrc: NotebookImg,
    description: '개발자 지원 시 컴퓨터/IT\n관련학과 주·복수 전공생',
  },
];

export const RECRUITMENT_POSITION_STYLES: Record<PositionType, string> = {
  PM: 'hover:bg-[conic-gradient(from_0deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-300)_2%,var(--color-neutral-50)_98%,#D9D9D9_100%)]',
  DE: 'hover:bg-[conic-gradient(from_108deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-300)_2%,var(--color-neutral-50)_98%,#D9D9D9_100%)]',
  FE: 'hover:bg-[conic-gradient(from_194deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-300)_2%,var(--color-neutral-50)_98%,#D9D9D9_100%)]',
  BE: 'hover:bg-[conic-gradient(from_293deg_at_50%_50%,#D9D9D9_0%,var(--color-neutral-50)_2%,var(--color-neutral-300)_98%,#D9D9D9_100%)]',
};

export const ACTIVITY_CARD_STYLES: Record<
  ActivityCategoryType,
  {style: string; coverImageUrl: StaticImageData}
> = {
  OT: {
    style: 'opacity-100',
    coverImageUrl: OTBg,
  },
  SESSION: {
    style: 'opacity-40',
    coverImageUrl: SessionBg,
  },
  MT: {
    style: 'opacity-40',
    coverImageUrl: MTBg,
  },
  DEVTALK: {
    style: 'opacity-80',
    coverImageUrl: DevTalkBg,
  },
  COKERTHON: {
    style: 'opacity-70',
    coverImageUrl: CokerthonBg,
  },
  DEMODAY: {
    style: 'opacity-40',
    coverImageUrl: DemodayBg,
  },
};
