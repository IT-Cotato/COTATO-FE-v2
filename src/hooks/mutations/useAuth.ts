'use client';

import {useMutation} from '@tanstack/react-query';
import {OAuthLoginRequest} from '@/services/types/auth.types';
import {useRouter} from 'next/navigation';
import {AxiosError} from 'axios';
import {useAuthStore} from '@/store/useAuthStore';
import {getMe, oauthLogin} from '@/services/api/auth.api';
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
