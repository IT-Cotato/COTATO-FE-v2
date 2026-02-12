import {
  MOCK_ATTENDANCE_DATA,
  MOCK_PENALTY_DATA,
} from '@/mocks/mypage-mem/activity-mock';

export type TabType = 'attendance' | 'penalty';

export interface StatusCardItem {
  label: string;
  value: number | string;
  variant: 'attend' | 'late' | 'absent' | 'unauthorized-absent';
}

export interface PenaltyCardItem {
  label: string;
  value: number | string;
  variant: 'total' | 'bonus' | 'minus' | 'beer-networking';
}

export const attendanceCards: StatusCardItem[] = [
  {
    label: '출석',
    value: MOCK_ATTENDANCE_DATA.statistic.present,
    variant: 'attend',
  },
  {
    label: '지각',
    value: MOCK_ATTENDANCE_DATA.statistic.late,
    variant: 'late',
  },
  {
    label: '결석',
    value: MOCK_ATTENDANCE_DATA.statistic.absent,
    variant: 'absent',
  },
  {
    label: '무단결석',
    value: MOCK_ATTENDANCE_DATA.statistic.unauthorizedAbsent,
    variant: 'unauthorized-absent',
  },
];

export const penaltyCards: PenaltyCardItem[] = [
  {
    label: '총합',
    value: MOCK_PENALTY_DATA.dashboard.totalPoint,
    variant: 'total',
  },
  {
    label: '상점',
    value: MOCK_PENALTY_DATA.dashboard.bonusPoint,
    variant: 'bonus',
  },
  {
    label: '벌점',
    value: MOCK_PENALTY_DATA.dashboard.minusPoint,
    variant: 'minus',
  },
  {
    label: '비어네트워킹 참여',
    value: MOCK_PENALTY_DATA.dashboard.beerNetworkingCount,
    variant: 'beer-networking',
  },
];
