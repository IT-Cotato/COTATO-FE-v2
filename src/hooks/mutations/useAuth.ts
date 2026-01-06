'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {OAuthLoginRequest} from '@/services/types/auth.types';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {useAuthStore} from '@/store/useAuthStore';
import {getMe, logout, oauthLogin} from '@/services/api/auth.api';
import {
  clearTokens,
  setAccessToken,
  setRefreshToken,
} from '@/services/utils/tokenManager';

/**
 * OAuth 로그인 Mutation Hook
 */
export const useOAuthLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (request: OAuthLoginRequest) => oauthLogin(request),
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      try {
        const userResponse = await getMe();
        setUser(userResponse);

        router.push('/');
      } catch (error) {
        console.error('[Failed to fetch user info]:', error);
        clearTokens();
      }
    },
    onError: (error: AxiosError) => {
      console.error('[Login failed]', error);
    },
  });
};

/**
 * 로그아웃 Mutation Hook
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authLogout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. 토큰 삭제
      clearTokens();

      // 2. React Query 캐시 클리어
      queryClient.clear();

      // 3. Zustand 상태 초기화
      authLogout();

      // 4. 기본 페이지로 이동
      router.push('/');
    },
    onError: (error: AxiosError) => {
      console.error('[Logout API failed]', error);

      // 로그아웃 API 실패해도 클라이언트 정리
      clearTokens();
      queryClient.clear();
      authLogout();
      router.push('/');
    },
  });
};
