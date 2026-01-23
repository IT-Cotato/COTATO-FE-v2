import {AdminPassStatusResponseSchema} from '@/schemas/admin/admin-result.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 합격자 관리 조회 API
 */
export const getAdminPassStatus = async (generationId: string) => {
  try {
    const genId = Number(generationId);
    if (!Number.isInteger(genId) || genId < 0) {
      throw new Error('유효하지 않은 기수 번호입니다.');
    }
    const response = await privateAxios.get(ENDPOINT.ADMIN.PASS_STATUS, {
      params: {generationId: genId},
    });
    return AdminPassStatusResponseSchema.parse(response.data).data;
  } catch (error) {
    return handleApiError(error);
  }
};
