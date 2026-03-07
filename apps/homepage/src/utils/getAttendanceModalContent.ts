import {ATTENDANCE_ERROR_MESSAGES} from '@/constants/mypage-mem/attendance/attendance';

export const getAttendanceModalContent = (errorCode: string | null) => {
  return (
    ATTENDANCE_ERROR_MESSAGES[errorCode ?? ''] ||
    ATTENDANCE_ERROR_MESSAGES.DEFAULT
  );
};
