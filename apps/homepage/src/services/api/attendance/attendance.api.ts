import {privateAxios} from '@/services/config/axios';
import {
  AttendanceIdByGenerationResponse,
  SessionAttendanceListResponse,
} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  AttendanceStatusType,
  FullSessionTableResponse,
  PositionType,
  SpecificSessionTableResponse,
} from '@/schemas/admin/attendance.schema';

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
): Promise<FullSessionTableResponse> => {
  const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.FULL_RECORDS, {
    params: {generationId, position, search},
  });
  return data;
};

/** 세션별 출석 조회 */
export const getAttendanceSpecificRecord = async (
  attendanceId: number,
  position?: PositionType,
  attendanceResults?: AttendanceStatusType,
  search?: string
): Promise<SpecificSessionTableResponse> => {
  const {data} = await privateAxios.get(
    ENDPOINT.ATTENDANCE.SPECIFIC_RECORDS(attendanceId),
    {
      params: {position, attendanceResults, search},
    }
  );
  return data;
};
