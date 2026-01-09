'use client';

import {EtcQuestionView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/EtcQuestionView';
import {BasicInfoView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/BasicInfoView';
import {PartQuestionView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/PartQuestionView';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {mockApplicationDetail} from '@/mocks/mock-application-detail';
import {useRouter, useSearchParams} from 'next/navigation';

export const ApplicationDetailContainer = () => {
  const {basicInfo, partQuestionInfo, EtcQuestionInfo} = mockApplicationDetail;

  const searchParams = useSearchParams();
  const router = useRouter();

  const rawStep = Number(searchParams.get('step') ?? 1);
  const step = Math.min(Math.max(rawStep, 1), 3);

  const handleNext = () => {
    if (step < 3) router.push(`?step=${step + 1}`);
  };
  const handlePrev = () => {
    if (step > 1) router.push(`?step=${step - 1}`);
  };

  return (
    <div className='flex w-full flex-col gap-31.25'>
      <div className='flex justify-center'>
        <StepIndicator currentStep={step} totalSteps={3} />
      </div>

      {step === 1 && <BasicInfoView onNext={handleNext} data={basicInfo} />}

      {step === 2 && (
        <PartQuestionView
          onPrev={handlePrev}
          onNext={handleNext}
          data={partQuestionInfo}
        />
      )}
      {step === 3 && (
        <EtcQuestionView onPrev={handlePrev} data={EtcQuestionInfo} />
      )}
    </div>
  );
};
