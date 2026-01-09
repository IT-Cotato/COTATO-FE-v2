'use client';

import {useFormContext, Controller} from 'react-hook-form';
import clsx from 'clsx';
import {FormTextarea} from '@/components/form/FormTextarea';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FullButton} from '@/components/button/FullButton';
import {FormRadio} from '@/components/form/FormRadio';
import {FormInput} from '@/components/form/FormInput';
import {ADDITIONAL_FIELDS} from '@/constants/form/formConfig';
import {EtcFieldConfig} from '@/schemas/apply-type';

export const EtcInfo = ({
  onPrev,
  onSave,
}: {
  onPrev: () => void;
  onSave: () => void;
}) => {
  const {
    register,
    control,
    watch,
    formState: {errors},
  } = useFormContext();

  const renderField = (field: EtcFieldConfig) => {
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
            {...(name && register(name, rules))}
          />
        );
      case 'dropdown':
        return (
          <Controller
            key={name}
            name={name ?? ''}
            control={control}
            rules={rules}
            render={({field: controllerField}) => (
              <FormDropdown
                label={label ?? ''}
                placeholder={placeholder}
                options={options || []}
                value={controllerField.value}
                onChange={controllerField.onChange}
                error={error?.message as string}
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
            {...(name && register(name, rules))}
          />
        );
      case 'radio':
        return (
          <div key={name} className='flex flex-col gap-2'>
            {label && (
              <label className='text-h5 text-neutral-600'>{label}</label>
            )}
            <div className={clsx('flex w-full gap-[58px]', className)}>
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

      <div className='flex flex-col gap-[26px]'>
        <div className='flex gap-[26px]'>
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
};
