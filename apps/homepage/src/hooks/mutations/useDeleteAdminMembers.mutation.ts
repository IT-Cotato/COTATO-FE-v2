import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteAdminMembers} from '@/services/api/admin/admin-members.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/** 회원 영구 삭제 */
export const useDeleteAdminMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_MEMBERS.LIST({}),
      });
    },
    onError: () => {
      alert('회원 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
