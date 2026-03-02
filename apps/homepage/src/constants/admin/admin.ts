import {FC, SVGProps} from 'react';
import {AttendancePartType} from '@/schemas/admin/attendance.schema';
import Present from '@/assets/mypage-admin/attendance/present.svg';
import Late from '@/assets/mypage-admin/attendance/late.svg';
import Absent from '@/assets/mypage-admin/attendance/absent.svg';
import UnauthorizedAbsent from '@/assets/mypage-admin/attendance/unauthorized-absent.svg';
export type MemberTabType = 'ALL' | 'ACTIVE';
export type ApprovalTabType = 'REQUESTED' | 'REJECTED';

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
  APPROVED: {label: '활동 중', className: 'bg-active text-white'},
  RETIRED: {label: '수료', className: 'bg-chip text-white'},
  NOT_RETIRED: {label: '미수료', className: 'bg-neutral-600 text-white'},
  INACTIVE: {label: '비활동', className: 'bg-neutral-400 text-white'},
  REJECTED: {label: '가입 거절', className: 'bg-neutral-400 text-white'},
  REQUESTED: {label: '가입 요청', className: 'bg-neutral-400 text-white'},
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
  {key: 'edit', label: '수정하기'},
  {key: 'exclude', label: '제외하기'},
] as const;

export const ALL_USERS_MENU_ITEMS = [
  {key: 'detail', label: '상세보기'},
  {key: 'delete', label: '삭제하기'},
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

export const MEMBER_POSITION_OPTIONS = [
  'PM',
  'DE',
  'FE',
  'BE',
  'NONE',
] as const;

export type MemberPositionKey = (typeof MEMBER_POSITION_OPTIONS)[number];

export const MEMBER_POSITION_LABEL: Record<MemberPositionKey, string> = {
  PM: '기획',
  DE: '디자인',
  FE: '프론트엔드',
  BE: '백엔드',
  NONE: '없음',
};

export const MEMBER_ROLE_LABEL = Object.fromEntries(
  MEMBER_ROLE_OPTIONS.map((k) => [k, MEMBER_ROLE_CONFIG[k].label])
) as Record<MemberRoleKey, string>;

export const MEMBER_STATUS_LABEL = Object.fromEntries(
  MEMBER_STATUS_OPTIONS.map((k) => [k, MEMBER_STATUS_CONFIG[k].label])
) as Record<MemberStatusKey, string>;

/** 가입 승인 탭 상수 */
export const APPROVAL_TABS: {label: string; value: ApprovalTabType}[] = [
  {label: '가입 요청', value: 'REQUESTED'},
  {label: '거절 항목', value: 'REJECTED'},
];

/** 가입 승인 테이블 컬럼 상수 */
export const APPROVAL_COLUMNS = [
  {key: 'name', label: '이름'},
  {key: 'applicationDate', label: '가입신청일'},
  {key: 'generation', label: '기수'},
  {key: 'part', label: '파트'},
  {key: 'phone', label: '전화번호'},
] as const;

/** 출석 파트 탭 상수 */
export const ATTENDANCE_PART_TAB: {
  label: string;
  value: AttendancePartType;
}[] = [
  {label: '전체 파트', value: 'ALL'},
  {label: '기획', value: 'PM'},
  {label: '디자인', value: 'DE'},
  {label: '프론트엔드', value: 'FE'},
  {label: '백엔드', value: 'BE'},
];

export const ATTENDANCE_STATUS_CONFIG = {
  PRESENT: {label: '출석', className: 'bg-chip', textColor: '#ffffff'},
  LATE: {label: '지각', className: 'bg-disabled', textColor: '#ffffff'},
  ABSENT: {label: '결석', className: 'bg-alert', textColor: '#ffffff'},
  UNAUTHORIZED_ABSENT: {
    label: '무단결석',
    className: 'bg-neutral-600',
    textColor: '#ffffff',
  },
  NOT_YET: {
    label: '출석 전',
    className: 'bg-text-disabled',
    textColor: '#ffffff',
  },
};
export type AttendanceStatusKey = keyof typeof ATTENDANCE_STATUS_CONFIG;
export const ATTENDANCE_STATUS_OPTION = Object.keys(
  ATTENDANCE_STATUS_CONFIG
) as AttendanceStatusKey[];

/** 출석 테이블 헤더 상수 */
export const ATTENDANCE_FULL_TABLE_HEADER: {
  key: string;
  label: string;
  icon?: FC<SVGProps<SVGElement>>;
}[] = [
  {key: 'name', label: '이름'},
  {key: 'part', label: '파트'},
  {key: 'present', label: '출석', icon: Present},
  {key: 'late', label: '지각', icon: Late},
  {key: 'absent', label: '결석', icon: Absent},
  {key: 'unauthorized-absent', label: '무단결석', icon: UnauthorizedAbsent},
];

export const ATTENDANCE_SPECIFIC_TABLE_HEADER: {
  key: string;
  label: string;
}[] = [
  {key: 'name', label: '이름'},
  {key: 'generation', label: '기수'},
  {key: 'attendance-status', label: '출석여부'},
];
