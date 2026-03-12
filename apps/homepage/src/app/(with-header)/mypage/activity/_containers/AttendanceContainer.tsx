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
import {Spinner} from '@repo/ui/components/spinner/Spinner';

export const AttendanceContainer = () => {
  const [activeTab, setActiveTab] = useState<TabType>('attendance');
  const isAttendance = activeTab === 'attendance';

  const {error: attendError, isLoading: isAttendLoading} =
    useAttendanceDashboardQuery({enabled: isAttendance});

  const {error: penaltyError, isLoading: isPenaltyLoading} =
    usePenaltyDashboardQuery({enabled: !isAttendance});

  const isLoading = isAttendance ? isAttendLoading : isPenaltyLoading;
  const currentError = (
    isAttendance ? attendError : penaltyError
  ) as AxiosError<ErrorResponse> | null;
  const isNotActiveMember = currentError?.response?.data?.code === 'NP-002';

  if (isLoading) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isNotActiveMember) {
    return <NotActiveMemberView />;
  }

  return (
    <div className='flex w-full flex-col items-center gap-7.5'>
      <AttendanceTab activeTab={activeTab} onTabChange={setActiveTab} />
      <AttendanceStatusContainer activeTab={activeTab} />
      <AttendanceCheckContainer activeTab={activeTab} />
    </div>
  );
};
