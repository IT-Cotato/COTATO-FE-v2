import {QUERY_KEYS} from '@/constants/query-keys';
import {getRecruitmentNotice} from '@/services/api/recruit/recruit.api';
import {useQuery} from '@tanstack/react-query';

export const useRecruitmentNoticeQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.RECRUITMENT_NOTICE],
    queryFn: getRecruitmentNotice,
  });
};
