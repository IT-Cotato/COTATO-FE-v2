'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {
  saveBasicInfo,
  saveEtcQuestions,
  savePartQuestions,
  startApplication,
  submitApplication,
  getUploadUrl,
  uploadFileToS3,
} from '@/services/api/apply/apply.api';
import {
  BasicInfoRequest,
  EtcQuestionRequest,
  PartQuestionRequest,
} from '@/schemas/apply/apply-schema';
import {QUERY_KEYS} from '@/constants/query-keys';

/**
 * 지원서 시작 (새 지원서 생성)
 * - 성공 시 결과를 React Query 캐시에 저장하여 여러 컴포넌트에서 공유
 */
export const useStartApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => startApplication(),
    onSuccess: (data) => {
      // 결과를 캐시에 저장하여 다른 컴포넌트에서 재사용
      queryClient.setQueryData(QUERY_KEYS.APPLY.STATUS, data);
    },
  });
};

/**
 * 기본 인적사항 저장
 */
export const useSaveBasicInfo = (applicationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BasicInfoRequest) => saveBasicInfo(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.BASIC_INFO(applicationId),
      });
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
        queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(applicationId),
      });
    },
  });
};

/**
 * 기타 질문 저장
 */
export const useSaveEtcQuestions = (applicationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EtcQuestionRequest) =>
      saveEtcQuestions(applicationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.ETC_QUESTIONS(applicationId),
      });
    },
    onError: (error: AxiosError) => {
      console.error('기타 질문 저장에 실패했습니다.', error);
    },
  });
};

/**
 * 지원서 최종 제출
 */
export const useSubmitApplication = (applicationId: number) => {
  return useMutation({
    mutationFn: () => submitApplication(applicationId),
    onError: (error: AxiosError) => {
      console.error('지원서 제출에 실패했습니다.', error);
    },
  });
};

/**
 * 파일 업로드
 */
export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const {preSignedUrl, key} = await getUploadUrl(file.name);
      await uploadFileToS3(preSignedUrl, file);
      return {
        pdfFileKey: key,
        pdfFileUrl: preSignedUrl.split('?')[0],
      };
    },
    onError: (error: AxiosError) => {
      console.error('파일 업로드에 실패했습니다.', error);
    },
  });
};
