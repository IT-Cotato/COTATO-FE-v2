import {privateAxios} from '@/services/config/axios';
import {SessionAttendanceListResponse} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {ENDPOINT} from '@/services/constant/endpoint';

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
