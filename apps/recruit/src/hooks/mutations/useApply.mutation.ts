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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.STATUS,
      });
    },
  });
};

/**
 * 기본 인적사항 저장
 */
export const useSaveBasicInfo = (applicationId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BasicInfoRequest) => {
      if (!applicationId) throw new Error('지원서 ID가 없습니다.');
      return saveBasicInfo(applicationId, data);
    },
    onSuccess: () => {
      if (!applicationId) return;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.BASIC_INFO(applicationId),
      });
    },
    onError: (error: Error) => {
      console.error('기본 인적사항 저장에 실패했습니다.', error);
    },
  });
};

/**
 * 파트별 질문 저장
 */
export const useSavePartQuestions = (applicationId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PartQuestionRequest) => {
      if (!applicationId) throw new Error('지원서 ID가 없습니다.');
      return savePartQuestions(applicationId, data);
    },
    onSuccess: () => {
      if (!applicationId) return;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(applicationId),
      });
    },
    onError: (error: Error) => {
      console.error('파트별 질문 저장에 실패했습니다.', error);
    },
  });
};

/**
 * 기타 질문 저장
 */
export const useSaveEtcQuestions = (applicationId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EtcQuestionRequest) => {
      if (!applicationId) throw new Error('지원서 ID가 없습니다.');
      return saveEtcQuestions(applicationId, data);
    },
    onSuccess: () => {
      if (!applicationId) return;
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
export const useSubmitApplication = (applicationId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (applicationId === null) throw new Error('지원서 ID가 없습니다.');
      return submitApplication(applicationId);
    },
    onSuccess: () => {
      if (applicationId === null) return;
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.APPLY.STATUS,
      });
    },
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
