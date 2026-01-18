import {QUERY_KEYS} from '@/constants/query-keys';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {getAdminApplicationQuestions} from '@/services/api/admin/admin.application.questions.api';

import {useQuery} from '@tanstack/react-query';

export const useAdminApplicationQuestionsQuery = ({
  generationId,
  questionType,
}: {
  generationId: number;
  questionType: PartType;
}) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.ADMIN_APPLICATION_QUESTIONS,
      generationId,
      questionType,
    ],
    queryFn: () =>
      getAdminApplicationQuestions({
        generationId,
        questionType,
      }),
    enabled: !!generationId && !!questionType,
    staleTime: 1000 * 60 * 5,
  });
};
