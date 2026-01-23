'use client';

import {useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getEtcQuestions,
  getPartQuestions,
  startApplication,
} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';
import {StartApplicationResponse} from '@/schemas/apply/apply-schema';
import {useEffect, useState} from 'react';

/**
 * 지원서 상태 조회
 * - 캐시에 데이터가 있으면 재사용
 * - 없으면 API 호출 후 캐시에 저장
 */
export const useApplicationStatus = (enabled: boolean = true) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // 캐시에서 데이터 읽기
  const cachedData = queryClient.getQueryData<StartApplicationResponse>(
    QUERY_KEYS.APPLY.STATUS
  );

  useEffect(() => {
    if (!enabled || cachedData) return;

    startApplication().then((data) => {
      queryClient.setQueryData(QUERY_KEYS.APPLY.STATUS, data);
    });
  }, [enabled, cachedData, queryClient]);

  return {
    data: cachedData,
    isLoading: isLoading && !cachedData,
  };
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
