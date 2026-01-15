import {
  GetAdminRecruitmentInformationResponseSchema,
  PostAdminRecruitmentInformationRequest,
  RecruitmentInformation,
} from '@/schemas/admin/admin-recruitment-information-schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {ErrorResponseSchema} from '@/schemas/common/common-schema';
import axios from 'axios';

export const getRecruitmentInformations = async (
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
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      const parsed = ErrorResponseSchema.safeParse(data);
      if (parsed.success) {
        throw parsed.data;
      }
    }
  }
  throw new Error('알 수 없는 에러가 발생했습니다.');
};

export const postRecruitmentInformations = async (
  payload: PostAdminRecruitmentInformationRequest
): Promise<void> => {
  try {
    await privateAxios.post(ENDPOINT.ADMIN.RECRUITMENT_INFORMATIONS, payload);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      const parsed = ErrorResponseSchema.safeParse(data);
      if (parsed.success) {
        throw parsed.data;
      }
    }

    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
};
