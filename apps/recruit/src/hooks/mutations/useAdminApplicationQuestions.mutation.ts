import {QUERY_KEYS} from '@/constants/query-keys';
import {PostApplicationQuestionsRequest} from '@/schemas/admin/admin-application-questions.schema';
import {postAdminApplicationQuestions} from '@/services/api/admin/admin-application-questions.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/**
 * 지원서 질문을 생성 또는 수정하는 React Query mutation 훅입니다.
 *
 * - 어드민 지원서 수정 페이지의 지원서 관리 폼에서 사용됩니다.
 * - 질문 등록/수정 성공 시, 해당 기수/파트의 질문 목록 쿼리를 무효화합니다.
 *
 * @returns React Query useMutation
 */
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
