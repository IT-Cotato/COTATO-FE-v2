import {QUERY_KEYS} from '@/constants/query-keys';
import type {
  GetAdminApplicationsParamsType,
  GetAdminApplicationsResponse,
} from '@/schemas/admin/admin-applications.schema';
import {getAdminApplications} from '@/services/api/admin/admin-applications.api';
import type {ErrorResponse} from '@/schemas/common/common-schema';
import {useQuery} from '@tanstack/react-query';

/**
 * 어드민 지원서 관리 페이지에서
 * 지원서 목록을 조회하기 위한 React Query 훅입니다.
 *
 * - 페이지네이션, 정렬, 합격 상태 필터 등의 조건을 포함하여
 *   지원서 목록을 조회합니다.
 * - 전달된 filter 값은 queryKey에 포함되어,
 *   필터 조건이 변경되면 자동으로 재조회됩니다.
 *
 * @param filter 지원서 목록 조회에 사용되는 필터 파라미터
 * @param filter.page 페이지 번호
 * @param filter.size 페이지당 항목 수
 * @param filter.sort 정렬 기준 (예: 제출일 asc | desc)
 * @param filter.passViewStatuses 합격 상태 필터 (PASS | FAIL | ALL)
 *
 * @returns react query
 */
export const useAdminApplicationsQuery = (
  filter: GetAdminApplicationsParamsType
) => {
  return useQuery<GetAdminApplicationsResponse, ErrorResponse>({
    queryKey: [QUERY_KEYS.ADMIN_APPLICATIONS, filter],
    queryFn: () => getAdminApplications(filter),
    placeholderData: (previousData) => previousData,
  });
};
