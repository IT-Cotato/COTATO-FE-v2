'use client';

import {AdminApplicationEvaluationContainer} from '@/app/admin/(no-sidebar)/applications/[id]/_containers/AdminApplicationEvaluationContainer';
import {AdminApplicationHeader} from '@/app/admin/(no-sidebar)/applications/[id]/_components/AdminApplicationHeader';
import {BasicInfoView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/BasicInfoView';
import {EtcQuestionView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/EtcQuestionView';
import {PartQuestionView} from '@/app/admin/(no-sidebar)/applications/[id]/_components/PartQuestionView';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {
  useAdminApplicationBasicInfo,
  useAdminApplicationEtcQuestions,
  useAdminApplicationPartQuestions,
  useAdminApplicationPdfUrl,
} from '@/hooks/queries/useAdminApplication.query';
import {useParams, useRouter, useSearchParams} from 'next/navigation';
import {APPLICATIONS_PART_TABS} from '@/constants/admin/admin-applications';

export const AdminApplicationContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {id} = useParams<{id: string}>();
  const applicationId = Number(id);

  const generationId = searchParams.get('generationId');

  const {data: basicInfo} = useAdminApplicationBasicInfo(applicationId);
  const {data: partQuestions} = useAdminApplicationPartQuestions(applicationId);
  const {data: etcQuestions} = useAdminApplicationEtcQuestions(applicationId);
  const {data: pdfFileUrl} = useAdminApplicationPdfUrl(
    partQuestions?.data.pdfFileKey
  );

  const rawStep = Number(searchParams.get('step') ?? 1);
  const step = Math.min(Math.max(rawStep, 1), 3);

  const handleNext = () => {
    if (step < 3) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', String(step + 1));
      router.push(`?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', String(step - 1));
      router.push(`?${params.toString()}`);
    }
  };

  if (Number.isNaN(applicationId)) {
    return (
      <p className='text-h3 text-alert text-center'>잘못된 지원서 ID입니다.</p>
    );
  }

  if (!basicInfo || !partQuestions || !etcQuestions) return null;

  return (
    <>
      <AdminApplicationHeader
        generation={generationId}
        basicInfo={basicInfo.data}
      />

      <AdminApplicationEvaluationContainer applicationId={applicationId} />

      <div className='flex w-full flex-col gap-5'>
        {step === 1 && (
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
            <BasicInfoView onNext={handleNext} basicInfo={basicInfo.data} />
          </div>
        )}

        {step === 2 && (
          <div className='flex flex-col gap-4'>
            <label className='text-h3 text-primary font-bold'>
              {APPLICATIONS_PART_TABS.find(
                (tab) => tab.value === basicInfo.data.applicationPartType
              )?.label ?? '-'}{' '}
              파트에 관한 질문입니다.
            </label>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
            <PartQuestionView
              onPrev={handlePrev}
              onNext={handleNext}
              questionsWithAnswers={partQuestions.data.questionsWithAnswers}
              pdfFileUrl={pdfFileUrl}
            />
          </div>
        )}

        {step === 3 && (
          <div className='flex flex-col gap-4'>
            <label className='text-h3 font-bold text-neutral-800'>
              기타 질문
            </label>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
            <EtcQuestionView
              onPrev={handlePrev}
              etcQuestions={etcQuestions.data}
            />
          </div>
        )}
      </div>
    </>
  );
};
