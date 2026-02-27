import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteAdminMembers} from '@/services/api/admin/admin-members.api';

/** 회원 영구 삭제 */
export const useDeleteAdminMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-members'],
      });
    },
    onError: () => {
      alert('회원 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
