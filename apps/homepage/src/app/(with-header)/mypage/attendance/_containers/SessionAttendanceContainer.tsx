'use client';

import {AttendanceModals} from '@/app/(with-header)/mypage/attendance/_components/AttendanceModal';
import {MonthNavigator} from '@/app/(with-header)/mypage/attendance/_components/MonthNavigator';
import {SessionList} from '@/app/(with-header)/mypage/attendance/_components/SessionList';
import {useAttendance} from '@/app/(with-header)/mypage/attendance/_hooks/useAttendance';
import {useAttendanceSessionsQuery} from '@/hooks/queries/useAttendance.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

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

  const {data, isLoading} = useAttendanceSessionsQuery(currentMonth);

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

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    );
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
