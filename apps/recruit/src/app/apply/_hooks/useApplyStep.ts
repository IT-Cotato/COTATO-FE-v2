import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export const useApplyStep = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlStep = parseInt(searchParams.get('step') || '1');
  const [step, setStep] = useState(urlStep);

  useEffect(() => {
    setStep(urlStep);
  }, [urlStep]);

  const goToNextStep = (currentPart?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(step + 1));
    if (currentPart) {
      params.set('part', currentPart);
    }
    router.push(`/apply?${params.toString()}`);
  };

  const goToPrevStep = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(step - 1));
    if (step === 2) {
      params.delete('part');
    }
    router.push(`/apply?${params.toString()}`);
  };

  return {step, goToNextStep, goToPrevStep};
};
