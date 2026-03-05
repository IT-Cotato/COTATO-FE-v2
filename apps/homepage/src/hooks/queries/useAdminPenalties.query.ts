import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getAllStatistics,
  getSessionDetail,
} from '@/services/api/admin/admin-penalties.api';
import {SortDirection} from '@/types/admin/admin-penalties.type';
import {useQuery} from '@tanstack/react-query';

/** 전체 상벌점 통계 조회 쿼리 */
export const useAllStatisticsQuery = (
  generationId: number,
  search?: string,
  sortDirection?: SortDirection
) => {
  return useQuery({
    queryKey: QUERY_KEYS.PENALTY.ALL_STATISTICS({
      generationId,
      search,
      sortDirection,
    }),
    queryFn: () => getAllStatistics({generationId, search, sortDirection}),
    enabled: !!generationId,
  });
};

/** 세션별 상벌점 조회 쿼리 */
export const useSessionDetailQuery = (sessionId: number, search?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PENALTY.SESSION_DETAIL({
      sessionId,
      search,
    }),
    queryFn: () => getSessionDetail({sessionId, search}),
    enabled: !!sessionId,
  });
};
