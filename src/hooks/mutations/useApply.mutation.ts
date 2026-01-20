'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {saveBasicInfo, savePartQuestions} from '@/services/api/apply/apply.api';
import {
  BasicInfoRequest,
  PartQuestionRequest,
} from '@/schemas/apply/apply-schema';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 기본 인적사항 저장
 */
export const useSaveBasicInfo = (applicationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BasicInfoRequest) => saveBasicInfo(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.BASIC_INFO(String(applicationId)),
      });
    },
    onError: (error: AxiosError) => {
      console.error('기본 인적사항 저장에 실패했습니다.', error);
    },
  });
};

/**
 * 파트별 질문 저장
 */
export const useSavePartQuestions = (applicationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PartQuestionRequest) =>
      savePartQuestions(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(String(applicationId)),
      });
    },
    onError: (error: AxiosError) => {
      console.error('파트별 질문 저장에 실패했습니다.', error);
    },
  });
};
