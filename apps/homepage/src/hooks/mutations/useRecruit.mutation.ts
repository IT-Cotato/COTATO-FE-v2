import {subscribeEmail} from '@/services/api/recruit/recruit.api';
import {useMutation} from '@tanstack/react-query';

export const useSubscribeRecruitmentNotify = () => {
  return useMutation({
    mutationFn: (email: string) => subscribeEmail({email: email.trim()}),
    onError: () => {
      alert('이메일 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
