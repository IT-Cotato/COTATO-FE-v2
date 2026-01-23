'use client';

import {useQuery} from '@tanstack/react-query';
import {
  getEtcQuestions,
  getPartQuestions,
  startApplication,
} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 지원서 상태 조회
 * - `useQuery`를 사용하여 지원서 상태를 조회하고 캐싱합니다.
 * - 로그인한 사용자(`enabled: true`)에 대해서만 실행됩니다.
 * - POST 요청이므로 실패 시 재시도는 비활성화합니다.
 */
export const useApplicationStatusQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.STATUS,
    queryFn: startApplication,
    enabled,
    retry: false, // POST 요청이므로 실패 시 재시도 방지
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
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
