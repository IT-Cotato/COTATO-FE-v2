import {QUERY_KEYS} from '@/constants/query-keys';
import {ROUTES} from '@/constants/routes';
import {JoinRequestType} from '@/schemas/auth/auth.schema';
import {
  joinApi,
  loginApi,
  logoutApi,
  passwordApi,
  sendSignUpCode,
  verifySignUpCode,
} from '@/services/api/auth/auth.api';
import {
  getMemberInfo,
  updatePasswordApi,
} from '@/services/api/members/members.api';
import {
  clearAuthState,
  getAccessToken,
  setAccessToken,
} from '@/services/utils/tokenManager';
import {useAuthStore} from '@/store/useAuthStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';

export const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);

      try {
        const userResponse = await queryClient.fetchQuery({
          queryKey: QUERY_KEYS.MEMBERS.INFO,
          queryFn: getMemberInfo,
        });
        setUser(userResponse);

        router.push(ROUTES.HOME);
      } catch (error) {
        console.error('[Failed to fetch user info]', error);
      }
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};

export const useJoinMutation = () => {
  return useMutation({
    mutationFn: (data: JoinRequestType) => joinApi(data),
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};

export const useAuthMutation = () => {
  // 코드 발송 Mutation
  const sendCodeMutation = useMutation({
    mutationFn: sendSignUpCode,
    onSuccess: () => alert('인증 코드가 발송되었습니다.'),
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });

  // 코드 확인 Mutation
  const verifyCodeMutation = useMutation({
    mutationFn: verifySignUpCode,
    onSuccess: () => alert('인증에 성공했습니다.'),
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });

  return {sendCodeMutation, verifyCodeMutation};
};

export const usePasswordMutation = () => {
  // 1. 코드 발송
  const sendResetCodeMutation = useMutation({
    mutationFn: passwordApi.sendResetCode,
    onSuccess: () => alert('비밀번호 재설정 코드가 발송되었습니다.'),
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });

  // 2. 코드 확인 (성공 시 accessToken 반환)
  const verifyResetCodeMutation = useMutation({
    mutationFn: passwordApi.verifyResetCode,
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (password: string) => updatePasswordApi(password),
    onSuccess: () => {
      console.log('Password reset successful');
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
  return {
    sendResetCodeMutation,
    verifyResetCodeMutation,
    resetPasswordMutation,
  };
};

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => {
      const token = getAccessToken() || '';
      return logoutApi(token);
    },
    onSuccess: () => {
      // 1. 로컬 스토리지 토큰 삭제
      clearAuthState();

      // 2. Zustand 전역 상태 초기화
      logout();

      // 3. TanStack Query 모든 캐시 무효화 (이전 사용자의 데이터 잔상 제거)
      queryClient.clear();

      router.replace(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      clearAuthState();
      logout();
      queryClient.clear();
      router.replace(ROUTES.HOME);
    },
  });
};
