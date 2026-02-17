'use client';

import {AxiosError} from 'axios';
import {AttendanceModals} from '@/app/(with-header)/mypage/attendance/_components/AttendanceModal';
import {MonthNavigator} from '@/app/(with-header)/mypage/attendance/_components/MonthNavigator';
import {SessionList} from '@/app/(with-header)/mypage/attendance/_components/SessionList';
import {useAttendance} from '@/app/(with-header)/mypage/attendance/_hooks/useAttendance';
import {useAttendanceSessionsQuery} from '@/hooks/queries/useAttendance.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {ErrorResponse} from '@/schemas/common/common-schema';
import {NotActiveMemberView} from '@/app/(with-header)/mypage/activity/_components/NotActiveMemberView';

export const SessionAttendanceContainer = () => {
  const {
    currentMonth,
    expandedSessionId,
    isSuccessModalOpen,
    isErrorModalOpen,
    setExpandedSessionId,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
    handleMonthChange,
    handleAttendance,
  } = useAttendance();

  const {data, isLoading, error} = useAttendanceSessionsQuery(currentMonth);
  const currentError = error as AxiosError<ErrorResponse> | null;
  const isNotActiveMember = currentError?.response?.data?.code === 'NP-002';

  const handlePrevMonth = () => {
    if (!data) return;
    const prevMonth = [...data.availableMonths]
      .sort((a, b) => a - b)
      .reverse()
      .find((m) => m < data.currentMonth);

    if (prevMonth) handleMonthChange(prevMonth);
  };

  const handleNextMonth = () => {
    if (!data) return;
    const nextMonth = [...data.availableMonths]
      .sort((a, b) => a - b)
      .find((m) => m > data.currentMonth);

    if (nextMonth) handleMonthChange(nextMonth);
  };

  if (isLoading) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // 활동 회원이 아닐 경우
  if (isNotActiveMember) {
    return <NotActiveMemberView />;
  }

  // 데이터가 없고 에러도 아닐 때
  if (!data) return null;

  return (
    <div className='flex w-full flex-col gap-13'>
      <MonthNavigator
        currentMonth={data.currentMonth}
        hasPrev={data.hasPreviousMonth}
        hasNext={data.hasNextMonth}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <SessionList
        sessions={data.sessions}
        generationId={data.generationId}
        expandedSessionId={expandedSessionId}
        onToggle={(id) =>
          setExpandedSessionId(expandedSessionId === id ? null : id)
        }
        onAttendance={handleAttendance}
      />
      <AttendanceModals
        isSuccessOpen={isSuccessModalOpen}
        isErrorOpen={isErrorModalOpen}
        onSuccessClose={() => setIsSuccessModalOpen(false)}
        onErrorClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
};
