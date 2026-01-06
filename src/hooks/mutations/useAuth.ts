'use client';

import {useMutation} from '@tanstack/react-query';
import {OAuthLoginRequest} from '@/services/types/auth.types';
import {AxiosError} from 'axios';
import {oauthLogin} from '@/services/api/auth.api';
import {setAccessToken, setRefreshToken} from '@/services/utils/tokenManager';

/**
 * OAuth 로그인 Mutation Hook
 */
export const useOAuthLogin = () => {
  return useMutation({
    mutationFn: (request: OAuthLoginRequest) => oauthLogin(request),
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    onError: (error: AxiosError) => {
      console.error('[Login failed]', error);
    },
  });
};
