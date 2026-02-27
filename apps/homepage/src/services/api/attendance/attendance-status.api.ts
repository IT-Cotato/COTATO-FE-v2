import {AttendanceStatusResponse} from '@/schemas/attendance/attendance.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';

/** 현재 출결 상태 조회 */
export const getAttendanceStatus =
  async (): Promise<AttendanceStatusResponse> => {
    const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.STATUS);
    return data;
  };
