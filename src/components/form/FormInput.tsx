'use client';

import {forwardRef, useId, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from '@/components/form/form.styles';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput({label, error, id, className, required, ...props}, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={formFieldStyles.wrapper}>
        <label htmlFor={inputId} className={formFieldStyles.label}>
          {label}
          {required && <span className={formFieldStyles.required}>*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-required={required || undefined}
          className={clsx(
            formFieldStyles.field,
            props.readOnly && formFieldStyles.readOnlyForm,
            error ? formFieldStyles.error : 'border-neutral-200',
            className
          )}
          {...props}
        />
        {error && <span className={formFieldStyles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
