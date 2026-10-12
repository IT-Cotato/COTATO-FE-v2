'use client';

import {useEffect, ReactNode} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {getMe} from '@/services/api/auth.api';
import {removeLegacyTokens, resetAuthState} from '@/services/utils/authState';
import {broadcastAuthEvent, subscribeAuthEvent} from '@/lib/authChannel';
import {LOGIN_ERROR, LOGIN_ERROR_PARAM, LoginError} from '@/lib/auth/constants';

interface AuthProviderProps {
  children: ReactNode;
}

const LOGIN_ERROR_MESSAGES: Record<LoginError, string> = {
  [LOGIN_ERROR.STATE]: '잘못된 요청입니다. 처음부터 다시 시도해주세요.',
  [LOGIN_ERROR.OAUTH]: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
  [LOGIN_ERROR.CODE]: '인증 코드를 찾을 수 없습니다.',
  [LOGIN_ERROR.LOGIN]: '로그인에 실패했습니다. 다시 시도해주세요.',
};

/** OAuth 콜백(서버)이 실패 사유를 쿼리로 넘기면 알림 후 URL에서 제거한다. */
const notifyLoginError = () => {
  const url = new URL(window.location.href);
  const error = url.searchParams.get(LOGIN_ERROR_PARAM) as LoginError | null;
  if (!error) return;

  url.searchParams.delete(LOGIN_ERROR_PARAM);
  window.history.replaceState(window.history.state, '', url);
  alert(LOGIN_ERROR_MESSAGES[error] ?? LOGIN_ERROR_MESSAGES.login);
};

/**
 * 인증 상태 관리 Provider
 *
 * 토큰은 HttpOnly 쿠키로 서버(BFF)만 다루므로, 클라이언트는 토큰을 저장하거나 읽지 않는다.
 * OAuth 콜백이 리다이렉트 응답에서 쿠키를 설정한 뒤 페이지가 로드되므로,
 * 이 Provider가 초기화되는 시점에는 이미 세션이 확정되어 있다.
 *
 * 핵심 역할:
 * 1. 앱 시작/새 탭 오픈 시 /api/auth/me로 Zustand 사용자 상태 복구
 * 2. 다른 탭의 로그인/로그아웃을 BroadcastChannel로 받아 현재 탭 상태 동기화
 */
export const AuthProvider = ({children}: AuthProviderProps) => {
  const {setUser, setInitialized} = useAuthStore();

  useEffect(() => {
    removeLegacyTokens();
    notifyLoginError();

    const initializeAuth = async () => {
      try {
        const userResponse = await getMe();
        setUser(userResponse);
        broadcastAuthEvent('login');
      } catch {
        // 비로그인 상태 (세션 쿠키가 없거나 만료됨)
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();

    return subscribeAuthEvent(async (event) => {
      if (event === 'logout') {
        if (useAuthStore.getState().isAuthenticated) await resetAuthState();
        return;
      }

      if (!useAuthStore.getState().isAuthenticated) {
        try {
          setUser(await getMe());
        } catch (error) {
          console.error('[AuthProvider - Sync failed]', error);
        }
      }
    });
  }, [setInitialized, setUser]);

  return <>{children}</>;
};
