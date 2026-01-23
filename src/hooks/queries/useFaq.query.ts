import {QUERY_KEYS} from '@/constants/query-keys';
import {faqParametersType} from '@/schemas/faq/faq.schema';
import {getFaq} from '@/services/api/faq/faq.api';
import {useQuery} from '@tanstack/react-query';

export const useFaqQuery = (type: faqParametersType) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FAQ(type)],
    queryFn: () => getFaq(type),
  });
};
