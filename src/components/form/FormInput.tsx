'use client';

import {forwardRef, useId, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from './form.styles';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput({label, error, id, className, ...props}, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={formFieldStyles.wrapper}>
        <label htmlFor={inputId} className={formFieldStyles.label}>
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            formFieldStyles.field,
            error && formFieldStyles.error,
            className
          )}
          {...props}
        />
        {error && <span className={formFieldStyles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
