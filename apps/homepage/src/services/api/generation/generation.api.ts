import {
  CreateGenerationRequest,
  GenerationDetailSchema,
  GenerationListSchema,
  UpdateGenerationRequest,
} from '@/schemas/generation/generation.schema';
import {privateAxios, publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 기수 목록 조회
 */
export const getGenerations = async () => {
  try {
    const response = await publicAxios.get(ENDPOINT.GENERATIONS.LIST);
    return GenerationListSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 기수 추가 */
export const createGeneration = async (data: CreateGenerationRequest) => {
  try {
    await privateAxios.post(ENDPOINT.GENERATIONS.CREATE, data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 기수 상세 조회 */
export const getGenerationDetail = async (generationId: number) => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.GENERATIONS.DETAIL(generationId)
    );
    return GenerationDetailSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 기수 수정 */
export const updateGeneration = async (
  generationId: number,
  data: UpdateGenerationRequest
) => {
  try {
    await privateAxios.patch(ENDPOINT.GENERATIONS.UPDATE(generationId), data);
  } catch (error) {
    return handleApiError(error);
  }
};
