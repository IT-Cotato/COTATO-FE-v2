import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getAttendanceSessions} from '@/services/api/attendance/attendance.api';
import {
  getAttendanceFullRecord,
  getAttendanceIdByGeneration,
  getAttendanceSpecificRecord,
} from '@/services/api/admin/admin-attendance.api';
import {
  AttendanceStatusType,
  PositionType,
} from '@/schemas/admin/admin-attendance.schema';

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

/** 전체 출석 통계 조회 쿼리 */
export const useAttendanceFullRecordQuery = (
  generationId: number,
  position?: PositionType,
  search?: string
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.FULL_RECORDS(
      generationId,
      position,
      search
    ),
    queryFn: () => getAttendanceFullRecord(generationId, position, search),
    enabled: !!generationId,
  });
};

/** 세션별 출석 조회 쿼리 */
export const useAttendanceSpecificRecordQuery = (
  attendanceId: number,
  position?: PositionType,
  attendanceResults?: AttendanceStatusType[],
  search?: string
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.SPECIFIC_RECORDS(
      attendanceId,
      position,
      attendanceResults,
      search
    ),
    queryFn: () =>
      getAttendanceSpecificRecord(
        attendanceId,
        position,
        attendanceResults,
        search
      ),
    enabled: !!attendanceId,
  });
};
