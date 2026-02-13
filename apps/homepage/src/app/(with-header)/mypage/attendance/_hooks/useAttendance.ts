import {useState, useMemo} from 'react';
import {
  SessionAttendance,
  SessionAttendanceListResponse,
} from '@/schemas/mypage-mem/attendance/attendance.schema';

export const useAttendance = (initialData: SessionAttendanceListResponse) => {
  const [currentMonth, setCurrentMonth] = useState(initialData.currentMonth);
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const hasPrevMonth = useMemo(
    () => initialData.availableMonths.some((m) => m < currentMonth),
    [initialData.availableMonths, currentMonth]
  );
  const hasNextMonth = useMemo(
    () => initialData.availableMonths.some((m) => m > currentMonth),
    [initialData.availableMonths, currentMonth]
  );

  // 월별 필터링 및 정렬
  const filteredSessions = useMemo(() => {
    return initialData.sessions
      .filter(
        (s) => new Date(s.sessionDateTime).getMonth() + 1 === currentMonth
      )
      .sort(
        (a, b) =>
          new Date(a.sessionDateTime).getTime() -
          new Date(b.sessionDateTime).getTime()
      );
  }, [initialData.sessions, currentMonth]);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const sortedMonths = [...initialData.availableMonths].sort((a, b) => a - b);
    const currentIndex = sortedMonths.indexOf(currentMonth);

    if (direction === 'prev' && hasPrevMonth) {
      setCurrentMonth(sortedMonths[currentIndex - 1]);
    } else if (direction === 'next' && hasNextMonth) {
      setCurrentMonth(sortedMonths[currentIndex + 1]);
    }
    setExpandedSessionId(null);
  };

  const submitAttendance = async (
    attendanceId: number,
    latitude?: number,
    longitude?: number
  ) => {
    try {
      // 추후 여기서 API 호출해야함!
      console.log('API 호출:', {attendanceId, latitude, longitude});
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error('출석 처리 중 에러 발생:', err);
      setIsErrorModalOpen(true);
    }
  };

  const handleAttendance = async (session: SessionAttendance) => {
    const {attendanceId, sessionType} = session;
    if (attendanceId === null) return;

    if (sessionType === 'ONLINE') {
      await submitAttendance(attendanceId);
      return;
    }

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

  return {
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
  };
};
