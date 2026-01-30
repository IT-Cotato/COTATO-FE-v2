import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {GetRecruitmentStatusResponseSchema} from '@/schemas/status/recruitment-status.schema';
import {handleApiError} from '@/services/utils/apiHelper';
import type {AxiosResponse} from 'axios';
import type {RecruitmentStatusResponse} from '@/schemas/status/recruitment-status.schema';

/**
 * 모집 상태 조회
 * - 모집 종료/시작 여부는 최종 제출 시점에 반드시 재확인 필요
 */
export const getRecruitmentStatus =
  async (): Promise<RecruitmentStatusResponse> => {
    try {
      const response: AxiosResponse = await publicAxios.get(
        ENDPOINT.RECRUITMENT.STATUS,
        {
          params: {_ts: Date.now()},
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        }
      );
      return GetRecruitmentStatusResponseSchema.parse(response.data);
    } catch (error) {
      return handleApiError(error);
    }
  };
