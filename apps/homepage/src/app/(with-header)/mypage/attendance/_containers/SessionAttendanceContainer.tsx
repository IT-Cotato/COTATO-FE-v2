'use client';

import {MOCK_SESSION_LIST} from '@/mocks/mypage-mem/attendance/attendance-mock';
import {AttendanceModals} from '@/app/(with-header)/mypage/attendance/_components/AttendanceModal';
import {useAttendance} from '@/app/(with-header)/mypage/attendance/_hooks/useAttendance';
import {MonthNavigator} from '@/app/(with-header)/mypage/attendance/_components/MonthNavigator';
import {SessionList} from '@/app/(with-header)/mypage/attendance/_components/SessionList';

export const SessionAttendanceContainer = () => {
  const {
    currentMonth,
    filteredSessions,
    expandedSessionId,
    isSuccessModalOpen,
    isErrorModalOpen,
    hasPrevMonth,
    hasNextMonth,
    setExpandedSessionId,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
    handleMonthChange,
    handleAttendance,
  } = useAttendance(MOCK_SESSION_LIST);

  return (
    <div className='flex w-full flex-col gap-13'>
      <MonthNavigator
        currentMonth={currentMonth}
        hasPrev={hasPrevMonth}
        hasNext={hasNextMonth}
        onPrev={() => handleMonthChange('prev')}
        onNext={() => handleMonthChange('next')}
      />
      <SessionList
        sessions={filteredSessions}
        generationId={MOCK_SESSION_LIST.generationId}
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
