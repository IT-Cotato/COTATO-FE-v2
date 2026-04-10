'use client';

import {useIsMobile} from '@repo/ui/hooks/useIsMobile';
import {useFormContext, Controller} from 'react-hook-form';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {FormRadio} from '@/components/form/FormRadio';
import {FormattedInput} from '@/components/form/FormattedInput';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {BasicInfoFieldConfig} from '@/schemas/apply/apply-type';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {
  formatDigitsToPhoneNumber,
  formatDigitsToYYYYMMDD,
} from '@/utils/formatter';

interface BasicInfoFieldListProps {
  readOnly?: boolean;
}

export const BasicInfoFieldList = ({readOnly = false}: BasicInfoFieldListProps) => {
  const {isMobile} = useIsMobile();
  const {
    register,
    control,
    formState: {errors},
  } = useFormContext<ApplyFormData>();

  const renderField = (field: BasicInfoFieldConfig) => {
    const {
      type,
      name,
      label,
      options,
      placeholder,
      mobilePlaceholder,
      autocomplete,
    } = field as BasicInfoFieldConfig & {autocomplete?: string};
    const resolvedPlaceholder =
      isMobile && mobilePlaceholder ? mobilePlaceholder : placeholder;

    if (type === 'radio') {
      return (
        <fieldset
          key={name}
          className='flex w-full flex-col lg:flex-1 lg:self-end'>
          {label && (
            <legend className='text-h5 mb-3.5 text-neutral-600'>{label}</legend>
          )}
          <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
              <div className='flex flex-col gap-2'>
                <div className='flex gap-14.5'>
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
                {error && (
                  <span className='text-body-m lg:text-body-l text-alert'>
                    {error.message ?? ''}
                  </span>
                )}
              </div>
            )}
          />
        </fieldset>
      );
    }

    if (type === 'dropdown') {
      return (
        <div key={name} className='flex min-w-0 flex-1 flex-col'>
          <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
              <>
                <FormDropdown
                  id={name}
                  label={label}
                  placeholder={resolvedPlaceholder}
                  options={options || []}
                  value={field.value}
                  onChange={field.onChange}
                  readOnly={readOnly}
                  className='w-full'
                  error={error?.message}
                  required
                />
                {name === 'part' && (
                  <p className='text-body-l text-alert mt-2'>
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
        <div key={name} className='flex min-w-0 flex-1 flex-col gap-2'>
          <FormattedInput
            name={name}
            label={label}
            placeholder={placeholder}
            readOnly={readOnly}
            autoComplete={autocomplete}
            formatter={formatDigitsToYYYYMMDD}
            maxLength={8}
            required
            error={
              isMobile && errors.birthDate
                ? '형식에 맞게 입력해주세요'
                : undefined
            }
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
          maxLength={name === 'department' ? 30 : undefined}
        />
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-2.5 lg:gap-3.5'>
      {BASIC_INFO_FIELDS.map((item) => {
        const key =
          'row' in item ? item.row.map((f) => f.name).join('-') : item.name;
        const colOnMobile = 'row' in item && item.colOnMobile;
        return (
          <div
            key={key}
            className={`flex w-full gap-2.5 lg:gap-6 ${colOnMobile ? 'flex-col lg:flex-row lg:items-start' : 'flex-row items-start'}`}>
            {'row' in item
              ? item.row.map((field) => renderField(field))
              : renderField(item)}
          </div>
        );
      })}
    </div>
  );
};
