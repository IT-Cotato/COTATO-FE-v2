import {QUERY_KEYS} from '@/constants/query-keys';
import {RecruitmentsStatusType} from '@/schemas/recruitments/recruitments.schema';
import {toggleRecruitmentsStatus} from '@/services/api/recruitments/recruitments.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useToggleRecruitmentsStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleRecruitmentsStatus,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.RECRUITMENTS.STATUS,
      });
      const previous = queryClient.getQueryData<RecruitmentsStatusType>(
        QUERY_KEYS.RECRUITMENTS.STATUS
      );
      queryClient.setQueryData<RecruitmentsStatusType>(
        QUERY_KEYS.RECRUITMENTS.STATUS,
        (old) => ({...old, active: !old?.active})
      );
      return {previous};
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENTS.STATUS,
      });
      alert('모집 상태가 변경되었습니다.');
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.RECRUITMENTS.STATUS,
          context.previous
        );
      }
      alert('모집 상태 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
