'use client';

import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {useAuthStore} from '@/store/useAuthStore';
import {getMe, logout, oauthLogin} from '@/services/api/auth.api';
import {
  clearAuthState,
  setAccessToken,
  setRefreshToken,
} from '@/services/utils/tokenManager';
import {OAuthLoginRequest} from '@/services/schemas/auth.schema';

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
        console.error('[Failed to fetch user info]', error);
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
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await clearAuthState();
    },
    onError: async (error: AxiosError) => {
      console.error('[Logout API failed]', error);
    },
  });
};
