'use client';

import {useRouter} from 'next/navigation';
import {useAuthStore} from '@/store/useAuthStore';
import {useApplicationStatusQuery} from '@/hooks/queries/useApply.query';
import {useStartApplicationMutation} from '@/hooks/mutations/useApply.mutation';
import {useRecruitmentScheduleQuery} from '@/hooks/queries/useRecruitmentSchedule.query';
import {buildRecruitmentNotices} from '@/constants/home/recruitment';
import {ROUTES} from '@/constants/routes';

interface UseRecruitmentApplyOptions {
  onLoginRequired: () => void;
}

export function useRecruitmentApply({
  onLoginRequired,
}: UseRecruitmentApplyOptions) {
  const router = useRouter();
  const {isAuthenticated} = useAuthStore();

  const {data: applicationStatus, isLoading: isStatusLoading} =
    useApplicationStatusQuery(isAuthenticated);
  const {mutate: startApplication, isPending: isStarting} =
    useStartApplicationMutation();
  const {
    data: schedule,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
  } = useRecruitmentScheduleQuery();

  const hasSubmitted = applicationStatus?.isSubmitted ?? false;

  const now = new Date();
  const start = schedule?.recruitmentStart
    ? new Date(schedule.recruitmentStart)
    : null;
  const end = schedule?.recruitmentEnd
    ? new Date(schedule.recruitmentEnd)
    : null;

  const isBeforeStart = start != null && now < start;
  const isAfterEnd = end != null && now > end;
  const isInPeriod = start != null && end != null && now >= start && now <= end;

  const notices = buildRecruitmentNotices(schedule);

  const handleApplyClick = () => {
    if (!isInPeriod) {
      if (isBeforeStart) {
        alert('아직 모집 기간이 아닙니다.');
      } else if (isAfterEnd) {
        alert('모집이 마감되었습니다.');
      }
      return;
    }

    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }

    if (applicationStatus) {
      router.push(`${ROUTES.APPLY}?id=${applicationStatus.applicationId}`);
    } else {
      startApplication(undefined, {
        onSuccess: (data) => {
          if (!data.applicationId || data.isSubmitted) {
            alert('이미 제출된 지원서가 있습니다.');
            return;
          }
          router.push(`${ROUTES.APPLY}?id=${data.applicationId}`);
        },
        onError: () => {
          alert('지원서 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      });
    }
  };

  return {
    notices,
    hasSubmitted,
    isStarting,
    isStatusLoading,
    isScheduleLoading,
    isScheduleError,
    isInPeriod,
    isBeforeStart,
    isAfterEnd,
    handleApplyClick,
  };
}
