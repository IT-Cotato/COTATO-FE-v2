import {privateAxios} from '@/services/config/axios';
import {
  MyAttendanceDashboardResponse,
  MemberAttendanceRecordsResponse,
} from '@/schemas/mypage-mem/activity/attendance.schema';
import {
  MyMinusPointDashboardResponse,
  MyMinusPointRecordsResponse,
} from '@/schemas/mypage-mem/activity/penalty.schema';

/** 출석 대시보드 조회 */
export const getMyAttendanceDashboard =
  async (): Promise<MyAttendanceDashboardResponse> => {
    const {data} = await privateAxios.get('/v1/api/attendances/my/dashboard');
    return data;
  };

/** 내 출석 기록 조회 */
export const getMyAttendanceRecords = async (
  month?: number
): Promise<MemberAttendanceRecordsResponse> => {
  const {data} = await privateAxios.get('/v1/api/attendances/my', {
    params: {month},
  });
  return data;
};

/** 상벌점 대시보드 조회 */
export const getMyPenaltyDashboard =
  async (): Promise<MyMinusPointDashboardResponse> => {
    const {data} = await privateAxios.get('/v1/api/minus-points/my/dashboard');
    return data;
  };

/** 상벌점 내역 조회 */
export const getMyPenaltyRecords = async (
  month?: number
): Promise<MyMinusPointRecordsResponse> => {
  const {data} = await privateAxios.get('/v1/api/minus-points/my', {
    params: {month},
  });
  return data;
};
