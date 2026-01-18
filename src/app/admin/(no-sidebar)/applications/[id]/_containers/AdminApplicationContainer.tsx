'use client';

import {AdminReviewTabs} from '@/app/admin/(no-sidebar)/applications/[id]/_components/AdminReviewTabs';
import {AdminApplicationHeader} from '@/app/admin/(no-sidebar)/applications/[id]/_components/AdminApplicationHeader';
import {BasicInfoView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/BasicInfoView';
import {EtcQuestionView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/EtcQuestionView';
import {PartQuestionView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/PartQuestionView';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {
  useAdminApplicationBasicInfo,
  useAdminApplicationEtcQuestions,
  useAdminApplicationPartQuestions,
} from '@/hooks/queries/useAdminApplication.query';
import {useParams, useRouter, useSearchParams} from 'next/navigation';

export const AdminApplicationContainer = () => {
  const {id} = useParams<{id: string}>();
  const applicationId = Number(id);

  const generation = '13'; // TODO: 전역 상태 로직으로 변경

  const {data: basicInfo} = useAdminApplicationBasicInfo(applicationId);
  const {data: partQuestions} = useAdminApplicationPartQuestions(applicationId);
  const {data: etcQuestions} = useAdminApplicationEtcQuestions(applicationId);

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

  if (!basicInfo || !partQuestions || !etcQuestions) return null;

  return (
    <>
      <AdminApplicationHeader
        generation={generation}
        basicInfo={basicInfo.data}
      />

      <AdminReviewTabs />

      <div className='flex w-full flex-col gap-31.25'>
        <div className='flex justify-center'>
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>

        {step === 1 && (
          <BasicInfoView onNext={handleNext} basicInfo={basicInfo.data} />
        )}

        {step === 2 && (
          <PartQuestionView
            onPrev={handlePrev}
            onNext={handleNext}
            selectedPart={basicInfo.data.applicationPartType}
            questionsWithAnswers={partQuestions.data.questionsWithAnswers}
            pdfFileUrl={partQuestions.data.pdfFileUrl}
          />
        )}
        {step === 3 && (
          <EtcQuestionView
            onPrev={handlePrev}
            etcQuestions={etcQuestions.data}
          />
        )}
      </div>
    </>
  );
};
