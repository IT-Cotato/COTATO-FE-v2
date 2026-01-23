'use client';

import {useQuery} from '@tanstack/react-query';
import {
  getEtcQuestions,
  getPartQuestions,
  startApplication,
} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 지원 상태 조회 (isSubmitted 여부 확인)
 */
export const useGetApplicationStatusQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.STATUS,
    queryFn: () => startApplication(),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분간 캐시
  });
};

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
