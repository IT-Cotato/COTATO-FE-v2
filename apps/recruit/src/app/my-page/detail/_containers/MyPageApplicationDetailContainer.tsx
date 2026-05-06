'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {
  useMyApplicationBasicInfo,
  useMyApplicationEtcQuestions,
  useMyApplicationPartQuestions,
} from '@/hooks/queries/useMyPage.query';
import {BasicInfoView} from '@/components/application/BasicInfoView';
import {PartQuestionView} from '@/components/application/PartQuestionView';
import {EtcQuestionView} from '@/components/application/EtcQuestionView';
import {APPLICATIONS_PART_TABS} from '@/constants/admin/admin-applications';
import {useAdminApplicationPdfUrl} from '@/hooks/queries/useAdminApplication.query';
import {useApplicationStore} from '@/store/useApplicationStore';
import {useEffect} from 'react';
import {ROUTES} from '@/constants/routes';

export const MyPageApplicationDetailContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {selectedId: applicationId} = useApplicationStore();

  /** 지원서 ID가 없을 경우 마이페이지 메인으로 리다이렉트 */
  useEffect(() => {
    if (!applicationId) {
      router.replace(ROUTES.MYPAGE);
    }
  }, [applicationId, router]);

  const {data: basicInfo} = useMyApplicationBasicInfo(applicationId!);
  const {data: partQuestions} = useMyApplicationPartQuestions(applicationId!);
  const {data: etcQuestions} = useMyApplicationEtcQuestions(applicationId!);
  const {data: pdfFileKey} = useAdminApplicationPdfUrl(
    partQuestions?.data.pdfFileKey
  );

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
    <div className='mx-auto flex w-full max-w-275 flex-col gap-10 py-7.5 lg:py-10'>
      <div className='min-h-150 w-full rounded-[20px] lg:p-10'>
        {step === 1 && (
          <>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
            <BasicInfoView
              basicInfo={basicInfo.data}
              onNext={() => handleStepChange(2)}
            />
          </>
        )}

        {step === 2 && (
          <div className='flex flex-col gap-6'>
            <h3 className='text-h5 lg:text-h3 text-primary font-bold'>
              {APPLICATIONS_PART_TABS.find(
                (tab) => tab.value === basicInfo.data.applicationPartType
              )?.label ?? '-'}{' '}
              파트에 관한 질문입니다.
            </h3>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
            <PartQuestionView
              questionsWithAnswers={partQuestions.data.questionsWithAnswers}
              pdfFileUrl={partQuestions.data.pdfFileUrl}
              pdfFileKey={pdfFileKey}
              onPrev={() => handleStepChange(1)}
              onNext={() => handleStepChange(3)}
            />
          </div>
        )}

        {step === 3 && (
          <div className='flex flex-col gap-6'>
            <h3 className='text-h5 lg:text-h3 font-bold text-neutral-800'>
              기타 질문
            </h3>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
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
