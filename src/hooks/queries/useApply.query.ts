'use client';

import {useQuery} from '@tanstack/react-query';
import {getPartQuestions} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 파트별 질문 조회
 */
export const useGetPartQuestionsQuery = (applicationId: number | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(String(applicationId)),
    queryFn: () => getPartQuestions(applicationId!),
    enabled: !!applicationId,
  });
};
