import {useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {
  BasicInfoResponse,
  PartQuestionResponse,
} from '@/schemas/apply/apply-schema';

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

  useEffect(() => {
    if (!applicationId) return;

    /**
     * Step 2 진입 조건 검증
     * - 기본 정보(Step 1)의 모든 필수 필드가 서버에 저장되어 있어야 함
     * - 충족되지 않을 경우 Step 1로 리다이렉트
     */
    if (step >= 2 && isBasicInfoFetched) {
      const isStep1Complete =
        basicInfo?.name &&
        basicInfo?.gender &&
        basicInfo?.phoneNumber &&
        basicInfo?.birthDate &&
        basicInfo?.university &&
        basicInfo?.major &&
        basicInfo?.completedSemesters != null &&
        basicInfo?.applicationPartType;

      if (!isStep1Complete) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('step', '1');
        params.delete('part');
        router.replace(`/apply?${params.toString()}`);
        return;
      }
    }

    /**
     * Step 3 진입 조건 검증
     * - 파트 질문(Step 2)의 모든 텍스트 답변이 저장되어 있어야 함
     * - 마지막 질문(포트폴리오 등)은 제외
     * - 충족되지 않을 경우 Step 2로 리다이렉트
     */
    if (step >= 3 && isPartQuestionsFetched) {
      const questions = partQuestionsData?.questionsWithAnswers;
      const textQuestions = questions?.slice(0, -1);
      const isStep2Complete =
        textQuestions &&
        textQuestions.length > 0 &&
        textQuestions.every(
          (q) =>
            q.savedAnswer !== null && q.savedAnswer.content.trim().length > 0
        );

      if (!isStep2Complete) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('step', '2');
        if (basicInfo?.applicationPartType) {
          params.set('part', basicInfo.applicationPartType);
        }
        router.replace(`/apply?${params.toString()}`);
      }
    }
  }, [
    step,
    applicationId,
    isBasicInfoFetched,
    basicInfo,
    isPartQuestionsFetched,
    partQuestionsData,
    searchParams,
    router,
  ]);
};
