'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {ApplyFormContainer} from '@/app/apply/_components/ApplyFormContainer';
import {ROUTES} from '@/constants/routes';

/**
 * 지원서 작성 페이지 내부 컴포넌트
 */

export default function ApplyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');

  useEffect(() => {
    if (!applicationId) {
      router.push(ROUTES.HOME);
    }
  }, [applicationId, router]);

  return <ApplyFormContainer />;
}
