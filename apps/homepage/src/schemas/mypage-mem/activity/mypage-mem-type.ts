import {AttendanceStatistic} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {MyMinusPointDashboardResponse} from './penalty.schema';

export type TabType = 'attendance' | 'penalty';

export type CardVariant =
  | 'attend'
  | 'late'
  | 'absent'
  | 'unauthorized-absent'
  | 'total'
  | 'bonus'
  | 'minus'
  | 'beer-networking';

export interface StatusCardProps {
  label: string;
  value: number | null;
  variant: CardVariant;
}

/** 출석 카드 데이터 변환 헬퍼 */
export const getAttendanceCards = (
  statistic?: AttendanceStatistic
): StatusCardProps[] => [
  {label: '출석', value: statistic?.present ?? 0, variant: 'attend'},
  {label: '지각', value: statistic?.late ?? 0, variant: 'late'},
  {label: '결석', value: statistic?.absent ?? 0, variant: 'absent'},
  {
    label: '무단결석',
    value: statistic?.unauthorizedAbsent ?? 0,
    variant: 'unauthorized-absent',
  },
];

/** 상벌점 카드 데이터 변환 헬퍼 */
export const getPenaltyCards = (
  dashboard?: MyMinusPointDashboardResponse
): StatusCardProps[] => {
  if (!dashboard) return [];

  return [
    {label: '총합', value: dashboard.totalPoint, variant: 'total'},
    {label: '상점', value: dashboard.bonusPoint, variant: 'bonus'},
    {label: '벌점', value: dashboard.minusPoint, variant: 'minus'},
    {
      label: '비어네트워킹 참여',
      value: dashboard.beerNetworkingCount,
      variant: 'beer-networking',
    },
  ];
};
