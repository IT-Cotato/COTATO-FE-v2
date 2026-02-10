import {AttendanceResult} from '@/schemas/mypage-mem/attendance.schema';

export const ATTENDANCE_LABEL = {
  PRESENT: {label: '출석', className: 'bg-orange-500'},
  LATE: {label: '지각', className: 'bg-brown-500'},
  ABSENT: {label: '결석', className: 'bg-gray-500'},
  UNAUTHORIZED_ABSENT: {label: '무단결석', className: 'bg-red-500'},
} as const;

export const POINT_LABEL = {
  BONUS: {label: '상점', className: 'bg-green-500'},
  MINUS: {label: '벌점', className: 'bg-red-500'},
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: {
    label: '출석',
    className: 'bg-primary',
  },
  LATE: {
    label: '지각',
    className: 'bg-disabled',
  },
  ABSENT: {
    label: '결석',
    className: 'bg-neutral-500',
  },
  UNAUTHORIZED_ABSENT: {
    label: '무단결석',
    className: 'bg-alert',
  },
} as const satisfies Record<
  AttendanceResult,
  {label: string; className: string}
>;

export const POINT_STATUS = {
  BONUS: {
    label: '상점',
    className: 'bg-[#57B34D]',
  },
  MINUS: {
    label: '벌점',
    className: 'bg-alert',
  },
} as const;
