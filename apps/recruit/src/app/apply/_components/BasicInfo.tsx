'use client';

import {useEffect, useRef, useCallback} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext, Controller} from 'react-hook-form';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {BasicInfoFieldConfig} from '@/schemas/apply/apply-type';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {getBasicInfo} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {FormattedInput} from '@/components/form/FormattedInput';
import {
  formatDigitsToPhoneNumber,
  formatDigitsToYYYYMMDD,
} from '@/utils/formatter';

interface BasicInfoProps {
  onSave: () => void;
  onNext: () => void;
  readOnly?: boolean;
  showSaveSuccess: boolean;
  step: number;
}

export const BasicInfo = ({
  step,
  onNext,
  onSave,
  readOnly = false,
  showSaveSuccess,
}: BasicInfoProps) => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');

  const {
    register,
    control,
    reset,
    watch,
    setValue,
    getValues,
    unregister,
    formState: {errors},
  } = useFormContext<ApplyFormData>();

  const queryClient = useQueryClient();
  const hasInitializedRef = useRef(false);
  const previousPartRef = useRef<string | undefined>(undefined);

  const {data: basicInfo} = useQuery({
    queryKey: QUERY_KEYS.APPLY.BASIC_INFO(Number(applicationId)),
    queryFn: () => getBasicInfo(Number(applicationId)),
    enabled: !!applicationId,
  });

  // 파트 질문 필드 초기화 함수
  const clearPartQuestionFields = useCallback(() => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      if (key.startsWith('ans_')) {
        unregister(key as any);
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
        contact: basicInfo.phoneNumber,
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

  const renderField = (field: BasicInfoFieldConfig) => {
    const {type, name, label, options, placeholder, autocomplete} =
      field as BasicInfoFieldConfig & {autocomplete?: string};

    if (type === 'radio') {
      return (
        <fieldset key={name} className='flex flex-1 flex-col gap-2'>
          <legend className='text-h5 mb-3.5 text-neutral-600'>{label}</legend>
          <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
              <>
                <div className='flex gap-14.5 pt-11'>
                  {options?.map((opt) => (
                    <FormRadio
                      key={opt.value}
                      label={opt.label}
                      value={opt.value}
                      checked={field.value === opt.value}
                      onChange={() => field.onChange(opt.value)}
                      readOnly={readOnly}
                    />
                  ))}
                </div>
                <div>
                  {error && (
                    <span className='text-body-l text-alert'>
                      {error.message ?? ''}
                    </span>
                  )}
                </div>
              </>
            )}
          />
        </fieldset>
      );
    }

    if (type === 'dropdown') {
      return (
        <div key={name} className='flex flex-1 flex-col'>
          <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
              <>
                <FormDropdown
                  id={name}
                  label={label}
                  placeholder={placeholder}
                  options={options || []}
                  value={field.value}
                  onChange={field.onChange}
                  readOnly={readOnly}
                  className='w-full'
                  error={error?.message}
                  required
                />
                {name === 'part' && (
                  <p className='text-body-l mt-2 text-alert'>
                    * 파트 변경 시 업로드한 파일이 초기화됩니다.
                  </p>
                )}
              </>
            )}
          />
        </div>
      );
    }

    if (name === 'birthDate') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-2'>
          <FormattedInput
            name={name}
            label={label}
            placeholder={placeholder}
            readOnly={readOnly}
            autoComplete={autocomplete}
            formatter={formatDigitsToYYYYMMDD}
            maxLength={8}
            required
          />
        </div>
      );
    }

    if (name === 'contact') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-2'>
          <FormattedInput
            name={name}
            label={label}
            placeholder={placeholder}
            readOnly={readOnly}
            autoComplete={autocomplete}
            formatter={formatDigitsToPhoneNumber}
            maxLength={11}
            required
          />
        </div>
      );
    }

    return (
      <div key={name} className='flex flex-1 flex-col gap-2'>
        <FormInput
          id={name}
          label={label}
          placeholder={placeholder}
          readOnly={readOnly}
          autoComplete={autocomplete}
          {...register(name)}
          error={errors[name]?.message ?? ''}
          className='w-full'
          required
        />
      </div>
    );
  };

  return (
    <div className='flex w-full flex-col gap-5 pb-14'>
      <div className='flex justify-center pt-5'>
        <StepIndicator currentStep={step} totalSteps={3} />
      </div>
      <div className='flex flex-col gap-3.5'>
        {BASIC_INFO_FIELDS.map((item) => {
          const key =
            'row' in item ? item.row.map((f) => f.name).join('-') : item.name;
          return (
            <div key={key} className='flex w-full flex-col gap-6 md:flex-row'>
              {'row' in item
                ? item.row.map((field) => renderField(field))
                : renderField(item)}
            </div>
          );
        })}
      </div>

      <div className='flex flex-col gap-3.5'>
        <FullButton
          label='다음'
          variant='primary'
          labelTypo='h4'
          onClick={onNext}
          type='button'
          backgroundColor={isAllFieldsFilled ? 'primary' : 'text-disabled'}
        />
        <FullButton
          label='저장하기'
          variant='outline'
          textColor='primary'
          labelTypo='h4'
          onClick={onSave}
          type='button'
        />
        {showSaveSuccess && (
          <p className='text-primary text-center'>저장이 완료되었습니다</p>
        )}
      </div>
    </div>
  );
};
