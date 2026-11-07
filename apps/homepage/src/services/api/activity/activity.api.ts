import {privateAxios} from '@/services/config/axios';
import {
  MyAttendanceDashboardResponse,
  MemberAttendanceRecordsResponse,
} from '@/schemas/mypage-mem/activity/attendance.schema';
import {
  MyMinusPointDashboardResponse,
  MyMinusPointRecordsResponse,
  MyPointTimelineResponseSchema,
} from '@/schemas/mypage-mem/activity/penalty.schema';
import {ENDPOINT} from '@/services/constant/endpoint';

/** 출석 대시보드 조회 */
export const getMyAttendanceDashboard =
  async (): Promise<MyAttendanceDashboardResponse> => {
    const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.MY_DASHBOARD);
    return data;
  };

/** 내 출석 기록 조회 */
export const getMyAttendanceRecords = async (
  month?: number
): Promise<MemberAttendanceRecordsResponse> => {
  const {data} = await privateAxios.get(ENDPOINT.ATTENDANCE.MY_RECORDS, {
    params: {month},
  });
  return data;
};

/** 상벌점 대시보드 조회 */
export const getMyPenaltyDashboard =
  async (): Promise<MyMinusPointDashboardResponse> => {
    const {data} = await privateAxios.get(ENDPOINT.PENALTY.MY_DASHBOARD);
    return data;
  };

/** 상벌점 내역 조회 */
export const getMyPenaltyRecords = async (
  month?: number
): Promise<MyMinusPointRecordsResponse> => {
  const {data} = await privateAxios.get(ENDPOINT.PENALTY.MY_RECORDS, {
    params: {month},
  });
  return data;
};

/** 새 통합 내역만 별도 엔드포인트로 읽어 기존 세션 내역 API의 형식을 보존한다. */
export const getMyPenaltyTimeline = async (month?: number) => {
  const {data} = await privateAxios.get(ENDPOINT.PENALTY.MY_TIMELINE, {
    params: {month},
  });
  return MyPointTimelineResponseSchema.parse(data);
};
