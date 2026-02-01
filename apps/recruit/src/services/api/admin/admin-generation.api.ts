import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  GetGenerationsResponseSchema,
  PostGenerationRequest,
  PostGenerationResponseSchema,
} from '@/schemas/admin/admin-generation.schema';
import {handleApiError} from '@/services/utils/apiHelper';

/** 기수 목록 조회  */
export const getGenerations = async () => {
  try {
    const response = await privateAxios.get(ENDPOINT.ADMIN.GENERATIONS);
    return GetGenerationsResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 기수 생성  */
export const postGeneration = async (data: PostGenerationRequest) => {
  try {
    const response = await privateAxios.post(ENDPOINT.ADMIN.GENERATIONS, data);
    return PostGenerationResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};
