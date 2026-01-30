'use client';

import {forwardRef, useId, type TextareaHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from './form.styles';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  currentLength?: number;
  maxLength?: number;
  required?: boolean;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea(
    {
      label,
      error,
      className,
      id,
      currentLength = 0,
      maxLength,
      required,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={formFieldStyles.wrapper}>
        {label ? (
          <label htmlFor={inputId} className={formFieldStyles.label}>
            {label}
            {required && <span className={formFieldStyles.required}>*</span>}
          </label>
        ) : null}

        <div className='relative w-full'>
          <textarea
            ref={ref}
            id={inputId}
            className={clsx(
              'min-h-54.5 w-full resize-none',
              formFieldStyles.field,
              'px-4.75 py-3.5',
              'read-only:cursor-default read-only:focus:ring-0',
              error && formFieldStyles.error,
              props.readOnly && formFieldStyles.readOnlyTextarea,
              className
            )}
            maxLength={maxLength}
            {...props}
          />

          {maxLength && (
            <div className='absolute right-4 bottom-4 text-h5 text-neutral-400'>
              <span
                className={clsx(currentLength > maxLength && 'text-red-500')}>
                {currentLength}
              </span>
              / {maxLength} 자
            </div>
          )}
        </div>

        {error && <span className={formFieldStyles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
