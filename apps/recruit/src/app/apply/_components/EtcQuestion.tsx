'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext} from 'react-hook-form';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {getEtcFields} from '@/constants/form/formConfig';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {useGetEtcQuestionsQuery} from '@/hooks/queries/useApply.query';
import {useRecruitmentScheduleQuery} from '@/hooks/queries/useRecruitmentSchedule.query';
import {formatRecruitmentDate} from '@/utils/formatDate';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {EtcQuestionFieldList} from '@/app/apply/_components/EtcQuestionFieldList';

export const EtcInfo = ({
  step,
  onPrev,
  onSave,
  showSaveSuccess,
  isSaving,
}: {
  step: number;
  onPrev: () => void;
  onSave: () => void;
  showSaveSuccess: boolean;
  isSaving: boolean;
}) => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id')
    ? Number(searchParams.get('id'))
    : null;

  const {watch, setValue} = useFormContext<ApplyFormData>();

  const discovery = watch('discovery');
  const sessionAgree = watch('sessionAgree');
  const otAgree = watch('otAgree');
  const privacyAgree = watch('privacyAgree');

  const isAllRequiredFilled =
    !!discovery && !!sessionAgree && !!otAgree && !!privacyAgree;

  const hasInitializedRef = useRef(false);

  const {data: etcQuestions, isLoading} =
    useGetEtcQuestionsQuery(applicationId);

  const {data: schedule} = useRecruitmentScheduleQuery();

  const etcDates = etcQuestions
    ? {
        interviewStartDate: etcQuestions.interviewStartDate,
        interviewEndDate: etcQuestions.interviewEndDate,
        otDate: formatRecruitmentDate(schedule?.ot, false),
        cokerthonDate: formatRecruitmentDate(schedule?.cokerthon, false),
        demoDayDate: formatRecruitmentDate(schedule?.demoDay, false),
      }
    : undefined;

  const etcFields = getEtcFields(etcDates, etcQuestions?.discoveryPath.options);

  useEffect(() => {
    if (etcQuestions && !hasInitializedRef.current) {
      if (etcQuestions.discoveryPath.selectedAnswer) {
        setValue('discovery', etcQuestions.discoveryPath.selectedAnswer);
      }

      if (etcQuestions.parallelActivities) {
        setValue('otherActivity', etcQuestions.parallelActivities);
      }

      if (etcQuestions.unavailableInterviewTimes) {
        setValue(
          'unavailableInterviewTimes',
          etcQuestions.unavailableInterviewTimes
        );
      }

      if (etcQuestions.sessionAttendance) {
        setValue('sessionAgree', 'agree');
      }
      if (etcQuestions.mandatoryEvents) {
        setValue('otAgree', 'agree');
      }
      if (etcQuestions.privacyPolicy) {
        setValue('privacyAgree', 'agree');
      }

      hasInitializedRef.current = true;
    }
  }, [etcQuestions, setValue]);



  return (
    <div className='flex w-full flex-col gap-5'>
      <div className='flex justify-center'>
        <StepIndicator currentStep={step} totalSteps={3} />
      </div>

      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center py-[60px]'>
          <Spinner />
        </div>
      ) : (
        <>
          <EtcQuestionFieldList etcFields={etcFields} />

          <div className='flex flex-col gap-3.5 lg:gap-6.5'>
            <div className='flex gap-3 lg:gap-6.5'>
              <FullButton
                label='이전'
                variant='primary'
                backgroundColor='neutral-600'
                labelTypo='h4'
                onClick={onPrev}
                type='button'
                wrapperClassName='!h-[42px]'
              />
              <FullButton
                label='제출하기'
                variant='primary'
                labelTypo='h4'
                type='submit'
                backgroundColor={isAllRequiredFilled ? 'primary' : 'text-disabled'}
                wrapperClassName='!h-[42px]'
              />
            </div>
            <FullButton
              label='저장하기'
              variant='outline'
              textColor='primary'
              labelTypo='h4'
              type='button'
              onClick={onSave}
              disabled={isSaving}
              wrapperClassName='!h-[46px]'
            />
            <p className='text-alert text-center'>
              * 제출 후 마이페이지에서 확인 가능합니다.
            </p>
            {showSaveSuccess && (
              <p className='text-primary text-center'>저장이 완료되었습니다</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
