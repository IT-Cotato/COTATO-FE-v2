'use client';

import {useParams, useRouter, useSearchParams} from 'next/navigation';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {
  useMyApplicationBasicInfo,
  useMyApplicationEtcQuestions,
  useMyApplicationPartQuestions,
} from '@/hooks/queries/useMyPage.query';
import {BasicInfoView} from '@/components/application/BasicInfoView';
import {PartQuestionView} from '@/components/application/PartQuestionView';
import {EtcQuestionView} from '@/components/application/EtcQuestionView';

export const MyPageApplicationDetailContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {id} = useParams<{id: string}>();
  const applicationId = Number(id);

  const {data: basicInfo} = useMyApplicationBasicInfo(applicationId);
  const {data: partQuestions} = useMyApplicationPartQuestions(applicationId);
  const {data: etcQuestions} = useMyApplicationEtcQuestions(applicationId);

  const rawStep = Number(searchParams.get('step') ?? 1);
  const step = Math.min(Math.max(rawStep, 1), 3);

  const handleStepChange = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(newStep));
    router.push(`?${params.toString()}`);
  };

  if (Number.isNaN(applicationId)) {
    return (
      <p className='text-h3 text-alert text-center'>잘못된 지원서 ID입니다.</p>
    );
  }

  if (!basicInfo || !partQuestions || !etcQuestions) return null;

  return (
    <div className='mx-auto flex max-w-[1100px] flex-col gap-10 py-10'>
      <div className='flex justify-center'>
        <StepIndicator currentStep={step} totalSteps={3} />
      </div>

      <div className='min-h-[600px] rounded-[20px] p-10'>
        {step === 1 && (
          <BasicInfoView
            basicInfo={basicInfo.data}
            onNext={() => handleStepChange(2)}
          />
        )}

        {step === 2 && (
          <div className='flex flex-col gap-6'>
            <h3 className='text-h3 text-primary font-bold'>파트 질문 답변</h3>
            <PartQuestionView
              questionsWithAnswers={partQuestions.data.questionsWithAnswers}
              pdfFileUrl={partQuestions.data.pdfFileUrl}
              pdfFileKey={partQuestions.data.pdfFileUrl}
              onPrev={() => handleStepChange(1)}
              onNext={() => handleStepChange(3)}
            />
          </div>
        )}

        {step === 3 && (
          <div className='flex flex-col gap-6'>
            <h3 className='text-h3 font-bold text-neutral-800'>기타 질문</h3>
            <EtcQuestionView
              etcQuestions={etcQuestions.data}
              onPrev={() => handleStepChange(2)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
