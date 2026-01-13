import {
  GetAdminApplicationsParamsType,
  GetAdminApplicationsResponse,
  GetAdminApplicationsResponseSchema,
} from '@/schemas/admin/admin-applications-schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import qs from 'qs';

/**
 *
 * @param params 지원서 목록 조회 get 함수
 * @returns
 */
export const getAdminApplications = async (
  params: GetAdminApplicationsParamsType
): Promise<GetAdminApplicationsResponse> => {
  const response = await privateAxios.get(ENDPOINT.ADMIN.APPLICATIONS, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: 'repeat',
      }),
  });

  return GetAdminApplicationsResponseSchema.parse(response.data);
};
