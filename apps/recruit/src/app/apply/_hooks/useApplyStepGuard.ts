import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {
  BasicInfoResponse,
  PartQuestionResponse,
} from '@/schemas/apply/apply-schema';

const isStep1Complete = (basicInfo?: BasicInfoResponse) => {
  return !!(
    basicInfo?.name &&
    basicInfo?.gender &&
    basicInfo?.phoneNumber &&
    basicInfo?.birthDate &&
    basicInfo?.university &&
    basicInfo?.major &&
    basicInfo?.completedSemesters != null &&
    basicInfo?.applicationPartType
  );
};

const isStep2Complete = (partQuestionsData?: PartQuestionResponse) => {
  const textQuestions = partQuestionsData?.questionsWithAnswers?.slice(0, -1);

  return !!(
    textQuestions &&
    textQuestions.length > 0 &&
    textQuestions.every(
      (q) => q.savedAnswer !== null && q.savedAnswer.content.trim().length > 0
    )
  );
};

const redirectToStep = (
  searchParams: URLSearchParams,
  router: ReturnType<typeof useRouter>,
  step: '1' | '2',
  part?: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('step', step);

  if (step === '1') {
    params.delete('part');
  } else if (part) {
    params.set('part', part);
  }

  router.replace(`/apply?${params.toString()}`);
};

interface UseApplyStepGuardProps {
  step: number;
  applicationId: string | null;
  basicInfo?: BasicInfoResponse;
  isBasicInfoFetched: boolean;
  partQuestionsData?: PartQuestionResponse;
  isPartQuestionsFetched: boolean;
}

/**
 * 지원서 단계별 접근 제어 (Step Guard) 훅
 * - 이전 단계 완료 여부를 확인하여 건너뛰기 방지
 * - 완료되지 않은 경우 이전 단계로 리다이렉트
 * - isGuardReady: guard 판단이 끝났으면 true (로딩 중엔 false)
 */
export const useApplyStepGuard = ({
  step,
  applicationId,
  basicInfo,
  isBasicInfoFetched,
  partQuestionsData,
  isPartQuestionsFetched,
}: UseApplyStepGuardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step1Complete = isStep1Complete(basicInfo);
  const step2Complete = isStep2Complete(partQuestionsData);
  const step1Ready = isBasicInfoFetched && step1Complete;
  const step2Ready = isPartQuestionsFetched && step2Complete;

  const isGuardReady =
    !applicationId ||
    step <= 1 ||
    (step === 2 && step1Ready) ||
    (step >= 3 && step1Ready && step2Ready);

  useEffect(() => {
    if (!applicationId) return;

    if (step >= 2 && isBasicInfoFetched && !step1Complete) {
      redirectToStep(searchParams, router, '1');
      return;
    }

    if (step >= 3 && isPartQuestionsFetched && !step2Complete) {
      redirectToStep(searchParams, router, '2', basicInfo?.applicationPartType);
    }
  }, [
    step,
    applicationId,
    isBasicInfoFetched,
    basicInfo,
    isPartQuestionsFetched,
    partQuestionsData,
    step1Complete,
    step2Complete,
    searchParams,
    router,
  ]);

  return {isGuardReady};
};
