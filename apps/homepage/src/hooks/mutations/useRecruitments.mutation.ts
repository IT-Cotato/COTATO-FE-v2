import {QUERY_KEYS} from '@/constants/query-keys';
import {toggleRecruitmentsStatus} from '@/services/api/recruitments/recruitments.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useToggleRecruitmentsStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleRecruitmentsStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENTS.STATUS,
      });
      alert('모집 상태가 변경되었습니다.');
    },
    onError: () => {
      alert('모집 상태 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
