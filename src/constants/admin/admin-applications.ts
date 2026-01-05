import {PartType, ReviewerType} from '@/schemas/admin-application-type';

export const APPLICATION_COLUMNS = [
  {key: 'name', label: '이름'},
  {key: 'gender', label: '성별'},
  {key: 'part', label: '직군'},
  {key: 'school', label: '학교'},
  {key: 'phone', label: '전화번호'},
  {key: 'result', label: '합격 여부'},
] as const;

export const PART_TABS: {label: string; value: PartType}[] = [
  {label: '전체 회원', value: 'all'},
  {label: '기획', value: 'plan'},
  {label: '디자인', value: 'design'},
  {label: '프론트엔드', value: 'frontend'},
  {label: '백엔드', value: 'backend'},
];

export const REVIEWER_TABS: {label: string; value: ReviewerType}[] = [
  {label: '운영진1', value: 'admin1'},
  {label: '운영진2', value: 'admin2'},
  {label: '운영진3', value: 'admin3'},
  {label: '운영진4', value: 'admin4'},
];
