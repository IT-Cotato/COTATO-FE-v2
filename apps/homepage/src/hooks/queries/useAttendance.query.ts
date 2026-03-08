import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getAttendanceSessions} from '@/services/api/attendance/attendance.api';

/** 출석 세션 목록 쿼리 */
export const useAttendanceSessionsQuery = (month?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.SESSIONS(month),
    queryFn: () => getAttendanceSessions(month),
  });
};
