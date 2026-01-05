'use client';

import {useFormContext, RegisterOptions} from 'react-hook-form';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormInput} from '@/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FullButton} from '@/components/button/FullButton';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {BasicInfoFormData} from '@/schemas/apply-type';

interface FieldConfig {
  name: keyof BasicInfoFormData;
  label: string;
  type: 'input' | 'dropdown' | 'radio';
  placeholder?: string;
  options?: {value: string; label: string}[];
  rules?: RegisterOptions<BasicInfoFormData, keyof BasicInfoFormData>;
}

type FormItem = FieldConfig | {row: readonly FieldConfig[]};

interface BasicInfoProps {
  onSave: () => void;
  onNext: () => void;
  readOnly?: boolean;
}

export function BasicInfo({onNext, onSave, readOnly = false}: BasicInfoProps) {
  const {
    register,
    watch,
    setValue,
    formState: {errors},
  } = useFormContext<BasicInfoFormData>();

  const renderField = (field: FieldConfig) => {
    const {type, name, label, options, rules, placeholder} = field;
    const error = errors[name];

    if (type === 'radio') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-6'>
          <label className='text-h5 text-neutral-600'>{label}</label>
          <div className='flex gap-[58px]'>
            {options?.map((opt) => (
              <FormRadio
                key={opt.value}
                label={opt.label}
                value={opt.value}
                disabled={readOnly}
                {...register(name, rules)}
              />
            ))}
          </div>
          {error && (
            <span className='-mt-[33px] text-body-l text-alert'>
              {error.message as string}
            </span>
          )}
        </div>
      );
    }

    if (type === 'dropdown') {
      return (
        <div key={name} className='flex flex-1 flex-col gap-2'>
          <FormDropdown
            label={label}
            placeholder={placeholder}
            options={options || []}
            value={watch(name)}
            onChange={(val: string) =>
              setValue(name, val, {shouldValidate: true})
            }
            disabled={readOnly}
            className='w-full'
          />
          {error && (
            <span className='text-body-l text-alert'>
              {error.message as string}
            </span>
          )}
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
          error={error?.message as string}
          className='w-full'
        />
      </div>
    );
  };

  return (
    <div className='flex w-full flex-col gap-[81px]'>
      <div className='flex flex-col gap-[81px]'>
        {(BASIC_INFO_FIELDS as unknown as FormItem[]).map((item, idx) => (
          <div
            key={idx}
            className='flex w-full flex-col gap-6 md:flex-row md:items-end'>
            {'row' in item
              ? item.row.map((field) => renderField(field))
              : renderField(item)}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-[26px]'>
        <FullButton
          label='다음'
          variant='primary'
          labelTypo='h4'
          onClick={onNext}
          type='submit'
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
}
