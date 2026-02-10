import {MemberTabType} from '@/schemas/admin/admin-users.schema';

/** 회원 관리 테이블 컬럼 상수 */
export const MEMBER_COLUMNS = [
  {key: 'name', label: '이름'},
  {key: 'generation', label: '기수'},
  {key: 'part', label: '파트'},
  {key: 'school', label: '학교'},
  {key: 'phone', label: '전화번호'},
  {key: 'status', label: '활동여부'},
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
};

/** 색상 디자인 미정 상황 */
export const MEMBER_ROLE_CONFIG = {
  MEMBER: {label: '일반 부원', bg: 'bg-primary'},
  PR: {label: '홍보팀', bg: 'bg-primary'},
  PLANNING: {label: '기획팀', bg: 'bg-primary'},
  EDUCATION: {label: '교육팀', bg: 'bg-primary'},
  OPERATION: {label: '운영진', bg: 'bg-primary'},
  DEV: {label: '개발팀', bg: 'bg-primary'},
};

export type MemberStatusKey = keyof typeof MEMBER_STATUS_CONFIG;
export type MemberRoleKey = keyof typeof MEMBER_ROLE_CONFIG;

export const MEMBER_STATUS_OPTIONS = Object.keys(
  MEMBER_STATUS_CONFIG
) as MemberStatusKey[];

export const MEMBER_ROLE_OPTIONS = Object.keys(
  MEMBER_ROLE_CONFIG
) as MemberRoleKey[];
