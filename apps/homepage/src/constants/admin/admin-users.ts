import {MemberStatus, MemberTabType} from '@/schemas/admin/admin-users.schema';

/** 회원 테이블 컬럼 상수 */
export const MEMBER_COLUMNS = [
  {key: 'name', label: '이름'},
  {key: 'generation', label: '기수'},
  {key: 'part', label: '파트'},
  {key: 'school', label: '학교'},
  {key: 'phone', label: '전화번호'},
  {key: 'status', label: '활동여부'},
  {key: 'action', label: ''},
] as const;

/** 회원 탭 상수 */
export const MEMBER_TABS: {label: string; value: MemberTabType}[] = [
  {label: '전체 회원', value: 'ALL'},
  {label: '활동 회원', value: 'ACTIVE'},
];

export const MEMBER_STATUS_CONFIG = {
  APPROVED: {label: '활동 중', bg: 'bg-primary-30'},
  RETIRED: {label: '수료', bg: 'bg-[#57B34D]'},
  NOT_RETIRED: {label: '미수료', bg: 'bg-alert'},
} as const;

export type MemberStatusKey = keyof typeof MEMBER_STATUS_CONFIG;

export const MEMBER_STATUS_OPTIONS = Object.keys(
  MEMBER_STATUS_CONFIG
) as MemberStatusKey[];
