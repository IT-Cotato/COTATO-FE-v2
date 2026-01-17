import {QUERY_KEYS} from '@/constants/query-keys';
import {PostApplicationQuestionsRequest} from '@/schemas/admin/admin-appication-questions.schema';
import {postAdminApplicationQuestions} from '@/services/api/admin/admin.application.questions.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useAdminApplicationQuestionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostApplicationQuestionsRequest) =>
      postAdminApplicationQuestions(payload),

    onSuccess: (_data, variables) => {
      const {generationId, questionType} = variables;

      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.ADMIN_APPLICATION_QUESTIONS,
          generationId,
          questionType,
        ],
      });
    },
  });
};
