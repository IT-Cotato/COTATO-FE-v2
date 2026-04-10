'use client';

import {useFormContext, Controller} from 'react-hook-form';
import clsx from 'clsx';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {FormDropdown} from '@/components/form/FormDropdown';
import {FormRadio} from '@/components/form/FormRadio';
import {FormInput} from '@repo/ui/components/form/FormInput';
import {EtcFieldConfig, EtcFormItem} from '@/schemas/apply/apply-type';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {formFieldStyles} from '@repo/ui/components/form/form.styles';

interface EtcQuestionFieldListProps {
  etcFields: EtcFormItem[];
}

export const EtcQuestionFieldList = ({etcFields}: EtcQuestionFieldListProps) => {
  const {
    register,
    control,
    watch,
    formState: {errors},
  } = useFormContext<ApplyFormData>();

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
    const error = name ? (errors as Record<string, any>)[name] : undefined;

    switch (type) {
      case 'group_label':
        if (!label) return null;
        return (
          <label className={formFieldStyles.label}>{label ?? ''}</label>
        );
      case 'textarea':
        return (
          <FormTextarea
            key={name}
            label={label ?? ''}
            placeholder={placeholder}
            maxLength={name === 'unavailableInterviewTimes' ? 200 : maxLength}
            readOnly={readOnly}
            defaultValue={defaultValue}
            currentLength={name ? (watch(name as any) || '').length : 0}
            error={error?.message as string}
            className={className}
            required={field.required}
            {...(name &&
              register(
                name as any,
                field.required ? {required: '필수 항목입니다'} : {}
              ))}
          />
        );
      case 'dropdown':
        return (
          <Controller
            key={name}
            name={(name ?? '') as any}
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
                name as any,
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
                name={name as any}
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

  return (
    <div className='flex flex-col gap-3.5'>
      {etcFields.map((field, idx) => {
        if (field.type === 'row' && 'row' in field) {
          return (
            <div key={`row-${idx}`} className='flex w-full flex-row gap-4'>
              {field.row.map(renderField)}
            </div>
          );
        }
        const fieldKey = field.name || `${field.type}-${idx}`;
        return <div key={fieldKey}>{renderField(field)}</div>;
      })}
    </div>
  );
};
