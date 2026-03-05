import {FC, SVGProps} from 'react';
import {AttendancePartType} from '@/schemas/admin/admin-attendance.schema';
import Present from '@/assets/mypage-admin/attendance/present.svg';
import Late from '@/assets/mypage-admin/attendance/late.svg';
import Absent from '@/assets/mypage-admin/attendance/absent.svg';
import UnauthorizedAbsent from '@/assets/mypage-admin/attendance/unauthorized-absent.svg';

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
