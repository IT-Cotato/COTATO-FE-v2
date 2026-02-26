import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  deleteAdminMembers,
  patchAdminMembersStatus,
} from '@/services/api/admin/admin-members.api';

/** 일괄 활동 여부 변경 */
export const usePatchAdminMembersStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAdminMembersStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-members'],
      });
    },
    onError: () => {
      alert('상태 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

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
