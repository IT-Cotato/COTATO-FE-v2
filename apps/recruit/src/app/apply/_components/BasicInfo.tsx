'use client';

import {useEffect, useRef, useCallback} from 'react';
import {useIsMobile} from '@repo/ui/hooks/useIsMobile';
import {useSearchParams} from 'next/navigation';
import {useFormContext, Controller, type Path} from 'react-hook-form';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {getBasicInfo} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {BasicInfoFieldList} from '@/app/apply/_components/BasicInfoFieldList';

interface BasicInfoProps {
  onSave: () => void;
  onNext: () => void;
  readOnly?: boolean;
  showSaveSuccess: boolean;
  isSaving: boolean;
  step: number;
}

export const BasicInfo = ({
  step,
  onNext,
  onSave,
  readOnly = false,
  showSaveSuccess,
  isSaving,
}: BasicInfoProps) => {
  const {isMobile} = useIsMobile();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');

  const {
    watch,
    setValue,
    getValues,
    unregister,
    reset,
  } = useFormContext<ApplyFormData>();

  const queryClient = useQueryClient();
  const hasInitializedRef = useRef(false);
  const previousPartRef = useRef<string | undefined>(undefined);

  const {data: basicInfo, isLoading} = useQuery({
    queryKey: QUERY_KEYS.APPLY.BASIC_INFO(Number(applicationId)),
    queryFn: () => getBasicInfo(Number(applicationId)),
    enabled: !!applicationId,
  });

  // 파트 질문 필드 초기화 함수
  const clearPartQuestionFields = useCallback(() => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      if (key.startsWith('ans_')) {
        unregister(key as Path<ApplyFormData>);
      }
    });
    setValue('pdfFileKey', undefined);
    setValue('pdfFileUrl', undefined);
    setValue('pdfFileName', undefined);

    // 이전 파트의 질문 캐시 제거 (파트 변경 시 이전 데이터가 남아있는 문제 방지)
    if (applicationId) {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(Number(applicationId)),
      });
    }
  }, [getValues, unregister, setValue, applicationId, queryClient]);

  useEffect(() => {
    if (basicInfo && !hasInitializedRef.current) {
      const transformedData = {
        name: basicInfo.name,
        gender: basicInfo.gender,
        contact: basicInfo.phoneNumber ?? undefined,
        birthDate: basicInfo.birthDate,
        school: basicInfo.university,
        isCollegeStudent: (basicInfo.isEnrolled
          ? 'enrolled'
          : 'other') as ApplyFormData['isCollegeStudent'],
        department: basicInfo.major,
        completedSemesters: String(
          basicInfo.completedSemesters
        ) as ApplyFormData['completedSemesters'],
        isPrevActivity: (basicInfo.isPrevActivity
          ? 'yes'
          : 'no') as ApplyFormData['isPrevActivity'],
        part: basicInfo.applicationPartType as ApplyFormData['part'],
      };
      reset(transformedData);
      previousPartRef.current = basicInfo.applicationPartType;
      hasInitializedRef.current = true;
    }
  }, [basicInfo, reset]);

  // 파트 변경 감지 및 필드 초기화
  const currentPart = watch('part');
  useEffect(() => {
    // 최초 로드가 완료된 후에만 동작
    if (!hasInitializedRef.current) return;

    // 이전 파트와 현재 파트가 다르면 필드 초기화
    if (previousPartRef.current && previousPartRef.current !== currentPart) {
      clearPartQuestionFields();
    }
    previousPartRef.current = currentPart;
  }, [currentPart, clearPartQuestionFields]);

  // 모든 필수 필드가 작성되었는지 확인
  const allValues = watch();
  const isAllFieldsFilled = ![
    'name',
    'gender',
    'contact',
    'birthDate',
    'school',
    'isCollegeStudent',
    'department',
    'completedSemesters',
    'isPrevActivity',
    'part',
  ].some((field) => !allValues[field as keyof ApplyFormData]);



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
          <BasicInfoFieldList readOnly={readOnly} />

          <div className='flex flex-col gap-3.5'>
            <FullButton
              label='다음'
              variant='primary'
              labelTypo='h4'
              onClick={onNext}
              type='button'
              backgroundColor={isAllFieldsFilled ? 'primary' : 'text-disabled'}
              wrapperClassName='!h-[42px]'
            />
            <FullButton
              label='저장하기'
              variant='outline'
              textColor='primary'
              labelTypo='h4'
              onClick={onSave}
              type='button'
              disabled={isSaving}
              wrapperClassName='!h-[46px]'
            />
            {showSaveSuccess && (
              <p className='text-primary text-center'>저장이 완료되었습니다</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
