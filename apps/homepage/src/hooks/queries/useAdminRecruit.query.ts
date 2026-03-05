import {QUERY_KEYS} from '@/constants/query-keys';
import {getRecruitmentsStatus} from '@/services/api/admin/admin-recruit.api';
import {useQuery} from '@tanstack/react-query';

export const useRecruitmentsStatus = () => {
  return useQuery({
    queryKey: QUERY_KEYS.RECRUITMENTS.STATUS,
    queryFn: getRecruitmentsStatus,
    staleTime: 1000 * 60 * 5,
  });
};
