import {
  GetAdminApplicationsParamsType,
  GetAdminApplicationsResponse,
} from '@/schemas/admin/admin-applications-schema';
import {getAdminApplications} from '@/services/api/admin.application.api';
import {ErrorResponse} from '@/services/schemas/common.schema';
import {useQuery} from '@tanstack/react-query';

export const ADMIN_APPLICATIONS_QUERY_KEY = 'adminApplications';

export const useAdminApplicationsQuery = (
  filter: GetAdminApplicationsParamsType
) => {
  return useQuery<GetAdminApplicationsResponse, ErrorResponse>({
    queryKey: [ADMIN_APPLICATIONS_QUERY_KEY, filter],
    queryFn: () => getAdminApplications(filter),
    placeholderData: (previousData) => previousData,
  });
};
