import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import {
  RecruitmentNotifyRequest,
  RecruitmentStatusResponse,
  RecruitmentStatusResponseSchema,
} from '@/schemas/recruitment/recruitment.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {AxiosResponse} from 'axios';

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

      const responseSchema = createSuccessResponseSchema(
        RecruitmentStatusResponseSchema
      );
      const validatedResponse = responseSchema.parse(response.data);

      return validatedResponse.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

/** 모집 알림 구독 신청 */
export const postRecruitmentNotify = async (
  data: RecruitmentNotifyRequest
): Promise<void> => {
  try {
    await publicAxios.post(ENDPOINT.RECRUITMENT.SUBSCRIBE, data);
  } catch (error) {
    return handleApiError(error);
  }
};
