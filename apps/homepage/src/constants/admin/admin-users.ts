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
  APPROVED: {label: '활동 중', className: 'bg-[#FF9000] text-white'},
  RETIRED: {label: '수료', className: 'bg-[#68CA3A] text-white'},
  NOT_RETIRED: {label: '미수료', className: 'bg-neutral-600 text-white'},
  INACTIVE: {label: '비활동', className: 'bg-neutral-400 text-white'},
  REJECTED: {label: '거절', className: 'bg-neutral-400 text-white'},
  REQUESTED: {label: '신청 중', className: 'bg-neutral-400 text-white'},
};

export const MEMBER_ROLE_CONFIG = {
  MEMBER: {
    label: '일반 부원',
    className: 'bg-white shadow-default',
    textColor: '#9e9e9e',
    chevronColor: 'text-text-disabled',
  },
  PR: {
    label: '홍보팀',
    className: 'bg-white shadow-default',
    textColor: '#5A4A3A',
    chevronColor: 'text-text-disabled',
  },
  PLANNING: {
    label: '기획팀',
    className: 'bg-white shadow-default',
    textColor: '#68CA3A',
    chevronColor: 'text-text-disabled',
  },
  EDUCATION: {
    label: '교육팀',
    className: 'bg-white shadow-default',
    textColor: '#ffb800',
    chevronColor: 'text-text-disabled',
  },
  OPERATION: {
    label: '운영진',
    className: 'bg-white shadow-default',
    textColor: '#f87d02',
    chevronColor: 'text-text-disabled',
  },
  DEV: {
    label: '개발팀',
    className: 'bg-white shadow-default',
    textColor: '#525252',
    chevronColor: 'text-text-disabled',
  },
};

/** 회원 관리 액션 메뉴 상수 */
export const REGULAR_MEMBER_MENU_ITEMS = [
  {key: 'detail', label: '상세보기'},
  {key: 'delete', label: '삭제하기'},
] as const;

export const ALL_USERS_MENU_ITEMS = [
  {key: 'exclude', label: '제외하기'},
  {key: 'edit', label: '수정하기'},
] as const;

type RegularItem = (typeof REGULAR_MEMBER_MENU_ITEMS)[number];
type AllUsersItem = (typeof ALL_USERS_MENU_ITEMS)[number];

export type MemberMenuAction = RegularItem['key'] | AllUsersItem['key'];

export type MemberStatusKey = keyof typeof MEMBER_STATUS_CONFIG;
export type MemberRoleKey = keyof typeof MEMBER_ROLE_CONFIG;

export const MEMBER_STATUS_OPTIONS = Object.keys(
  MEMBER_STATUS_CONFIG
) as MemberStatusKey[];

export const MEMBER_ROLE_OPTIONS = Object.keys(
  MEMBER_ROLE_CONFIG
) as MemberRoleKey[];
