'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {saveBasicInfo} from '@/services/api/apply/apply.api';
import {BasicInfoRequest} from '@/schemas/apply/apply-schema';
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
      console.error('Failed to save BasicInfo', error);
    },
  });
};
