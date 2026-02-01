import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import {
  faqParametersType,
  faqResponseSchema,
  faqResponseType,
} from '@/schemas/faq/faq.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {AxiosResponse} from 'axios';

/** faq 조회 */
export const getFaq = async (
  type: faqParametersType
): Promise<faqResponseType> => {
  try {
    const response: AxiosResponse = await publicAxios.get(ENDPOINT.FAQ, {
      params: {
        type,
      },
    });

    const responseSchema = createSuccessResponseSchema(faqResponseSchema);
    const validatedResponse = responseSchema.parse(response.data);

    return validatedResponse.data;
  } catch (error) {
    return handleApiError(error);
  }
};
