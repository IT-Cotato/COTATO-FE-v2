import {
  MOCK_ATTENDANCE_DATA,
  MOCK_PENALTY_DATA,
} from '@/mocks/mypage-mem/activity-mock';
import {StatusCard} from '../_components/StatusCard';
import {StatusCardItem, TabType} from '@/schemas/mypage-mem/mypage-mem-type';

export const AttendanceStatusContainer = ({
  activeTab,
}: {
  activeTab: TabType;
}) => {
  const cards: StatusCardItem[] =
    activeTab === 'attendance'
      ? [
          {
            label: '출석',
            value: MOCK_ATTENDANCE_DATA.statistic.present,
            color: 'orange',
            unit: '회',
          },
          {
            label: '지각',
            value: MOCK_ATTENDANCE_DATA.statistic.late,
            color: 'brown',
            unit: '회',
          },
          {
            label: '결석',
            value: MOCK_ATTENDANCE_DATA.statistic.absent,
            color: 'gray',
            unit: '회',
          },
          {
            label: '무단결석',
            value: MOCK_ATTENDANCE_DATA.statistic.unauthorizedAbsent,
            color: 'red',
            unit: '회',
          },
        ]
      : [
          {
            label: '상/벌점 총합',
            value: MOCK_PENALTY_DATA.dashboard.totalPoint,
            color: 'orange',
            unit: '점',
          },
          {
            label: '상점',
            value: MOCK_PENALTY_DATA.dashboard.bonusPoint,
            color: 'brown',
            unit: '점',
          },
          {
            label: '벌점',
            value: MOCK_PENALTY_DATA.dashboard.minusPoint,
            color: 'red',
            unit: '점',
          },
          {
            label: '비어네트워킹 참여',
            value: MOCK_PENALTY_DATA.dashboard.beerNetworkingCount,
            color: 'red',
            unit: '회',
          },
        ];

  return (
    <div className='flex w-full items-center gap-10'>
      {cards.map((card) => (
        <StatusCard key={card.label} {...card} />
      ))}
    </div>
  );
};
