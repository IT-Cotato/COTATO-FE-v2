'use client';

import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {logout} from '@/services/api/auth.api';
import {resetAuthState} from '@/services/utils/authState';
import {broadcastAuthEvent} from '@/lib/authChannel';

/**
 * 로그아웃 Mutation Hook
 * 세션 쿠키는 서버가 삭제하므로, API 성공 여부와 관계없이 클라이언트 상태를 초기화한다.
 * (React Query 캐시 전체를 비워 다른 사용자 로그인 시 이전 데이터가 남지 않게 한다)
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onError: (error: AxiosError) => {
      console.error('[Logout API failed]', error);
    },
    onSettled: async () => {
      await resetAuthState();
      broadcastAuthEvent('logout');
    },
  });
};
