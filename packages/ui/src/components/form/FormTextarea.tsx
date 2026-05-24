'use client';

import {forwardRef, useId, type TextareaHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from './form.styles';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  currentLength?: number;
  maxLength?: number;
  isProject?: boolean;
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
      isProject,
      ...props
    },
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

    const showCountInside = !isProject && maxLength;

    return (
      <div className={formFieldStyles.wrapper}>
        {!isProject && label && (
          <label htmlFor={inputId} className={formFieldStyles.label}>
            {label}
            {props.required && (
              <span className={formFieldStyles.required}>*</span>
            )}
          </label>
        )}
        {showCountInside ? (
          <div
            className={clsx(
              'flex min-h-54.5 flex-col rounded-[10px] border border-neutral-200 bg-white',
              error && formFieldStyles.error
            )}>
            <div className='flex w-full flex-1 px-[11.5px]'>
              <textarea
                ref={ref}
                id={inputId}
                spellCheck='false'
                className={clsx(
                  'sm:placeholder-body-l placeholder-h5 my-[16px] min-h-0 w-full flex-1 resize-none bg-transparent pr-[7px] placeholder:text-neutral-400 focus:outline-none',
                  'read-only:cursor-default read-only:focus:ring-0',
                  props.readOnly && formFieldStyles.readOnlyTextarea,
                  className
                )}
                maxLength={maxLength}
                {...props}
                onChange={handleChange}
              />
            </div>
            <div className='text-h5 shrink-0 px-4 pb-3 text-right text-neutral-400'>
              <span
                className={clsx(
                  currentLength > maxLength ? 'text-alert' : 'text-black'
                )}>
                {currentLength}
              </span>
              / {maxLength} 자
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              'flex w-full flex-col rounded-[10px] border-[1px] border-neutral-200 bg-white transition-all',
              isProject ? 'min-h-24' : 'min-h-54.5',
              error && formFieldStyles.error
            )}>
            <div className='flex w-full flex-1 px-[11.5px]'>
              <textarea
                ref={ref}
                id={inputId}
                spellCheck='false'
                className={clsx(
                  'w-full flex-1 resize-none bg-transparent pr-[7px] focus:outline-none',
                  isProject ? 'my-3.5' : 'my-[16px]',
                  'read-only:cursor-default read-only:focus:ring-0',
                  props.readOnly && formFieldStyles.readOnlyTextarea,
                  isProject && 'text-h5 placeholder:text-neutral-400',
                  className
                )}
                maxLength={maxLength}
                {...props}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {error && <span className={formFieldStyles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
