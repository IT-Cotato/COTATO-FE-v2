import {privateAxios} from '@/services/config/axios';
import {
  AttendanceIdByGenerationResponse,
  SessionAttendanceListResponse,
} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {ENDPOINT} from '@/services/constant/endpoint';
import {PositionType} from '@/schemas/admin/attendance.schema';

/** 출석 세션 목록 조회 */
export const getAttendanceSessions = async (
  month?: number
): Promise<SessionAttendanceListResponse> => {
  const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.SESSIONS, {
    params: {month},
  });
  return data;
};

/** 출석하기  */
export const postAttendanceRecord = async (params: {
  attendanceId: number;
  latitude?: number;
  longitude?: number;
}) => {
  const {data} = await privateAxios.post(ENDPOINT.ATTENDANCE.RECORDS, params);
  return data;
};

/** 세션 목록 조회 */
export const getAttendanceIdByGeneration = async (
  generationId: number
): Promise<AttendanceIdByGenerationResponse> => {
  const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.ATTENDANCE_ID, {
    params: {generationId},
  });
  return data;
};

/** 전체 출석 통계 조회 */
export const getAttendanceFullRecord = async (
  generationId: number,
  position?: PositionType,
  search?: string
): Promise<AttendanceIdByGenerationResponse> => {
  const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.ATTENDANCE_ID, {
    params: {generationId, position, search},
  });
  return data;
};
