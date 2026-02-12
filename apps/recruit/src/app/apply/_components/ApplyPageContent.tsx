'use client';

import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {ApplyFormContainer} from '@/app/apply/_components/ApplyFormContainer';
import {ROUTES} from '@/constants/routes';
import {useApplicationStatusQuery} from '@/hooks/queries/useApply.query';
import {useAuthStore} from '@/store/useAuthStore';
import {useRecruitmentScheduleQuery} from '@/hooks/queries/useRecruitmentSchedule.query';

/**
 * 지원서 작성 페이지 내부 컴포넌트
 */
export default function ApplyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');
  const {isAuthenticated} = useAuthStore();
  const {data: applicationStatus} = useApplicationStatusQuery(isAuthenticated);
  const {data: schedule} = useRecruitmentScheduleQuery();

  // 모집 기간 체크 및 리다이렉트
  useEffect(() => {
    if (!schedule) return;

    const checkPeriod = () => {
      if (!schedule.recruitmentStart || !schedule.recruitmentEnd) return;

      const now = new Date();
      const start = new Date(schedule.recruitmentStart);
      const end = new Date(schedule.recruitmentEnd);

      const isInPeriod = now >= start && now <= end;

      if (!isInPeriod) {
        alert('모집 기간이 아닙니다.');
        router.push(ROUTES.HOME);
      }
    };

    // 초기 체크
    checkPeriod();

    // 5분마다 체크
    const interval = setInterval(checkPeriod, 300000);

    return () => clearInterval(interval);
  }, [schedule, router]);

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
