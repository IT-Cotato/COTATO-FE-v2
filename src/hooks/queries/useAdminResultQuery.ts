import {useQuery} from '@tanstack/react-query';
import {getAdminPassStatus} from '@/services/api/admin/admin.result.api';
import {QUERY_KEYS} from '@/constants/query-keys';

export const useAdminPassStatusQuery = (generation: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_RESULT(generation),
    queryFn: () => getAdminPassStatus(generation),
    enabled: !!generation,
  });
};
