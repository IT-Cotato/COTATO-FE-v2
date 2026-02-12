'use client';

import {useState, useMemo} from 'react';
import {MOCK_SESSION_LIST} from '@/mocks/mypage-mem/attendance/attendance-mock';
import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';
import {MonthNavigator} from '@/app/(with-header)/mypage/attendance/_components/MonthNavigator';
import {SessionCard} from '@/app/(with-header)/mypage/attendance/_components/SessionCard';
import {SessionAttendance} from '@/schemas/mypage-mem/attendance/attendance.schema';

export const SessionAttendanceContainer = () => {
  const [data] = useState(MOCK_SESSION_LIST);
  const [currentMonth, setCurrentMonth] = useState(data.currentMonth);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(
    null
  );

  const hasPrevMonth = useMemo(
    () => data.availableMonths.some((m) => m < currentMonth),
    [data.availableMonths, currentMonth]
  );
  const hasNextMonth = useMemo(
    () => data.availableMonths.some((m) => m > currentMonth),
    [data.availableMonths, currentMonth]
  );

  // 월별 필터링 및 날짜순 정렬 (최신 세션이 하단)
  const filteredSessions = useMemo(() => {
    return data.sessions
      .filter(
        (s) => new Date(s.sessionDateTime).getMonth() + 1 === currentMonth
      )
      .sort(
        (a, b) =>
          new Date(a.sessionDateTime).getTime() -
          new Date(b.sessionDateTime).getTime()
      );
  }, [data.sessions, currentMonth]);

  const handleAttendance = async (session: SessionAttendance) => {
    const {attendanceId, sessionType} = session;

    if (!attendanceId) return;

    // 온라인 세션인 경우: 위치 정보 없이 즉시 출석 API 호출
    if (sessionType === 'ONLINE') {
      await submitAttendance(attendanceId);
      return;
    }

    // 오프라인 세션인 경우: 위치 정보 수집 후 API 호출
    if (!navigator.geolocation) {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        await submitAttendance(attendanceId, latitude, longitude);
      },
      (error) => {
        console.error('위치 권한 오류:', error);
        setIsErrorModalOpen(true);
      }
    );
  };

  const submitAttendance = async (
    attendanceId: number,
    latitude?: number,
    longitude?: number
  ) => {
    try {
      const body = {
        attendanceId,
        ...(latitude && {latitude}),
        ...(longitude && {longitude}),
      };

      console.log('출석 요청 데이터:', body); // 추후 API 연동 필요함!

      // 성공 시 - 서버 응답 결과가 PRESENT or LATE일 경우
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error('출석 처리 실패:', err);
      setIsErrorModalOpen(true);
    }
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const sortedMonths = [...data.availableMonths].sort((a, b) => a - b);
    const currentIndex = sortedMonths.indexOf(currentMonth);
    if (direction === 'prev' && hasPrevMonth)
      setCurrentMonth(sortedMonths[currentIndex - 1]);
    else if (direction === 'next' && hasNextMonth)
      setCurrentMonth(sortedMonths[currentIndex + 1]);
    setExpandedSessionId(null);
  };

  return (
    <div className='flex w-full flex-col gap-13'>
      <MonthNavigator
        currentMonth={currentMonth}
        hasPrev={hasPrevMonth}
        hasNext={hasNextMonth}
        onPrev={() => handleMonthChange('prev')}
        onNext={() => handleMonthChange('next')}
      />
      <div className='flex flex-col gap-2.5'>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <SessionCard
              key={session.sessionId}
              session={session}
              generationId={data.generationId}
              isExpanded={expandedSessionId === session.sessionId}
              onToggle={() =>
                setExpandedSessionId(
                  expandedSessionId === session.sessionId
                    ? null
                    : session.sessionId
                )
              }
              onAttendance={() => handleAttendance(session)}
            />
          ))
        ) : (
          <div className='text-body-m py-30 text-center text-neutral-400'>
            세션 정보가 없습니다.
          </div>
        )}
      </div>
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title='위치 정보가 일치하지 않습니다.'
        content='다시 시도해 주세요.'
        titleStyle='text-h4 text-neutral-800'
        actions={
          <Button
            onClick={() => setIsErrorModalOpen(false)}
            label='확인'
            width={340}
          />
        }
        contentWrapperClassName='gap-[40px] text-h5 text-neutral-600'
      />
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title='출석이 완료되었습니다!'
        titleStyle='text-h4 text-neutral-800'
        noContent
        actions={
          <Button
            width={340}
            onClick={() => setIsSuccessModalOpen(false)}
            label='확인'
          />
        }
      />
    </div>
  );
};
