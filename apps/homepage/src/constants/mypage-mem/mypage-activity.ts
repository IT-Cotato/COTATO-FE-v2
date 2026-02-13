import {AttendanceResult} from '@/schemas/mypage-mem/activity/attendance.schema';

export const ATTENDANCE_LABEL = {
  PRESENT: {label: '출석', className: 'bg-chip'},
  LATE: {label: '지각', className: 'bg-disabled'},
  ABSENT: {label: '결석', className: 'bg-alert'},
  UNAUTHORIZED_ABSENT: {label: '무단결석', className: 'bg-neutral-600'},
} as const;

export const POINT_LABEL = {
  TOTAL_POINT: {label: '총합', className: 'bg-primary'},
  BONUS: {label: '상점', className: 'bg-chip'},
  MINUS: {label: '벌점', className: 'bg-alert'},
  BEER_NETWORKING: {label: '비어 네트워킹', className: 'bg-secondary'},
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: {
    label: '출석',
    className: 'bg-chip',
  },
  LATE: {
    label: '지각',
    className: 'bg-disabled',
  },
  ABSENT: {
    label: '결석',
    className: 'bg-alert',
  },
  UNAUTHORIZED_ABSENT: {
    label: '무단결석',
    className: 'bg-neutral-600',
  },
} as const satisfies Record<
  AttendanceResult,
  {label: string; className: string}
>;

export const POINT_STATUS = {
  TOTAL_POINT: {
    label: '총합',
    className: 'bg-primary',
  },
  BONUS: {
    label: '상점',
    className: 'bg-chip',
  },
  MINUS: {
    label: '벌점',
    className: 'bg-alert',
  },
  BEER_NETWORKING: {
    label: '비어 네트워킹',
    className: 'bg-secondary',
  },
} as const;
