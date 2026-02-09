import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postGeneration} from '@/services/api/admin/admin-generation.api';
import {QUERY_KEYS} from '@/constants/query-keys';

export const useAddGenerationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postGeneration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_GENERATIONS],
      });
    },
  });
};
