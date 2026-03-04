import {useMutation, useQueryClient} from '@tanstack/react-query';
import {patchAdminMembersStatus} from '@/services/api/admin/admin-members.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/** 일괄 활동 여부 변경 */
export const usePatchAdminMembersStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAdminMembersStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_MEMBERS.BASE,
      });
    },
    onError: () => {
      alert('상태 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
