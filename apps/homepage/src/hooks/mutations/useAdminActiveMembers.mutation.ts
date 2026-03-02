import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  deleteActiveMember,
  patchActiveMember,
  patchActiveMemberRole,
} from '@/services/api/admin/admin-members.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/** 활동 회원 삭제 */
export const useDeleteActiveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActiveMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_MEMBERS.LIST({}),
      });
    },
    onError: () => {
      alert('활동 회원 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

/** 활동 회원 정보 수정 */
export const usePatchActiveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchActiveMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_MEMBERS.ACTIVE_LIST({}),
      });
    },
    onError: () => {
      alert('회원 정보 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

/** 활동 회원 역할 변경 */
export const usePatchActiveMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchActiveMemberRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_MEMBERS.ACTIVE_LIST({}),
      });
    },
    onError: () => {
      alert('역할 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
