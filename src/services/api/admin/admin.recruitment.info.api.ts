import {
  GetAdminRecruitmentInformationResponseSchema,
  PostAdminRecruitmentInformationRequest,
  RecruitmentInformation,
} from '@/schemas/admin/admin-recruitment-information.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

export const getAdminRecruitmentInformations = async (
  generationId: number
): Promise<RecruitmentInformation> => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN.RECRUITMENT_INFORMATIONS,
      {
        params: {generationId},
      }
    );

    return GetAdminRecruitmentInformationResponseSchema.parse(response.data)
      .data;
  } catch (error: unknown) {
    return handleApiError(error);
  }
};

export const postAdminRecruitmentInformations = async (
  payload: PostAdminRecruitmentInformationRequest
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.ADMIN.RECRUITMENT_INFORMATIONS, payload);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
