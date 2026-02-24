import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getAttendanceStatus} from '@/services/api/attendance/attendance-status.api';

/**
 * 현재 출결 상태 조회 쿼리
 */
export const useAttendanceStatusQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.STATUS,
    queryFn: getAttendanceStatus,
  });
};
