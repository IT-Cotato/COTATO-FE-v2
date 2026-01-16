'use client';

import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {saveBasicInfo} from '@/services/api/apply/apply.api';
import {BasicInfoRequest} from '@/schemas/apply/apply-schema';

/**
 * 기본 인적사항 저장
 */
export const useSaveBasicInfo = (applicationId: number) => {
  return useMutation({
    mutationFn: (data: BasicInfoRequest) => saveBasicInfo(applicationId, data),
    onSuccess: () => {
      console.log('BasicInfo saved successfully');
    },
    onError: (error: AxiosError) => {
      console.error('Failed to save BasicInfo', error);
    },
  });
};
