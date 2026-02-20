import {QUERY_KEYS} from '@/constants/query-keys';
import {getAdminSessions, getSessionDetail} from '@/services/api/session/session.api';
import {useQuery} from '@tanstack/react-query';

export const useAdminSessionsQuery = (generationId?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.SESSIONS.ADMIN_LIST(generationId),
    queryFn: () => getAdminSessions(generationId),
  });
};

export const useSessionDetailQuery = (sessionId: number, enabled: boolean) => {
  return useQuery({
    queryKey: QUERY_KEYS.SESSIONS.DETAIL(sessionId),
    queryFn: () => getSessionDetail(sessionId),
    enabled: enabled && sessionId !== -1, 
  });
};