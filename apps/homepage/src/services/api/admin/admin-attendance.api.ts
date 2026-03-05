import qs from 'qs';
import {
  AdminAttendanceEntireTableResponse,
  AdminAttendanceEntireTableResponseSchema,
  AdminAttendanceSpecificTableResponse,
  AdminAttendanceSpecificTableResponseSchema,
  AttendanceIdByGenerationResponse,
  AttendanceIdByGenerationResponseSchema,
  AttendanceStatusType,
  PositionType,
} from '@/schemas/admin/admin-attendance.schema';
import {handleApiError} from '@/services/utils/apiHelper';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';

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
): Promise<AdminAttendanceEntireTableResponse> => {
  try {
    const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.FULL_RECORDS, {
      params: {generationId, position, search},
    });
    return AdminAttendanceEntireTableResponseSchema.parse(data);
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
): Promise<AdminAttendanceSpecificTableResponse> => {
  try {
    const {data} = await privateAxios.get(
      ENDPOINT.ATTENDANCE.SPECIFIC_RECORDS(attendanceId),
      {
        params: {position, attendanceResults, search},
        paramsSerializer: (params) =>
          qs.stringify(params, {arrayFormat: 'repeat'}),
      }
    );
    return AdminAttendanceSpecificTableResponseSchema.parse(data);
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
