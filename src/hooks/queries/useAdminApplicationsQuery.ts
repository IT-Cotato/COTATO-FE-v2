import {QUERY_KEYS} from '@/constants/query-keys';
import {
  GetAdminApplicationsParamsType,
  GetAdminApplicationsResponse,
} from '@/schemas/admin/admin-applications-schema';
import {getAdminApplications} from '@/services/api/admin/admin.application.api';
import {ErrorResponse} from '@/services/schemas/common.schema';
import {useQuery} from '@tanstack/react-query';

export const useAdminApplicationsQuery = (
  filter: GetAdminApplicationsParamsType
) => {
  return useQuery<GetAdminApplicationsResponse, ErrorResponse>({
    queryKey: [QUERY_KEYS.ADMIN_APPLICATION, filter],
    queryFn: () => getAdminApplications(filter),
    placeholderData: (previousData) => previousData,
  });
};
