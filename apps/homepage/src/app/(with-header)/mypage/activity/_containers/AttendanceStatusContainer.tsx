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
import clsx from 'clsx';

export const AttendanceStatusContainer = ({
  activeTab,
}: {
  activeTab: TabType;
}) => {
  const isAttendance = activeTab === 'attendance';

  const {data: attendData} = useAttendanceDashboardQuery({
    enabled: isAttendance,
  });
  const {data: penaltyData} = usePenaltyDashboardQuery({
    enabled: !isAttendance,
  });

  const currentCards = useMemo(() => {
    if (isAttendance) {
      return getAttendanceCards(attendData?.statistic);
    } else {
      return getPenaltyCards(penaltyData);
    }
  }, [isAttendance, attendData, penaltyData]);

  return (
    <div
      className={clsx(
        'grid w-full',
        'grid-cols-2 gap-x-4 gap-y-5.5 px-[15.5px]',
        'md:flex md:flex-row md:items-center md:gap-10 md:gap-y-0 md:px-0'
      )}>
      {currentCards.map((card) => (
        <StatusCard key={card.label} {...card} />
      ))}
    </div>
  );
};
