'use client';

import {useRef, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {FormProvider} from 'react-hook-form';
import {BasicInfo} from '@/app/apply/_components/BasicInfo';
import {PartQuestion} from '@/app/apply/_components/PartQuestion';
import {EtcInfo} from '@/app/apply/_components/EtcQuestion';
import {useApplyFormController} from '@/app/apply/_hooks/useApplyFormController';
import {ApplicationConfirmModal} from '@/components/modal/ApplicationConfirmModal';
import {AlreadySubmittedModal} from '@/components/modal/AlreadySubmittedModal';
import {useApplicationStatusQuery} from '@/hooks/queries/useApply.query';
import {useAuthStore} from '@/store/useAuthStore';
import {ROUTES} from '@/constants/routes';
import HeroBanner from '@/assets/backgrounds/banners/hero-main.webp';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {useRecruitmentScheduleQuery} from '@/hooks/queries/useRecruitmentSchedule.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {HEADER_HEIGHT} from '@repo/ui/constants/ui';
import {RecruitmentInformation} from '@/components/recruitment/RecruitmentInformation';
import {scheduleSections} from '@/constants/admin/admin-application-questions';
import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';
import Image from 'next/image';

const APPLY_SCHEDULE_SECTIONS = scheduleSections.filter(
  (schedule) =>
    schedule.label !== '코커톤 날짜' && schedule.label !== '데모데이 날짜'
);

interface ApiErrorData {
  code: string;
  message: string;
}

const STEP_TITLES: Record<number, string> = {
  2: '파트별 질문',
  3: '기타 질문',
};

export const ApplyFormContainer = () => {
  const router = useRouter();
  const pageTopRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const {isAuthenticated} = useAuthStore();

  const {
    data: applicationStatus,
    isError,
    error,
  } = useApplicationStatusQuery(isAuthenticated);

  const {
    step,
    isGuardReady,
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
  const generation = recruitmentStatus?.generationId;
  const {data: scheduleData} = useRecruitmentScheduleQuery();

  useEffect(() => {
    if (step === 1) {
      pageTopRef.current?.scrollIntoView({behavior: 'smooth'});
    } else {
      formContainerRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }, [step]);

  // 모집 기간 종료된 경우 홈으로 리다이렉트
  useEffect(() => {
    if (recruitmentStatus && !recruitmentStatus.isActive) {
      alert('모집 기간이 종료되었습니다.');
      router.push(ROUTES.HOME);
    }
  }, [recruitmentStatus, router]);

  // 에러 발생 시 리다이렉트
  useEffect(() => {
    if (!isError || !error) return;

    if (typeof error === 'object' && 'code' in error) {
      const apiError = error as ApiErrorData;
      alert(apiError.message || '오류가 발생했습니다.');
      router.push(ROUTES.HOME);
    } else if (error instanceof Error) {
      if (error.name !== 'CancelledError') {
        alert('오류가 발생했습니다.');
        router.push(ROUTES.HOME);
      }
    }
  }, [isError, error, router]);

  if (isLoading || !isGuardReady) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  // 제출 완료된 경우
  if (applicationStatus?.isSubmitted) {
    return (
      <AlreadySubmittedModal
        isOpen={true}
        onConfirm={() => router.push(ROUTES.HOME)}
      />
    );
  }

  return (
    <>
      <div
        ref={pageTopRef}
        style={{scrollMarginTop: HEADER_HEIGHT}}
        className='flex w-full flex-col items-center bg-neutral-50'>
        {step === 1 && (
          <HeroMainBanner
            heading='COde Together, Arrive TOgether'
            headingStyle='bg-linear-to-r from-[#F89202] from-0% via-[#F89202] via-10% to-[#9E9E9E] to-100% bg-clip-text text-transparent'
            bannerImage={
              <Image
                src={HeroBanner}
                alt='Hero Banner'
                fill
                priority
                className='object-cover object-center'
              />
            }
          />
        )}

        <div
          ref={formContainerRef}
          style={{scrollMarginTop: HEADER_HEIGHT}}
          className='flex w-full max-w-275 flex-col px-6 py-[42.5px] lg:max-w-275'>
          <div className='flex flex-col gap-3.5'>
            <h1 className='text-h5 lg:text-h1 font-bold text-neutral-800'>
              <span aria-hidden='true'>🥔</span>
              &nbsp;코테이토 {generation}기 지원서&nbsp;
              <span aria-hidden='true'>🥔</span>
            </h1>
            {scheduleData && (
              <RecruitmentInformation
                variant='plain'
                sections={APPLY_SCHEDULE_SECTIONS}
                data={scheduleData}
                isEditing={false}
                onChange={() => {}}
              />
            )}
          </div>

          {STEP_TITLES[step] && (
            <h2 className='text-h5 lg:text-h2 pt-4 font-bold text-neutral-800'>
              {STEP_TITLES[step]}
            </h2>
          )}

          <div className='flex w-full flex-col gap-3.5'>
            <FormProvider {...methods}>
              <form onSubmit={handleFinalSubmit}>
                {step === 1 && (
                  <BasicInfo
                    step={step}
                    onNext={handleNext}
                    onSave={handleSave}
                    showSaveSuccess={showSaveSuccess}
                  />
                )}
                {step === 2 && (
                  <PartQuestion
                    step={step}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onSave={handleSave}
                    showSaveSuccess={showSaveSuccess}
                  />
                )}
                {step === 3 && (
                  <EtcInfo
                    step={step}
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
