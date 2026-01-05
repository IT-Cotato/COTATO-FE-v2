'use client';

import {useFormContext, type RegisterOptions} from 'react-hook-form';
import clsx from 'clsx';
import {FormTextarea} from '@/components/form/FormTextarea';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FullButton} from '@/components/button/FullButton';
import {FormRadio} from '@/components/form/FormRadio';
import {FormInput} from '@/components/form/FormInput';
import {ADDITIONAL_FIELDS} from '@/constants/form/formConfig';

interface FieldConfig {
  name?: string;
  label?: string;
  type: string;
  placeholder?: string;
  options?: {value: string; label: string}[];
  rules?: RegisterOptions;
  maxLength?: number;
  readOnly?: boolean;
  defaultValue?: string;
  className?: string;
  row?: FieldConfig[];
}

export function AdditionalInfo({
  onPrev,
  onSave,
  onSubmit,
}: {
  onPrev: () => void;
  onSave: () => void;
  onSubmit: () => void;
}) {
  const {
    register,
    watch,
    setValue,
    formState: {errors},
  } = useFormContext();

  const renderField = (field: FieldConfig) => {
    const {
      type,
      name,
      label,
      options,
      rules,
      placeholder,
      maxLength,
      readOnly,
      defaultValue,
      className,
    } = field;
    const error = name ? errors[name] : undefined;

    switch (type) {
      case 'group_label':
        return <label className='text-h5 text-neutral-800'>{label}</label>;
      case 'textarea':
        return (
          <FormTextarea
            key={name}
            label={label!}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            defaultValue={defaultValue}
            currentLength={name ? (watch(name) || '').length : 0}
            error={error?.message as string}
            {...(name && register(name, rules))}
          />
        );
      case 'dropdown':
        return (
          <FormDropdown
            key={name}
            label={label!}
            placeholder={placeholder}
            options={options || []}
            value={name ? watch(name) : ''}
            onChange={(val: string) =>
              name && setValue(name, val, {shouldValidate: true})
            }
            error={error?.message as string}
          />
        );
      case 'input':
        return (
          <FormInput
            key={name}
            label={label!}
            placeholder={placeholder}
            error={error?.message as string}
            {...(name && register(name, rules))}
          />
        );
      case 'radio':
        return (
          <div key={name} className='flex flex-col gap-2'>
            {label && (
              <label className='text-h5 text-neutral-600'>{label}</label>
            )}
            <div className={clsx('flex gap-[58px]', className)}>
              {options?.map((opt) => (
                <FormRadio
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                  {...(name && register(name, rules))}
                />
              ))}
            </div>
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

  return (
    <div className='flex w-full flex-col gap-[81px]'>
      <div className='flex flex-col gap-10'>
        {ADDITIONAL_FIELDS.map((field, idx) => {
          if (field.type === 'row') {
            return (
              <div key={idx} className='flex w-full flex-col gap-4 md:flex-row'>
                {field.row!.map(renderField)}
              </div>
            );
          }
          return <div key={idx}>{renderField(field as FieldConfig)}</div>;
        })}
      </div>

      <div className='flex flex-col gap-[26px]'>
        <div className='flex gap-[26px]'>
          <FullButton
            label='이전'
            variant='primary'
            backgroundColor='neutral-300'
            labelTypo='h4'
            onClick={onPrev}
          />
          <FullButton
            label='제출하기'
            variant='primary'
            labelTypo='h4'
            type='button'
            onClick={onSubmit}
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
      </div>
    </div>
  );
}
