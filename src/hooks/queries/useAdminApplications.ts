import {GetAdminApplicationsParamsType} from '@/schemas/admin/admin-applications-schema';
import {getAdminApplications} from '@/services/api/admin.application.api';
import {useQuery} from '@tanstack/react-query';

export const ADMIN_APPLICATIONS_QUERY_KEY = 'adminApplications';

export const useAdminApplications = (
  filter: GetAdminApplicationsParamsType
) => {
  return useQuery({
    queryKey: [ADMIN_APPLICATIONS_QUERY_KEY, filter],
    queryFn: () => getAdminApplications(filter),

    placeholderData: (previousData) => previousData,
  });
};
