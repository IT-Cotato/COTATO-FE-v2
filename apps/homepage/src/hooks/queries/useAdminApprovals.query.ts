import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  getApplicants,
  GetApplicantsParams,
} from '@/services/api/approvals/approvals.api';

export const useApplicantsQuery = (params: GetApplicantsParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.APPROVALS.LIST(params),
    queryFn: () => getApplicants(params),
    placeholderData: (prev) => prev,
  });
};
