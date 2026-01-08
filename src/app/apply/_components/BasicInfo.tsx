'use client';

import {useFormContext, Controller} from 'react-hook-form';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormInput} from '@/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FullButton} from '@/components/button/FullButton';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {BasicInfoFormData, BasicInfoFieldConfig} from '@/schemas/apply-type';

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
  const {
    register,
    control,
    formState: {errors},
  } = useFormContext<BasicInfoFormData>();

  const renderField = (field: BasicInfoFieldConfig) => {
    const {type, name, label, options, rules, placeholder} = field;
    const error = errors[name];

    if (type === 'radio') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-2'>
          <label className='mb-3.5 text-h5 text-neutral-600'>{label}</label>
          <div className='flex gap-[58px] pt-19'>
            {options?.map((opt) => (
              <FormRadio
                key={opt.value}
                label={opt.label}
                value={opt.value}
                readOnly={readOnly}
                {...register(name, rules)}
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
        </div>
      );
    }

    if (type === 'dropdown') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-2'>
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field}) => (
              <FormDropdown
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
          label={label}
          placeholder={placeholder}
          readOnly={readOnly}
          {...register(name, rules)}
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
