import type {HomepageImageSlot} from '@/schemas/homepage-images.schema';

/** 기존 사진 위의 기본 문구다. 저장된 문구가 없을 때만 표시하며 편집창도 같은 기본값을 사용한다. */
export const HOMEPAGE_PART_COPY = {
  pm: {
    title: 'Product Manager',
    desc: [
      '서비스의 비전을 기획하고 팀을 리드하는 역할입니다.',
      '사용자 중심 사고를 바탕으로 문제를 정의하고, 개발·디자인 파트와의 협업을 통해 서비스를 완성합니다.',
    ],
  },
  design: {
    title: 'Team Design',
    desc: [
      '사용자 여정을 설계하고 와이어프레임, 프로토타입,',
      '디자인 시스템을 구축하며, 팀과 협업하여 서비스의 완성도를 높입니다.',
    ],
  },
  frontend: {
    title: 'Team Frontend',
    desc: [
      'React를 활용하여 UI/UX를 실제로 구현하고,',
      '백엔드와의 API 통신 및 상태관리, 배포 과정을 통해 서비스를 구현합니다.',
    ],
  },
  backend: {
    title: 'Team Backend',
    desc: [
      'Spring 기반 서버 개발을 중심으로, API 설계부터 데이터베이스 구조 설계, ',
      '인증 처리와 배포 환경 구성까지 서비스가 안정적으로 동작하고 성장할 수 있는 기반을 만들어갑니다.',
    ],
  },
};

export interface AboutUsActivity {
  slot: HomepageImageSlot;
  id: number;
  title: string;
  description: string;
  src: string;
  gridClass: string;
}

export const ABOUT_US_ACTIVITIES: AboutUsActivity[] = [
  {
    id: 1,
    slot: 'ABOUT_CS_EDUCATION',
    title: 'CS 교육',
    description: `CS 교육은 코테이토 교육팀의 커리큘럼을 기반으로 진행되며
개발에 필요한 핵심 CS 지식을 단계적으로 학습합니다.
기획·디자인 직군 또한 교육에 함께 참여하여, 개발 구조와 기술적 제약을
이해하고 원활한 협업을 위한 공통된 개발 지식을 습득할 수 있습니다.`,

    src: '/images/main-activities/cs-education.webp',
    gridClass: 'col-span-12 md:col-span-7',
  },
  {
    id: 2,
    slot: 'ABOUT_CS_QUIZ',
    title: 'CS 퀴즈',
    description: `CS 교육 이후에는 학습한 내용을 바탕으로 CS 퀴즈 타임이 진행됩니다.
우수한 성적을 거두거나 성실하게 참여한 분들께는 소정의 상품이 제공됩니다.
모든 퀴즈는 교육 내용을 기반으로 출제되어, 기획·디자인 직군도 부담 없이
개발 지식을 복습하고 재미있게 익힐 수 있습니다.`,
    src: '/images/main-activities/cs-quiz.webp',
    gridClass: 'col-span-12 md:col-span-5',
  },
  {
    id: 3,
    slot: 'ABOUT_PM_DESIGN',
    title: '기획 · 디자인 발표',
    description: `기획과 디자인 관련 다양한 주제를 자유롭게 다루며
이를 통해 개인의 시야를 넓히고 지식을 축적하는 것을 목표로 합니다.
개발 직군 역시 발표 내용을 함께 들으며 서로의 관점을 이해하고
협업의 밀도를 높입니다.`,
    src: '/images/main-activities/pm-design.webp',
    gridClass: 'col-span-12 md:col-span-5',
  },
  {
    id: 4,
    slot: 'ABOUT_NETWORKING',
    title: '네트워킹',
    description: `파트별로 모여 관련된 내용을 배우고 과제를 공유하며 피드백을 나눕니다.
또한 통합 네트워킹을 통해 다른 파트의 작업 방식과 관점을 익힐 수 있습니다.
이 과정을 통해 자신의 작업을 점검하고,
이후 학습과 프로젝트에 필요한 방향성을 정리하게 됩니다.`,
    src: '/images/main-activities/networking.webp',
    gridClass: 'col-span-12 md:col-span-7',
  },
];
