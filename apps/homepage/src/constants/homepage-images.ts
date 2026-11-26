import type {
  HomepageImageCrop,
  HomepageImageSlot,
} from '@/schemas/homepage-images.schema';

/** 기존 홈 화면의 사진 영역과 기본 파일을 유지한다. 설정이 없는 영역은 이 사진을 계속 사용한다. */
export interface HomepageImageDefinition {
  slot: HomepageImageSlot;
  label: string;
  group: 'schedule' | 'part';
  fallback: string;
  subtitle: string;
}

export const CENTERED_IMAGE_CROP: HomepageImageCrop = {x: 50, y: 50, zoom: 1};

export const HOMEPAGE_IMAGE_DEFINITIONS: HomepageImageDefinition[] = [
  {
    slot: 'SCHEDULE_OT',
    label: 'OT',
    group: 'schedule',
    fallback: '/images/main-schedule/ot.webp',
    subtitle: '2026.03.06',
  },
  {
    slot: 'SCHEDULE_MT',
    label: 'MT',
    group: 'schedule',
    fallback: '/images/main-schedule/mt.webp',
    subtitle: '2026.03.27',
  },
  {
    slot: 'SCHEDULE_SESSION',
    label: '정기 세션',
    group: 'schedule',
    fallback: '/images/main-schedule/session.webp',
    subtitle: '매주 금요일 19시',
  },
  {
    slot: 'SCHEDULE_DEVTALK',
    label: '데브톡',
    group: 'schedule',
    fallback: '/images/main-schedule/devtalk.webp',
    subtitle: '2026.05.08',
  },
  {
    slot: 'SCHEDULE_COKERTHON',
    label: '코커톤',
    group: 'schedule',
    fallback: '/images/main-schedule/cokerthon.webp',
    subtitle: '2026.07.10',
  },
  {
    slot: 'SCHEDULE_DEMODAY',
    label: '데모데이',
    group: 'schedule',
    fallback: '/images/main-schedule/demoday.webp',
    subtitle: '2026.08.21',
  },
  {
    slot: 'PART_PM',
    label: '기획',
    group: 'part',
    fallback: '/images/part-section/pm.webp',
    subtitle: 'Product Manager',
  },
  {
    slot: 'PART_DESIGN',
    label: '디자인',
    group: 'part',
    fallback: '/images/part-section/design.webp',
    subtitle: 'Team Design',
  },
  {
    slot: 'PART_FRONTEND',
    label: '프론트엔드',
    group: 'part',
    fallback: '/images/part-section/frontend.webp',
    subtitle: 'Team Frontend',
  },
  {
    slot: 'PART_BACKEND',
    label: '백엔드',
    group: 'part',
    fallback: '/images/part-section/backend.webp',
    subtitle: 'Team Backend',
  },
];

export const getHomepageImageDefinition = (slot: HomepageImageSlot) =>
  HOMEPAGE_IMAGE_DEFINITIONS.find((image) => image.slot === slot)!;
