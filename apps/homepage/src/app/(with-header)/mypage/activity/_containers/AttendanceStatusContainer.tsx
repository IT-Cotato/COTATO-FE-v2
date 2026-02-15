'use client';

import {useMemo} from 'react';
import {
  useAttendanceDashboardQuery,
  usePenaltyDashboardQuery,
} from '@/hooks/queries/useActivity.queries';
import {
  getAttendanceCards,
  getPenaltyCards,
  TabType,
} from '@/schemas/mypage-mem/activity/mypage-mem-type';
import {StatusCard} from '@/app/(with-header)/mypage/activity/_components/StatusCard';

export const AttendanceStatusContainer = ({
  activeTab,
}: {
  activeTab: TabType;
}) => {
  const {data: attendData} = useAttendanceDashboardQuery();
  const {data: penaltyData} = usePenaltyDashboardQuery();

  const currentCards = useMemo(() => {
    if (activeTab === 'attendance') {
      return getAttendanceCards(attendData?.statistic);
    }
    if (activeTab === 'penalty') {
      return getPenaltyCards(penaltyData);
    }
    return [];
  }, [activeTab, attendData, penaltyData]);

  return (
    <div className='flex w-full items-center gap-10'>
      {currentCards.map((card) => (
        <StatusCard key={card.label} {...card} />
      ))}
    </div>
  );
};
