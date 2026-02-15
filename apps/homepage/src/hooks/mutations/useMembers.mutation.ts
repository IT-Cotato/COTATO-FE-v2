import {useMutation} from '@tanstack/react-query';
import {
  updatePasswordApi,
  verifyPasswordApi,
} from '@/services/api/members/members.api';

/**
 * 현재 비밀번호 확인 Mutation
 */
export const useVerifyPasswordMutation = () => {
  return useMutation({
    mutationFn: (password: string) => verifyPasswordApi(password),
  });
};

/**
 * 비밀번호 변경 Mutation
 */
export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: (password: string) => updatePasswordApi(password),
    onSuccess: () => {
      console.log('비밀번호가 성공적으로 변경되었습니다.');
    },
    onError: () => {
      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
