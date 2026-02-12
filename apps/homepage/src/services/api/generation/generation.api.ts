import {GenerationListSchema} from '@/schemas/generation/generation.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 기수 목록 조회
 */
export const getGenerations = async () => {
  try {
    const response = await publicAxios.get(ENDPOINT.GENERATIONS);
    return GenerationListSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};
