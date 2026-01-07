'use client';

import {useEffect, ReactNode, useRef} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {useRouter} from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'STAFF' | 'APPLICANT';
}

/**
 * 인증이 필요한 페이지를 보호하는 컴포넌트
 *
 * 기능:
 * - 로그인하지 않은 사용자가 접근 시 alert 표시 후 메인 페이지로 리다이렉트
 * - URL 직접 입력, 북마크, 링크 공유 등 모든 접근 방식 차단
 * - React Strict Mode에서도 alert가 1번만 표시됨
 * - requireRole 지정 시 해당 role이 아니면 접근 차단
 *
 * 사용법:
 * // 로그인만 필요
 * <ProtectedRoute>
 *   {children}
 * </ProtectedRoute>
 *
 * // STAFF role 필요
 * <ProtectedRoute requireRole="STAFF">
 *   {children}
 * </ProtectedRoute>
 */
export function ProtectedRoute({children, requireRole}: ProtectedRouteProps) {
  const router = useRouter();
  const {isAuthenticated, user, isInitialized} = useAuthStore();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('로그인 후 이용할 수 있는 서비스입니다.');
        router.push('/');
      }
      return;
    }

    if (requireRole && user?.role !== requireRole) {
      if (!hasShownAlert.current) {
        hasShownAlert.current = true;
        alert('접근 권한이 없습니다.');
        router.push('/');
      }
    }
  }, [isAuthenticated, isInitialized, requireRole, router, user?.role]);

  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  if (requireRole && user?.role !== requireRole) {
    return null;
  }

  return <>{children}</>;
}
