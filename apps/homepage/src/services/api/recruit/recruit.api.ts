import {
  RecruitmentNoticeSchema,
  RecruitmentNoticeType,
  SubscribeEmailType,
} from '@/schemas/recruit/recruit.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {AxiosResponse} from 'axios';

export const subscribeEmail = async (
  params: SubscribeEmailType
): Promise<void> => {
  try {
    await publicAxios.post(ENDPOINT.RECRUITMENTS.SUBSCRIBE, params);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRecruitmentNotice =
  async (): Promise<RecruitmentNoticeType> => {
    try {
      const response: AxiosResponse = await publicAxios.get(
        ENDPOINT.RECRUITMENTS.NOTICES
      );

      const validatedResponse = RecruitmentNoticeSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      return handleApiError(error);
    }
  };
