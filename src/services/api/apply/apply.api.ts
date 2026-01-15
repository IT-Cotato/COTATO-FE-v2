import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  StartApplicationData,
  startApplicationDataSchema,
} from '@/schemas/apply/apply-schema';
import {AxiosResponse} from 'axios';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

/**
 * 지원서 시작
 */
export const startApplication = async (): Promise<StartApplicationData> => {
  const response: AxiosResponse = await privateAxios.post(ENDPOINT.APPLY.START);

  const responseSchema = createSuccessResponseSchema(
    startApplicationDataSchema
  );
  const validatedResponse = responseSchema.parse(response.data);

  // data 부분만 반환
  return validatedResponse.data;
};
