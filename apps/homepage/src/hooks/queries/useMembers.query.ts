import {QUERY_KEYS} from '@/constants/query-keys';
import {getMemberInfo} from '@/services/api/members/members.api';
import {useQuery} from '@tanstack/react-query';

export const useMemberInfoQuery = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: QUERY_KEYS.MEMBERS.INFO,
    queryFn: getMemberInfo,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
};
