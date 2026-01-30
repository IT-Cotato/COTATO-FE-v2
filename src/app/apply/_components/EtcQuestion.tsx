'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext, Controller} from 'react-hook-form';
import clsx from 'clsx';
import {FormTextarea} from '@/components/form/FormTextarea';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FullButton} from '@/components/button/FullButton';
import {FormRadio} from '@/components/form/FormRadio';
import {FormInput} from '@/components/form/FormInput';
import {getEtcFields} from '@/constants/form/formConfig';
import {EtcFieldConfig} from '@/schemas/apply/apply-type';
import {useGetEtcQuestionsQuery} from '@/hooks/queries/useApply.query';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {Spinner} from '@/components/ui/Spinner';
import {formFieldStyles} from '@/components/form/form.styles';

export const EtcInfo = ({
  step,
  onPrev,
  onSave,
  showSaveSuccess,
}: {
  step: number;
  onPrev: () => void;
  onSave: () => void;
  showSaveSuccess: boolean;
}) => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id')
    ? Number(searchParams.get('id'))
    : null;

  const {
    register,
    control,
    watch,
    setValue,
    formState: {errors},
  } = useFormContext();

  const discovery = watch('discovery');
  const sessionAgree = watch('sessionAgree');
  const otAgree = watch('otAgree');
  const privacyAgree = watch('privacyAgree');

  const isAllRequiredFilled =
    !!discovery && !!sessionAgree && !!otAgree && !!privacyAgree;

  const hasInitializedRef = useRef(false);

  const {data: etcQuestions, isLoading} =
    useGetEtcQuestionsQuery(applicationId);

  const etcDates = etcQuestions
    ? {
        interviewStartDate: etcQuestions.interviewStartDate,
        interviewEndDate: etcQuestions.interviewEndDate,
        otDate: etcQuestions.otDate,
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

  const renderField = (field: EtcFieldConfig) => {
    const {
      type,
      name,
      label,
      options,
      placeholder,
      maxLength,
      readOnly,
      defaultValue,
      className,
    } = field;
    const error = name ? errors[name] : undefined;

    switch (type) {
      case 'group_label':
        if (!label) return null;
        return (
          <label className='text-h5 text-neutral-800'>{label ?? ''}</label>
        );
      case 'textarea':
        return (
          <FormTextarea
            key={name}
            label={label ?? ''}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            defaultValue={defaultValue}
            currentLength={name ? (watch(name) || '').length : 0}
            error={error?.message as string}
            className={className}
            required={field.required}
            {...(name &&
              register(
                name,
                field.required ? {required: '필수 항목입니다'} : {}
              ))}
          />
        );
      case 'dropdown':
        return (
          <Controller
            key={name}
            name={name ?? ''}
            control={control}
            rules={field.required ? {required: '필수 항목입니다'} : {}}
            render={({field: controllerField}) => (
              <FormDropdown
                label={label ?? ''}
                placeholder={placeholder}
                options={options || []}
                value={controllerField.value}
                onChange={controllerField.onChange}
                error={error?.message as string}
                required={field.required}
              />
            )}
          />
        );
      case 'input':
        return (
          <FormInput
            key={name}
            label={label ?? ''}
            placeholder={placeholder}
            error={error?.message as string}
            required={field.required}
            {...(name &&
              register(
                name,
                field.required ? {required: '필수 항목입니다'} : {}
              ))}
          />
        );
      case 'radio':
        return (
          <div key={name} className='flex flex-col gap-2'>
            {label && (
              <label className={formFieldStyles.label}>
                {label}
                {field.required && (
                  <span className={formFieldStyles.required}>*</span>
                )}
              </label>
            )}
            {name && (
              <Controller
                name={name}
                control={control}
                rules={field.required ? {required: '필수 항목입니다'} : {}}
                render={({field: controllerField}) => (
                  <div className={clsx('flex w-full gap-14.5', className)}>
                    {options?.map((opt) => (
                      <FormRadio
                        key={opt.value}
                        label={opt.label}
                        value={opt.value}
                        checked={controllerField.value === opt.value}
                        onChange={() => controllerField.onChange(opt.value)}
                      />
                    ))}
                  </div>
                )}
              />
            )}
            {error && (
              <span className='text-body-l text-alert'>
                {error.message as string}
              </span>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className='flex w-full flex-col items-center gap-20.25'>
        <div className='flex justify-center py-4'>
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='flex w-full flex-col gap-20.25'>
      <div className='flex justify-center py-4'>
        <StepIndicator currentStep={step} totalSteps={3} />
      </div>
      <div className='flex flex-col gap-10'>
        {etcFields.map((field, idx) => {
          if (field.type === 'row' && 'row' in field) {
            return (
              <div
                key={`row-${idx}`}
                className='flex w-full flex-col gap-4 md:flex-row'>
                {field.row.map(renderField)}
              </div>
            );
          }
          const fieldKey = field.name || `${field.type}-${idx}`;
          return <div key={fieldKey}>{renderField(field)}</div>;
        })}
      </div>

      <div className='flex flex-col gap-6.5'>
        <div className='flex gap-6.5'>
          <FullButton
            label='이전'
            variant='primary'
            backgroundColor='neutral-300'
            labelTypo='h4'
            onClick={onPrev}
            type='button'
          />
          <FullButton
            label='제출하기'
            variant='primary'
            labelTypo='h4'
            type='submit'
            backgroundColor={isAllRequiredFilled ? 'primary' : 'text-disabled'}
          />
        </div>
        <FullButton
          label='저장하기'
          variant='outline'
          textColor='primary'
          labelTypo='h4'
          type='button'
          onClick={onSave}
        />
        {showSaveSuccess && (
          <p className='text-center text-primary'>저장이 완료되었습니다</p>
        )}
      </div>
    </div>
  );
};
