import {RecruitmentNotifyRequest} from '@/schemas/recruitment/recruitment.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

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
