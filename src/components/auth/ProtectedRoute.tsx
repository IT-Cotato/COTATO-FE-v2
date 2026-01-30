'use client';

import {useEffect, ReactNode, useRef} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {useRouter} from 'next/navigation';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'STAFF' | 'APPLICANT';
  requireRecruiting?: boolean;
}

/**
 * url 직접 접근 관리가 필요한 페이지를 보호하는 컴포넌트
 * - 인증
 * - 모집 활성화 여부
 *
 * 기능:
 * - 로그인하지 않은 사용자가 접근 시 alert 표시 후 메인 페이지로 리다이렉트
 * - URL 직접 입력, 북마크, 링크 공유 등 모든 접근 방식 차단
 * - React Strict Mode에서도 alert가 1번만 표시됨
 * - requireRole 지정 시 해당 role이 아니면 접근 차단
 * - requireRecruiting 지정 시 모집 활성화 상태가 아니라면 접근 차단
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
 *
 * // 모집 활성화 상태가 true일 때만 접근 가능
 * <ProtectedRoute requireRecruiting={true}>
 *   {children}
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  children,
  requireRole,
  requireRecruiting = false,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const {data: recruitmentStatus, isLoading: isRecruitmentStatusLoading} =
    useRecruitmentStatusQuery();
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

  if (isRecruitmentStatusLoading) {
    return null;
  }

  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  if (requireRole && user?.role !== requireRole) {
    return null;
  }

  if (requireRecruiting && !recruitmentStatus!.data.isActive) {
    router.back();
    return null;
  }

  return <>{children}</>;
};
