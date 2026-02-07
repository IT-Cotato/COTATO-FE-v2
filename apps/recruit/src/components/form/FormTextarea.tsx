'use client';

import {forwardRef, useId, type TextareaHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from './form.styles';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  currentLength?: number;
  maxLength?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea(
    {label, error, className, id, currentLength = 0, maxLength, ...props},
    ref
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
      props.onChange?.(e);
    };

    return (
      <div className={formFieldStyles.wrapper}>
        <label htmlFor={inputId} className={formFieldStyles.label}>
          {label}
          {props.required && (
            <span className={formFieldStyles.required}>*</span>
          )}
        </label>

        <div className='relative w-full'>
          <textarea
            ref={ref}
            id={inputId}
            className={clsx(
              'min-h-54.5 w-full resize-none',
              formFieldStyles.field,
              'px-4.75 py-4.5',
              'read-only:cursor-default read-only:focus:ring-0',
              error && formFieldStyles.error,
              props.readOnly && formFieldStyles.readOnlyTextarea,
              className
            )}
            maxLength={maxLength}
            {...props}
            onChange={handleChange}
          />

          {maxLength && (
            <div className='text-h5 absolute right-4 bottom-4 text-neutral-400'>
              <span
                className={clsx(
                  currentLength > maxLength ? 'text-alert' : 'text-black'
                )}>
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
