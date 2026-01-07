'use client';

import {useEffect, ReactNode, useRef} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {useRouter} from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * 인증이 필요한 페이지를 보호하는 컴포넌트
 *
 * 기능:
 * - 로그인하지 않은 사용자가 접근 시 alert 표시 후 메인 페이지로 리다이렉트
 * - URL 직접 입력, 북마크, 링크 공유 등 모든 접근 방식 차단
 * - React Strict Mode에서도 alert가 1번만 표시됨
 *
 * 사용법:
 * export default function ApplyPage() {
 *   return (
 *     <ProtectedRoute>
 *       // contents
 *     </ProtectedRoute>
 *   );
 * }
 */
export function ProtectedRoute({children}: ProtectedRouteProps) {
  const router = useRouter();
  const {isAuthenticated} = useAuthStore();
  const hasShownAlert = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownAlert.current) {
      hasShownAlert.current = true;
      alert('로그인 후 이용할 수 있는 서비스입니다.');
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
