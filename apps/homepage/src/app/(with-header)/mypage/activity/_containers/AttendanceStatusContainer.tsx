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
  const isAttendance = activeTab === 'attendance';

  // 탭이 attendance일 때만 출석 대시보드 호출
  const {data: attendData} = useAttendanceDashboardQuery({
    enabled: isAttendance,
  });

  // 탭이 penalty일 때만 상벌점 대시보드 호출
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
    <div className='flex w-full items-center gap-10'>
      {currentCards.map((card) => (
        <StatusCard key={card.label} {...card} />
      ))}
    </div>
  );
};
