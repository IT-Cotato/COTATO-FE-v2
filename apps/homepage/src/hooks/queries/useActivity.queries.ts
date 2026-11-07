import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getMyAttendanceDashboard,
  getMyAttendanceRecords,
  getMyPenaltyDashboard,
  getMyPenaltyRecords,
  getMyPenaltyTimeline,
} from '@/services/api/activity/activity.api';

/** 내 출석 대시보드 조회 */
export const useAttendanceDashboardQuery = (options?: {enabled?: boolean}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.DASHBOARD,
    queryFn: getMyAttendanceDashboard,
    ...options,
  });
};

/** 내 출석 기록 조회 */
export const useAttendanceRecordsQuery = (
  month?: number,
  options?: {enabled?: boolean}
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ATTENDANCE.RECORDS(month),
    queryFn: () => getMyAttendanceRecords(month),
    ...options,
  });
};

/** 내 상벌점 대시보드 조회 */
export const usePenaltyDashboardQuery = (options?: {enabled?: boolean}) => {
  return useQuery({
    queryKey: QUERY_KEYS.PENALTY.DASHBOARD,
    queryFn: getMyPenaltyDashboard,
    ...options,
  });
};

/** 내 상벌점 기록 조회 */
export const usePenaltyRecordsQuery = (
  month?: number,
  options?: {enabled?: boolean}
) => {
  return useQuery({
    queryKey: QUERY_KEYS.PENALTY.RECORDS(month),
    queryFn: () => getMyPenaltyRecords(month),
    ...options,
  });
};

/** 기존 주차 내역 캐시와 분리하여 서로 다른 응답 형식이 섞이지 않게 한다. */
export const usePenaltyTimelineQuery = (
  month?: number,
  options?: {enabled?: boolean}
) =>
  useQuery({
    queryKey: QUERY_KEYS.PENALTY.TIMELINE(month),
    queryFn: () => getMyPenaltyTimeline(month),
    ...options,
  });
