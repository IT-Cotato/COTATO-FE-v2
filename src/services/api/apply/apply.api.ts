import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  BasicInfoResponse,
  BasicInfoResponseSchema,
  StartApplicationResponse,
  StartApplicationResponseSchema,
} from '@/schemas/apply/apply-schema';
import {AxiosResponse} from 'axios';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

/**
 * 지원서 시작
 */
export const startApplication = async (): Promise<StartApplicationResponse> => {
  const response: AxiosResponse = await privateAxios.post(ENDPOINT.APPLY.START);

  const responseSchema = createSuccessResponseSchema(
    StartApplicationResponseSchema
  );
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};

/**
 * 기본 인적사항 조회
 */
export const getBasicInfo = async (
  applicationId: number
): Promise<BasicInfoResponse> => {
  const response: AxiosResponse = await privateAxios.get(
    ENDPOINT.APPLY.BASIC_INFO(applicationId)
  );

  const responseSchema = createSuccessResponseSchema(BasicInfoResponseSchema);
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};
