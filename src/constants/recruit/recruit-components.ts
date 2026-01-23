import ClockImg from '@/assets/illustrations/qualifications-clock.webp';
import UnivImg from '@/assets/illustrations/qualifications-univ.webp';
import NotebookImg from '@/assets/illustrations/qualifications-notebook.webp';
import OTBg from '@/assets/backgrounds/activity-card/ot-bg.webp';
import SessionBg from '@/assets/backgrounds/activity-card/session-bg.webp';
import MTBg from '@/assets/backgrounds/activity-card/mt-bg.webp';
import DevTalkBg from '@/assets/backgrounds/activity-card/dev-talk-bg.webp';
import CokerthonBg from '@/assets/backgrounds/activity-card/cokerthon-bg.webp';
import DemodayBg from '@/assets/backgrounds/activity-card/demoday-bg.webp';
import OTPic from '@/assets/backgrounds/activity-card/ot-photo.webp';
import SessionPic from '@/assets/backgrounds/activity-card/session-photo.webp';
import MTPic from '@/assets/backgrounds/activity-card/mt-photo.webp';
import DevTalkPic from '@/assets/backgrounds/activity-card/dev-talk-photo.webp';
import CokerthonPic from '@/assets/backgrounds/activity-card/cokerthon-photo.webp';
import DemodayPic from '@/assets/backgrounds/activity-card/demoday-photo.webp';
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
    coverImageUrl: StaticImageData;
    photoImageUrl: StaticImageData;
  }
> = {
  OT: {
    style: 'opacity-100',
    coverImageUrl: OTBg,
    photoImageUrl: OTPic,
  },
  SESSION: {
    style: 'opacity-40',
    coverImageUrl: SessionBg,
    photoImageUrl: SessionPic,
  },
  MT: {
    style: 'opacity-40',
    coverImageUrl: MTBg,
    photoImageUrl: MTPic,
  },
  DEVTALK: {
    style: 'opacity-80',
    coverImageUrl: DevTalkBg,
    photoImageUrl: DevTalkPic,
  },
  COKERTHON: {
    style: 'opacity-70',
    coverImageUrl: CokerthonBg,
    photoImageUrl: CokerthonPic,
  },
  DEMODAY: {
    style: 'opacity-40',
    coverImageUrl: DemodayBg,
    photoImageUrl: DemodayPic,
  },
};
