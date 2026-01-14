import {
  GetAdminApplicationsParamsType,
  GetAdminApplicationsResponse,
  GetAdminApplicationsResponseSchema,
} from '@/schemas/admin/admin-applications-schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {ErrorResponseSchema} from '@/schemas/common/common-schema';
import axios from 'axios';
import qs from 'qs';

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
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      const parsed = ErrorResponseSchema.safeParse(data);
      if (parsed.success) {
        throw parsed.data;
      }
    }

    throw new Error('알 수 없는 에러가 발생했습니다.');
  }
};
