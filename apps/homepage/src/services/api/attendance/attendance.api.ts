import qs from 'qs';
import {privateAxios} from '@/services/config/axios';
import {SessionAttendanceListResponse} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  AttendanceIdByGenerationResponse,
  AttendanceIdByGenerationResponseSchema,
  AttendanceStatusType,
  FullSessionTableResponse,
  FullSessionTableResponseSchema,
  PositionType,
  SpecificSessionTableResponse,
  SpecificSessionTableResponseSchema,
} from '@/schemas/admin/attendance.schema';
import {handleApiError} from '@/services/utils/apiHelper';

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
  try {
    const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.ATTENDANCE_ID, {
      params: {generationId},
    });
    return AttendanceIdByGenerationResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 전체 출석 통계 조회 */
export const getAttendanceFullRecord = async (
  generationId: number,
  position?: PositionType,
  search?: string
): Promise<FullSessionTableResponse> => {
  try {
    const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.FULL_RECORDS, {
      params: {generationId, position, search},
    });
    return FullSessionTableResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 세션별 출석 조회 */
export const getAttendanceSpecificRecord = async (
  attendanceId: number,
  position?: PositionType,
  attendanceResults?: AttendanceStatusType[],
  search?: string
): Promise<SpecificSessionTableResponse> => {
  try {
    const {data} = await privateAxios.get(
      ENDPOINT.ATTENDANCE.SPECIFIC_RECORDS(attendanceId),
      {
        params: {position, attendanceResults, search},
        paramsSerializer: (params) =>
          qs.stringify(params, {arrayFormat: 'repeat'}),
      }
    );
    return SpecificSessionTableResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 출석 상태 관리 */
export const patchAttendanceStatus = async (params: {
  attendanceId: number;
  memberId: number;
  result: AttendanceStatusType;
}): Promise<void> => {
  try {
    await privateAxios.patch(
      ENDPOINT.ATTENDANCE.MANAGE_STATUS(params.attendanceId),
      {
        memberId: params.memberId,
        result: params.result,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
};
