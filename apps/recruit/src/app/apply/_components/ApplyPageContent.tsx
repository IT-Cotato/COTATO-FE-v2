'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {ApplyFormContainer} from '@/app/apply/_components/ApplyFormContainer';
import {ROUTES} from '@/constants/routes';
import {useApplicationStatusQuery} from '@/hooks/queries/useApply.query';
import {useAuthStore} from '@/store/useAuthStore';

/**
 * 지원서 작성 페이지 내부 컴포넌트
 */
export default function ApplyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');
  const {isAuthenticated} = useAuthStore();
  const {data: applicationStatus} = useApplicationStatusQuery(isAuthenticated);

  useEffect(() => {
    if (!applicationId) {
      router.push(ROUTES.HOME);
      return;
    }
    if (
      applicationStatus &&
      String(applicationStatus.applicationId) !== applicationId
    ) {
      router.push(ROUTES.HOME);
    }
  }, [applicationId, applicationStatus, router]);

  if (!isAuthenticated || !applicationId) {
    return null;
  }

  return <ApplyFormContainer />;
}
