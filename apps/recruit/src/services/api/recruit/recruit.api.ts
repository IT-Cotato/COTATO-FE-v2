import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import {
  RecruitmentNoticeSchema,
  RecruitmentNoticeType,
} from '@/schemas/recruit/recruit.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {AxiosResponse} from 'axios';

export const getRecruitmentNotice =
  async (): Promise<RecruitmentNoticeType> => {
    try {
      const response: AxiosResponse = await publicAxios.get(
        ENDPOINT.RECRUITMENT.NOTICE
      );

      const responseSchema = createSuccessResponseSchema(
        RecruitmentNoticeSchema
      );
      const validatedResponse = responseSchema.parse(response.data);

      return validatedResponse.data;
    } catch (error) {
      return handleApiError(error);
    }
  };
