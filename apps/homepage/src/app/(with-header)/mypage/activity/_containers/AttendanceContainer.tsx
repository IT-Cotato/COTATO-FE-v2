'use client';

import {useState} from 'react';
import {AxiosError} from 'axios';
import {AttendanceTab} from '@/app/(with-header)/mypage/activity/_components/AttendanceTab';
import {AttendanceCheckContainer} from '@/app/(with-header)/mypage/activity/_containers/AttendanceCheckContainer';
import {AttendanceStatusContainer} from '@/app/(with-header)/mypage/activity/_containers/AttendanceStatusContainer';
import {TabType} from '@/schemas/mypage-mem/activity/mypage-mem-type';
import {
  useAttendanceDashboardQuery,
  usePenaltyDashboardQuery,
} from '@/hooks/queries/useActivity.queries';
import {ErrorResponse} from '@/schemas/common/common-schema';
import {NotActiveMemberView} from '@/app/(with-header)/mypage/activity/_components/NotActiveMemberView';

export const AttendanceContainer = () => {
  const [activeTab, setActiveTab] = useState<TabType>('attendance');
  const isAttendance = activeTab === 'attendance';

  // 하나라도 NP-002면 활동 회원이 아닌 것으로 판단함
  const {error: attendError} = useAttendanceDashboardQuery({
    enabled: isAttendance,
  });
  const {error: penaltyError} = usePenaltyDashboardQuery({
    enabled: !isAttendance,
  });

  const currentError = (
    isAttendance ? attendError : penaltyError
  ) as AxiosError<ErrorResponse> | null;
  const isNotActiveMember = currentError?.response?.data?.code === 'NP-002';

  return (
    <div className='flex w-full flex-col items-center gap-7.5'>
      {!isNotActiveMember ? (
        <>
          <AttendanceTab activeTab={activeTab} onTabChange={setActiveTab} />
          <AttendanceStatusContainer activeTab={activeTab} />
          <AttendanceCheckContainer activeTab={activeTab} />
        </>
      ) : (
        <NotActiveMemberView />
      )}
    </div>
  );
};
