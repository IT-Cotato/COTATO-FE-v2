'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext, Controller} from 'react-hook-form';
import {useQuery} from '@tanstack/react-query';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormInput} from '@/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FullButton} from '@/components/button/FullButton';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {BasicInfoFieldConfig} from '@/schemas/apply/apply-type';
import {BasicInfoFormData} from '@/schemas/apply/apply-schema';
import {getBasicInfo} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

interface BasicInfoProps {
  onSave: () => void;
  onNext: () => void;
  readOnly?: boolean;
}

export const BasicInfo = ({
  onNext,
  onSave,
  readOnly = false,
}: BasicInfoProps) => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');

  const {
    register,
    control,
    reset,
    formState: {errors},
  } = useFormContext<BasicInfoFormData>();

  const hasInitializedRef = useRef(false);

  const {data: basicInfo} = useQuery({
    queryKey: QUERY_KEYS.APPLY.BASIC_INFO(Number(applicationId)),
    queryFn: () => getBasicInfo(Number(applicationId)),
    enabled: !!applicationId,
  });

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
          : 'other') as BasicInfoFormData['isCollegeStudent'],
        department: basicInfo.major,
        completedSemesters: String(
          basicInfo.completedSemesters
        ) as BasicInfoFormData['completedSemesters'],
        isPrevActivity: (basicInfo.isPrevActivity
          ? 'yes'
          : 'no') as BasicInfoFormData['isPrevActivity'],
        part: basicInfo.applicationPartType as BasicInfoFormData['part'],
      };
      reset(transformedData);
      hasInitializedRef.current = true;
    }
  }, [basicInfo, reset]);

  const renderField = (field: BasicInfoFieldConfig) => {
    const {type, name, label, options, placeholder, autocomplete} =
      field as BasicInfoFieldConfig & {autocomplete?: string};
    const error = errors[name];

    if (type === 'radio') {
      return (
        <fieldset key={name} className='flex flex-1 flex-col gap-2'>
          <legend className='mb-3.5 text-h5 text-neutral-600'>{label}</legend>
          <div className='flex gap-[58px] pt-13.5'>
            {options?.map((opt) => (
              <FormRadio
                key={opt.value}
                label={opt.label}
                value={opt.value}
                readOnly={readOnly}
                {...register(name)}
              />
            ))}
          </div>
          <div className='min-h-[24px]'>
            {error && (
              <span className='text-body-l text-alert'>
                {error.message ?? ''}
              </span>
            )}
          </div>
        </fieldset>
      );
    }

    if (type === 'dropdown') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-2'>
          <Controller
            name={name}
            control={control}
            render={({field}) => (
              <FormDropdown
                id={name}
                label={label}
                placeholder={placeholder}
                options={options || []}
                value={field.value}
                onChange={field.onChange}
                readOnly={readOnly}
                className='w-full'
              />
            )}
          />
          <div className='min-h-[24px]'>
            {error && (
              <span className='text-body-l text-alert'>
                {error.message ?? ''}
              </span>
            )}
          </div>
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
          error={error?.message ?? ''}
          className='w-full'
        />
      </div>
    );
  };

  return (
    <div className='flex w-full flex-col gap-[81px]'>
      <div className='flex flex-col gap-[81px]'>
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

      <div className='flex flex-col gap-[26px]'>
        <FullButton
          label='다음'
          variant='primary'
          labelTypo='h4'
          onClick={onNext}
          type='button'
        />
        <FullButton
          label='저장하기'
          variant='outline'
          textColor='primary'
          labelTypo='h4'
          onClick={onSave}
          type='button'
        />
      </div>
    </div>
  );
};
