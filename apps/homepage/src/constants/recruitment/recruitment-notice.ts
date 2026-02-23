import {
  PositionType,
  ActivityCategoryType,
} from '@/schemas/recruitments/recruitments.schema';

export const POSITION_CARD_DATA = [
  {
    short: 'PM' as PositionType,
    name: 'Product Manager',
    detail:
      '서비스의 비전을 기획하고 팀을 리드하는 역할입니다. 사용자 중심 사고를 바탕으로 문제를 정의하고, 개발·디자인 파트와의 협업을 통해 서비스를 완성합니다.',
  },
  {
    short: 'DE' as PositionType,
    name: 'Team Design',
    detail:
      '사용자 여정을 설계하고 와이어프레임, 프로토타입, 디자인 시스템을 구축하며, 팀과 협업하여 서비스의 완성도를 높입니다.',
  },
  {
    short: 'FE' as PositionType,
    name: 'Team Frontend',
    detail:
      'React를 활용하여 UI/UX를 실제로 구현하고, 백엔드와의 API 통신 및 상태관리, 배포 과정을 통해 서비스를 구현합니다.',
  },
  {
    short: 'BE' as PositionType,
    name: 'Team Backend',
    detail:
      'Spring 기반 서버 개발을 중심으로, API 설계부터 데이터베이스 구조 설계, 인증 처리와 배포 환경 구성까지 서비스가 안정적으로 동작하고 성장할 수 있는 기반을 만들어갑니다.',
  },
];

export const ACTIVITY_CARD_DATA = [
  {
    id: 0,
    short: 'OT' as ActivityCategoryType,
    name: 'OT',
    date: '2026.03.06',
  },
  {
    id: 1,
    short: 'SESSION' as ActivityCategoryType,
    name: '정기세션',
    date: '매주 금요일 19시',
  },
  {
    id: 2,
    short: 'MT' as ActivityCategoryType,
    name: 'MT',
    date: '2026.03.27',
  },
  {
    id: 3,
    short: 'DEVTALK' as ActivityCategoryType,
    name: '데브톡',
    date: '2026.05.15',
  },
  {
    id: 4,
    short: 'COKERTHON' as ActivityCategoryType,
    name: '코커톤',
    date: '2026.07.24',
  },
  {
    id: 5,
    short: 'DEMODAY' as ActivityCategoryType,
    name: 'Demo Day',
    date: '2026.08.21',
  },
];
