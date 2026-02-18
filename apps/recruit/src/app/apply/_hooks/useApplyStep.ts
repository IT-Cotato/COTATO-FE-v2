import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

/**
 * 지원서 단계(Step) 및 URL 파라미터 관리 훅
 */
export const useApplyStep = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlStep = parseInt(searchParams.get('step') || '1');
  const [step, setStep] = useState(urlStep);

  useEffect(() => {
    setStep(urlStep);
  }, [urlStep]);

  /**
   * 다음 단계로 이동
   * @param currentPart 선택된 파트 (Step 1에서 이동 시 필요)
   */
  const goToNextStep = (currentPart?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(step + 1));
    if (currentPart) {
      params.set('part', currentPart);
    }
    router.push(`/apply?${params.toString()}`);
  };

  /**
   * 이전 단계로 이동
   */
  const goToPrevStep = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (step <= 1) return;
    params.set('step', String(step - 1));
    if (step === 2) {
      params.delete('part');
    }
    router.push(`/apply?${params.toString()}`);
  };

  return {step, goToNextStep, goToPrevStep};
};
