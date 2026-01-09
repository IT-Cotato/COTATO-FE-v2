'use client';

import {useEffect} from 'react';
import {FormProvider} from 'react-hook-form';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {BasicInfo} from '@/app/apply/_components/BasicInfo';
import {PartQuestion} from '@/app/apply/_components/PartQuestion';
import {AdditionalInfo} from '@/app/apply/_components/AdditionalInfo';
import {useApplyFormController} from '@/app/apply/_hooks/useApplyFormController';
import {useScrollToTop} from '@/hooks/useScrollToTop';
import {ApplicationConfirmModal} from '@/components/modal/ApplicationConfirmModal';
import {SubmissionCompleteModal} from '@/components/modal/SubmissionCompleteModal';
import {SubmissionIncompleteModal} from '@/components/modal/SubmissionIncompleteModal';

const STEP_TITLES = {
  1: '기본 인적사항',
  2: '파트별 질문',
  3: '기타 질문',
} as const;

export const ApplyFormContainer = () => {
  const {
    step,
    methods,
    handleNext,
    handlePrev,
    handleSave,
    handleFinalSubmit,
    isConfirmModalOpen,
    closeConfirmModal,
    handleConfirmSubmit,
    isSubmissionCompleteModalOpen,
    openSubmissionCompleteModal,
    closeSubmissionCompleteModal,
    isSubmissionIncompleteModalOpen,
    closeSubmissionIncompleteModal,
  } = useApplyFormController();

  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, [step, scrollToTop]);

  // Check for submission complete flag on mount
  useEffect(() => {
    const submissionComplete = sessionStorage.getItem('submissionComplete');
    if (submissionComplete === 'true') {
      sessionStorage.removeItem('submissionComplete');
      openSubmissionCompleteModal();
    }
  }, [openSubmissionCompleteModal]);
  return (
    <>
      <div className='flex w-full justify-center'>
        <div className='flex w-full max-w-[1196px] flex-col gap-[125px] py-20'>
          <h1 className='text-h2 font-bold text-neutral-800'>
            {STEP_TITLES[step as keyof typeof STEP_TITLES]}
          </h1>

          <div className='flex w-full flex-col gap-[81px]'>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleFinalSubmit} key={step}>
                {step === 1 && (
                  <BasicInfo onNext={handleNext} onSave={handleSave} />
                )}
                {step === 2 && (
                  <PartQuestion
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onSave={handleSave}
                  />
                )}
                {step === 3 && (
                  <AdditionalInfo onPrev={handlePrev} onSave={handleSave} />
                )}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      <ApplicationConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmSubmit}
      />
      <SubmissionCompleteModal
        isOpen={isSubmissionCompleteModalOpen}
        onClose={closeSubmissionCompleteModal}
        onConfirm={closeSubmissionCompleteModal}
      />
      <SubmissionIncompleteModal
        isOpen={isSubmissionIncompleteModalOpen}
        onClose={closeSubmissionIncompleteModal}
        onConfirm={closeSubmissionIncompleteModal}
      />
    </>
  );
};
