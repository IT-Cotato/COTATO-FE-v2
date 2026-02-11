'use client';

import {useEffect, ReactNode, useRef} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {useRouter} from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'ADMIN' | 'MEMBER';
}

export const ProtectedRoute = ({
  children,
  requireRole,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const {isAuthenticated, user, isInitialized} = useAuthStore();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    if (!isInitialized) return;

    // 1. 미인증 사용자 처리
    if (!isAuthenticated) {
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('로그인 후 이용할 수 있는 서비스입니다.');
        router.push('/');
      }
      return;
    }

    // 2. 관리자 권한 체크 (requireRole이 'ADMIN'인 경우)
    if (requireRole === 'ADMIN' && user?.isAdmin !== true) {
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('관리자만 접근 가능한 페이지입니다.');
        router.replace('/');
      }
    }
  }, [isAuthenticated, isInitialized, requireRole, router, user?.isAdmin]);

  // 초기 로딩 중에는 아무것도 보여주지 않음
  if (!isInitialized) return null;

  // 권한 체크 로직
  if (!isAuthenticated) return null;

  // 관리자 권한이 필요한데 사용자가 관리자가 아닌 경우 children을 보여주지 않음
  if (requireRole === 'ADMIN' && user?.isAdmin !== true) {
    return null;
  }

  return <>{children}</>;
};
