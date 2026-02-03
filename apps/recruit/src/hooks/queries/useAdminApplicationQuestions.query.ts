import {QUERY_KEYS} from '@/constants/query-keys';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {getAdminApplicationQuestions} from '@/services/api/admin/admin-application-questions.api';

import {useQuery} from '@tanstack/react-query';

/**
 * 특정 기수의 파트별 지원서 질문 목록을 조회하는 React Query 훅
 *
 * - 어드민 지원서 수정 페이지의 지원서 관리 폼에서 사용됩니다.
 * - 기수(generationId)와 파트(questionType)에 따라 질문 목록을 조회합니다.
 * - generationId 또는 questionType이 없는 경우 쿼리는 실행되지 않습니다.
 *
 * @param params 조회 파라미터
 * @param params.generationId 기수 ID
 * @param params.questionType 파트 타입 (FE | BE | PM | DESIGN)
 * @returns React Query
 */
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
