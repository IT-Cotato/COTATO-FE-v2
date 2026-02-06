import {QUERY_KEYS} from '@/constants/query-keys';
import {postRecruitmentNotify} from '@/services/api/recruitment/recruitment.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useSubscribeRecruitmentNotify = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRecruitmentNotify,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MAIL_STATUS],
      });
    },
  });
};
