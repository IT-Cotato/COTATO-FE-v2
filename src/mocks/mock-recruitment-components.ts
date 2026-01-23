import {
  ActivityCategoryType,
  PositionType,
} from '@/schemas/recruit/recruit.schema';

export const MOCK_TIMELINE_ITEM = [
  {
    title: '13기 서류 접수',
    date: '2월 20일 (금)\n- 2월 27일 (금)\n오후 11시 59분',
  },
  {
    title: '13기 서류 합격 발표',
    date: '2월 21일 12시 -\n2월 28일 23시 59분',
  },
  {
    title: '13기 면접 평가',
    date: '3월 3일 (화)\n- 3월 4일 (수)',
  },
  {
    title: '13기 최종 합격 발표',
    date: '3월 5일 (목)\n오후 12시',
  },
  {
    title: '13기 대면 OT',
    date: '3월 6일 (금)\n오후 12시',
  },
];

export const MOCK_RECRUITMENT_POSITION = [
  {
    short: 'PM' as PositionType,
    name: 'Product Manager',
    detail:
      '서비스의 비전을 기획하고 팀을 리드하는 역할입니다.\n사용자 중심 사고를 바탕으로 문제를 정의하고, 협업을 통해 서비스를 완성합니다.',
  },
  {
    short: 'DE' as PositionType,
    name: 'Team Design',
    detail:
      '사용자 여정을 설계하고 와이어프레임, 프로토타입, 디자인 시스템을 구축하며, 팀과 협업하여 서비스의 감정선과 완성도를 높입니다.',
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
      'Spring 서버 프레임워크를 기반으로 API 설계, DB 모델링, 인증 및 배포 환경 구축 등 서비스의 안정성과 확장성을 다룹니다.',
  },
];

export const MOCK_ACTIVITY_CARD = [
  {
    id: 11,
    short: 'OT' as ActivityCategoryType,
    name: 'OT',
    date: '2026.9.26',
    imageUrl: 'https://picsum.photos/id/60/300/200',
  },
  {
    id: 12,
    short: 'SESSION' as ActivityCategoryType,
    name: '정기 세션',
    date: '매주 금요일 19시',
    imageUrl: 'https://picsum.photos/id/60/300/200',
  },
  {
    id: 13,
    short: 'MT' as ActivityCategoryType,
    name: 'MT',
    date: '2025.10.25',
    imageUrl: 'https://picsum.photos/id/60/300/200',
  },
  {
    id: 14,
    short: 'DEVTALK' as ActivityCategoryType,
    name: 'Dev Talk',
    date: '2025.10.25',
    imageUrl: 'https://picsum.photos/id/60/300/200',
  },
  {
    id: 15,
    short: 'COKERTHON' as ActivityCategoryType,
    name: '코커톤',
    date: '2025.10.25',
    imageUrl: 'https://picsum.photos/id/60/300/200',
  },
  {
    id: 16,
    short: 'DEMODAY' as ActivityCategoryType,
    name: '데모데이',
    date: '2025.10.25',
    imageUrl: 'https://picsum.photos/id/60/300/200',
  },
];
