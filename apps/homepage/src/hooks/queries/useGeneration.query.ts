import {QUERY_KEYS} from '@/constants/query-keys';
import {getGenerations} from '@/services/api/generation/generation.api';
import {useQuery} from '@tanstack/react-query';

export const useGenerationQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GENERATIONS,
    queryFn: getGenerations,
  });
};
