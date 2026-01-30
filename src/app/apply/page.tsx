'use client';

import {Suspense, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {ApplyFormContainer} from '@/app/apply/_components/ApplyFormContainer';
import {ROUTES} from '@/constants/routes';
import {Spinner} from '@/components/ui/Spinner';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

/**
 * 지원서 작성 페이지
 *
 * 접근 제한:
 * - 로그인한 사용자만 접근 가능
 * - 미로그인 사용자는 alert 후 메인 페이지로 리다이렉트
 * - 반드시 ?id= 쿼리 파라미터가 있어야 접근 가능
 */
export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');

  useEffect(() => {
    if (!applicationId) {
      router.push(ROUTES.HOME);
    }
  }, [applicationId, router]);

  return (
    <ProtectedRoute>
      <SuspenseWrapper>
        <ApplyFormContainer />
      </SuspenseWrapper>
    </ProtectedRoute>
  );
}
