import {useMutation} from '@tanstack/react-query';
import {
  deactivateMemberApi,
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

/**
 * 회원 탈퇴 Mutation
 */
export const useDeactivateMemberMutation = () => {
  return useMutation({
    mutationFn: ({
      memberId,
      leavingPolicyAgreed,
    }: {
      memberId: number;
      leavingPolicyAgreed: boolean;
    }) => deactivateMemberApi(memberId, leavingPolicyAgreed),
    onSuccess: () => {
      console.log('회원 탈퇴 처리가 완료되었습니다.');
    },
    onError: () => {
      alert('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
