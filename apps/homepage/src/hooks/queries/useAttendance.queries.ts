import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getAttendanceIdByGeneration,
  getAttendanceSessions,
} from '@/services/api/attendance/attendance.api';

/** 출석 세션 목록 쿼리 */
export const useAttendanceSessionsQuery = (month?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.SESSIONS(month),
    queryFn: () => getAttendanceSessions(month),
  });
};

/** 기수별 세션 출석 id 목록 쿼리 */
export const useAttendanceIdByGenerationQuery = (generationId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.ATTENDANCE_ID(generationId),
    queryFn: () => getAttendanceIdByGeneration(generationId),
    enabled: !!generationId,
  });
};
