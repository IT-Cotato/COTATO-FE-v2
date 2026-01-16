import {useQuery} from '@tanstack/react-query';
import {getAdminPassStatus} from '@/services/api/admin/admin.result.api';
import {QUERY_KEYS} from '@/constants/query-keys';

export const useAdminPassStatusQuery = (generationId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_RESULT(generationId),
    queryFn: () => getAdminPassStatus(generationId),
    enabled: !!generationId,
  });
};
