import {useState} from 'react';
import {SessionAttendance} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {useSubmitAttendanceMutation} from '@/hooks/mutations/useAttendance.mutation';

export const useAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const {mutate: submitAttendance, isPending} = useSubmitAttendanceMutation();

  const handleMonthChange = (month: number) => {
    setCurrentMonth(month);
    setExpandedSessionId(null);
  };

  const handleAttendance = async (session: SessionAttendance) => {
    const {attendanceId, sessionType} = session;
    if (attendanceId === null) return;

    // 온라인 세션
    if (sessionType === 'ONLINE') {
      submitAttendance(
        {attendanceId},
        {
          onSuccess: () => setIsSuccessModalOpen(true),
          onError: () => setIsErrorModalOpen(true),
        }
      );
      return;
    }

    // 대면 세션 - 위치 정보 필요
    if (!navigator.geolocation) {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        submitAttendance(
          {attendanceId, latitude, longitude},
          {
            onSuccess: () => setIsSuccessModalOpen(true),
            onError: () => setIsErrorModalOpen(true),
          }
        );
      },
      (error) => {
        console.error('위치 권한 오류:', error);
        setIsErrorModalOpen(true);
      }
    );
  };

  return {
    currentMonth,
    expandedSessionId,
    isSuccessModalOpen,
    isErrorModalOpen,
    isPending,
    setExpandedSessionId,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
    handleMonthChange,
    handleAttendance,
  };
};
