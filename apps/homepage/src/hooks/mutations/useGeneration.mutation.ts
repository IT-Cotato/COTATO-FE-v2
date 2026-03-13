import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  createGeneration,
  updateGeneration,
} from '@/services/api/generation/generation.api';
import {
  CreateGenerationRequest,
  UpdateGenerationRequest,
} from '@/schemas/generation/generation.schema';
import {QUERY_KEYS} from '@/constants/query-keys';

/** 기수 추가 */
export const useCreateGenerationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGenerationRequest) => createGeneration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GENERATIONS});
    },
    onError: () => {
      alert('기수 추가에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

/** 기수 수정 */
export const useUpdateGenerationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      generationId,
      data,
    }: {
      generationId: number;
      data: UpdateGenerationRequest;
    }) => updateGeneration(generationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.GENERATIONS});
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : (error as {message?: string})?.message ?? '기수 수정에 실패했습니다.';
      alert(message);
    },
  });
};
