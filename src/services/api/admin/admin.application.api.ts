import {
  GetAdminApplicationsParamsType,
  GetAdminApplicationsResponse,
  GetAdminApplicationsResponseSchema,
} from '@/schemas/admin/admin-applications-schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import qs from 'qs';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 어드민 지원서 목록을 조회합니다.
 * @param params - 필터링, 정렬, 페이지네이션 옵션 (generationId, keyword, part, sort, passViewStatuses, page)
 * @returns 지원서 목록 응답 데이터
 */

export const getAdminApplications = async (
  params: GetAdminApplicationsParamsType
): Promise<GetAdminApplicationsResponse> => {
  try {
    const response = await privateAxios.get(ENDPOINT.ADMIN.APPLICATIONS, {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, {arrayFormat: 'repeat'}),
    });

    return GetAdminApplicationsResponseSchema.parse(response.data);
  } catch (error: unknown) {
    return handleApiError(error);
  }
};
