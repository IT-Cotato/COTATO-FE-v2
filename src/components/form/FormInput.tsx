'use client';

import {forwardRef, useId, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput({label, error, className, id, ...props}, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className='flex w-full flex-col gap-6'>
        <label htmlFor={inputId} className='text-h5 text-neutral-600'>
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={clsx(
            // 기본 스타일 및 패딩
            'placeholder-body-l rounded-[10px] border-[1.5px] border-neutral-300 px-4 py-6 placeholder:text-neutral-300',
            'focus:border-primary focus:ring-[1.5px] focus:ring-primary focus:outline-none',
            // Admin 조회 시 (readOnly) 스타일
            'read-only:cursor-default read-only:focus:ring-0',
            // 에러 시 텍스트 스타일
            error &&
              'border-alert text-body-l text-alert focus:border-alert focus:ring-alert',
            className
          )}
          {...props}
        />

        {error && (
          <span className='-mt-4.75 text-body-l text-alert'>{error}</span>
        )}
      </div>
    );
  }
);
