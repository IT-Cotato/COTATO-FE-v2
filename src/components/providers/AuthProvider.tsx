'use client';

import {useEffect, ReactNode} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {getMe} from '@/services/api/auth.api';
import {
  getRefreshToken,
  getAccessToken,
  clearAuthState,
} from '@/services/utils/tokenManager';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 인증 상태 관리 Provider
 *
 * 핵심 역할:
 * 1. 앱 시작/새 탭 오픈 시 localStorage의 토큰으로 Zustand 상태 복구
 * 2. 다른 탭에서 로그인/로그아웃 시 현재 탭의 Zustand 상태 동기화
 *
 * 참고:
 * - localStorage 자체는 모든 탭에서 자동 공유됨 (브라우저 기본 기능)
 * - 하지만 Zustand 같은 메모리 상태는 탭마다 독립적
 * - 이 Provider가 localStorage ↔ Zustand 동기화 담당
 */
export function AuthProvider({children}: AuthProviderProps) {
  const {setUser, setInitialized} = useAuthStore();

  useEffect(() => {
    /**
     * 초기 인증 상태 복구
     *
     * 시나리오:
     * - 새로고침
     * - 새 탭 오픈
     * - 브라우저 재시작 후 접속
     */
    const initializeAuth = async () => {
      const storedAccessToken = getAccessToken();
      const storedRefreshToken = getRefreshToken();

      if (!storedAccessToken || !storedRefreshToken) {
        setInitialized(true);
        return;
      }

      try {
        const userResponse = await getMe();
        setUser(userResponse);
      } catch (error) {
        console.error('[AuthProvider - Failed to initialize auth]', error);
        await clearAuthState();
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();

    /**
     * 탭 간 인증 상태 동기화
     *
     * localStorage는 모든 탭에서 자동 공유되지만,
     * Zustand 상태는 탭마다 독립적이므로 수동 동기화 필요
     *
     * 시나리오:
     * - 탭 A에서 로그인 → localStorage에 토큰 저장
     * - storage 이벤트 발생 → 탭 B 감지
     * - 탭 B가 getMe() 호출 → Zustand 상태 업데이트
     * - 탭 B도 로그인 UI로 변경
     */
    const handleStorageChange = async (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'refreshToken') {
        const hasTokens = getAccessToken() && getRefreshToken();

        if (!hasTokens) {
          await clearAuthState();
        } else if (e.key === 'accessToken' && e.newValue && !e.oldValue) {
          try {
            const userResponse = await getMe();
            setUser(userResponse);
          } catch (error) {
            console.error('[AuthProvider - Failed to sync login state]', error);
            await clearAuthState();
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setInitialized, setUser]);

  return <>{children}</>;
}
