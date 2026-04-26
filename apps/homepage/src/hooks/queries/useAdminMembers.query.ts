import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getAdminMemberDetail,
  getAdminMembers,
  getActiveMembers,
} from '@/services/api/admin/admin-members.api';
import {
  GetAdminMembersParams,
  GetActiveMembersParams,
} from '@/schemas/admin/admin-members.schema';

/** 전체 회원 목록 조회 */
export const useAdminMembersQuery = (params: GetAdminMembersParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_MEMBERS.LIST(params),
    queryFn: () => getAdminMembers(params),
  });
};

/** 회원 상세 조회 (수정 모달용) */
export const useAdminMemberDetailQuery = (memberId: number | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_MEMBERS.DETAIL(memberId!),
    queryFn: () => getAdminMemberDetail(memberId!),
    enabled: memberId !== null,
  });
};

/** 활동 회원 목록 조회 */
export const useActiveMembersQuery = (
  params: GetActiveMembersParams,
  enabled = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_MEMBERS.ACTIVE_LIST(params),
    queryFn: () => getActiveMembers(params),
    enabled,
  });
};
