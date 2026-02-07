'use client';

import {useQuery} from '@tanstack/react-query';
import {
  getApplicationStatus,
  getBasicInfo,
  getEtcQuestions,
  getPartQuestions,
  getFileUrl,
} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 지원서 상태 조회
 * - `useQuery`를 사용하여 지원서 상태를 조회하고 캐싱합니다.
 * - 로그인한 사용자(`enabled: true`)에 대해서만 실행됩니다.
 */
export const useApplicationStatusQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.STATUS,
    queryFn: getApplicationStatus,
    enabled,
    staleTime: 1000 * 60 * 5,
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

/**
 * 기본 정보 조회
 */
export const useGetBasicInfoQuery = (applicationId: number | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.BASIC_INFO(applicationId!),
    queryFn: () => getBasicInfo(applicationId!),
    enabled: !!applicationId,
  });
};

/**
 * 파일 URL 조회 (Pre-signed URL)
 */
export const useGetFileUrlQuery = (fileKey: string | undefined | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPLY.FILE_URL(fileKey!),
    queryFn: () => getFileUrl(fileKey!),
    enabled: !!fileKey,
    staleTime: 1000 * 60 * 55,
  });
};
