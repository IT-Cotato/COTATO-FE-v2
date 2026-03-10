'use client';

import {useState} from 'react';
import {SessionAttendance} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {useSubmitAttendanceMutation} from '@/hooks/mutations/useAttendance.mutation';
import {ErrorResponse} from '@/schemas/common/common-schema';

export const useAttendance = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(
    null
  );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const {mutate: submitAttendance, isPending} = useSubmitAttendanceMutation();

  const handleMonthChange = (month: number) => {
    setCurrentMonth(month);
    setExpandedSessionId(null);
  };

  const processError = (error: unknown) => {
    const serverError = error as ErrorResponse;
    const actualCode = serverError?.code || 'UNKNOWN';
    setErrorCode(actualCode);
    setIsErrorModalOpen(true);
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
          onError: processError,
        }
      );
      return;
    }

    // 대면 세션 - 위치 정보 필요
    if (!navigator.geolocation) {
      setErrorCode('BROWSER_NOT_SUPPORT');
      setIsErrorModalOpen(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        submitAttendance(
          {attendanceId, latitude, longitude},
          {
            onSuccess: () => setIsSuccessModalOpen(true),
            onError: processError,
          }
        );
      },
      () => {
        setErrorCode('PERMISSION_DENIED');
        setIsErrorModalOpen(true);
      }
    );
  };

  return {
    currentMonth,
    expandedSessionId,
    isSuccessModalOpen,
    isErrorModalOpen,
    errorCode,
    isPending,
    setExpandedSessionId,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
    handleMonthChange,
    handleAttendance,
  };
};
