import {postRecruitmentNotify} from '@/services/api/recruitment/recruitment.api';
import {useMutation} from '@tanstack/react-query';

export const useSubscribeRecruitmentNotify = () => {
  return useMutation({
    mutationFn: postRecruitmentNotify,
  });
};
