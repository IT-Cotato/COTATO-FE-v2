import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {AdminPassStatusResponseSchema} from '@/schemas/admin/admin-result-schema';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 합격자 관리 조회 API
 */
export const getAdminPassStatus = async (generationId: string) => {
  try {
    const response = await privateAxios.get(ENDPOINT.ADMIN.PASS_STATUS, {
      params: {generationId: Number(generationId)},
    });
    return AdminPassStatusResponseSchema.parse(response.data).data;
  } catch (error) {
    return handleApiError(error);
  }
};
