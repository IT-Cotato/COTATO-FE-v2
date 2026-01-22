import {QUERY_KEYS} from '@/constants/query-keys';
import {getGenerations} from '@/services/api/admin/admin-generation.api';
import {useQuery} from '@tanstack/react-query';

/**
 * 어드민 - 기수 목록 조회 쿼리 훅
 *
 * - 어드민에서 사용하는 전체 기수 목록을 조회합니다.
 * - React Query를 사용해 서버 상태로 관리합니다.
 * - 조회된 기수 목록은 10분간 fresh 상태로 유지됩니다.
 *
 * @returns 어드민 기수 목록 조회를 위한 React Query 결과 객체
 */
export const useAdminGenerationsQuery = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN_GENERATIONS],
    queryFn: getGenerations,
    staleTime: 1000 * 60 * 10,
  });
