import {QUERY_KEYS} from '@/constants/query-keys';
import {getAdminSessions} from '@/services/api/session/session.api';
import {useQuery} from '@tanstack/react-query';

export const useAdminSessionsQuery = (generationId?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.SESSIONS.ADMIN_LIST(generationId),
    queryFn: () => getAdminSessions(generationId),
  });
};