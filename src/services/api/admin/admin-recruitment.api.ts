import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  PostRecruitmentActivationRequest,
  PostRecruitmentDeactivationRequest,
  RecruitmentResponseSchema,
  RecruitmentResponse,
} from '@/schemas/admin/admin-recruitment.schema';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 모집 활성화 API
 */
export const postRecruitmentActivation = async (
  data: PostRecruitmentActivationRequest
): Promise<RecruitmentResponse> => {
  try {
    const response = await privateAxios.post(
      ENDPOINT.ADMIN.RECRUITMENT_ACTIVATION,
      data
    );
    return RecruitmentResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

/**
 * 모집 종료 API
 */
export const postRecruitmentDeactivation = async (
  data: PostRecruitmentDeactivationRequest
): Promise<RecruitmentResponse> => {
  try {
    const response = await privateAxios.post(
      ENDPOINT.ADMIN.RECRUITMENT_DEACTIVATION,
      data
    );
    return RecruitmentResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
