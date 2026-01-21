'use client';

import {useQuery} from '@tanstack/react-query';
import {getEtcQuestions, getPartQuestions} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 파트별 질문 조회
 */
export const useGetPartQuestionsQuery = (applicationId: number | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(applicationId!),
    queryFn: () => getPartQuestions(applicationId!),
    enabled: !!applicationId,
  });
};

/**
 * 기타 질문 조회
 */
export const useGetEtcQuestionsQuery = (applicationId: number | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.ETC_QUESTIONS(applicationId!),
    queryFn: () => getEtcQuestions(applicationId!),
    enabled: !!applicationId,
  });
};
