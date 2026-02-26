import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getAdminMemberDetail,
  getAdminMembers,
} from '@/services/api/admin/admin-members.api';
import {GetAdminMembersParams} from '@/schemas/admin/admin-members.schema';

/** 전체 회원 목록 조회 */
export const useAdminMembersQuery = (params: GetAdminMembersParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_MEMBERS.LIST(params),
    queryFn: () => getAdminMembers(params),
    placeholderData: (prev) => prev,
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
