'use client';

import {FormProvider} from 'react-hook-form';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {BasicInfo} from '@/app/apply/_components/BasicInfo';
import {PartQuestion} from '@/app/apply/_components/PartQuestion';
import {EtcInfo} from '@/app/apply/_components/EtcInfo';
import {useApplyFormController} from '@/app/apply/_hooks/useApplyFormController';
import {ApplicationConfirmModal} from '@/components/modal/ApplicationConfirmModal';
import HeroMainBanner from '@/components/banner/HeroMainBanner';
import {AdminRecruitmentInformation} from '@/app/admin/application-edit/_components/recruitment/AdminRecruitmentInformation';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {useRecruitmentScheduleQuery} from '@/hooks/queries/useRecruitmentSchedule.query';
import {Spinner} from '@/components/ui/Spinner';

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
    showSaveSuccess,
  } = useApplyFormController();

  const {data: recruitmentStatus, isLoading} = useRecruitmentStatusQuery();
  const generation = recruitmentStatus?.data?.generationId;

  const {data: scheduleData} = useRecruitmentScheduleQuery();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className='flex w-full flex-col items-center bg-neutral-50'>
        {step === 1 && (
          <HeroMainBanner
            heading='COde Together, Arrive TOgether'
            headingStyle='bg-linear-to-r from-[#F89202] from-0% via-[#F89202] via-10% to-[#9E9E9E] to-100% bg-clip-text text-transparent'
          />
        )}

        <div className='flex w-full min-w-[1100px] flex-col gap-[125px] py-20'>
          <div className='flex flex-col gap-15'>
            <h1 className='text-h1 text-neutral-800'>
              <span aria-hidden='true'>🥔</span>
              &nbsp;코테이토 {generation}기 지원서&nbsp;
              <span aria-hidden='true'>🥔</span>
            </h1>
            {scheduleData && (
              <AdminRecruitmentInformation
                variant='plain'
                data={scheduleData}
                isEditing={false}
                onChange={() => {}}
              />
            )}
          </div>

          <h2 className='text-h2 text-neutral-800'>
            {STEP_TITLES[step as keyof typeof STEP_TITLES]}
          </h2>

          <div className='flex w-full flex-col gap-[20px]'>
            <div className='flex justify-center'>
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleFinalSubmit} key={step}>
                {step === 1 && (
                  <BasicInfo
                    onNext={handleNext}
                    onSave={handleSave}
                    showSaveSuccess={showSaveSuccess}
                  />
                )}
                {step === 2 && (
                  <PartQuestion
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onSave={handleSave}
                    showSaveSuccess={showSaveSuccess}
                  />
                )}
                {step === 3 && (
                  <EtcInfo
                    onPrev={handlePrev}
                    onSave={handleSave}
                    showSaveSuccess={showSaveSuccess}
                  />
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
    </>
  );
};
