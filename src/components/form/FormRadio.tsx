'use client';

import {forwardRef, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';

interface FormRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormRadio = forwardRef<HTMLInputElement, FormRadioProps>(
  function FormRadio({label, className, readOnly, ...props}, ref) {
    return (
      <label
        className={clsx(
          'flex cursor-pointer items-center gap-6 whitespace-nowrap',
          readOnly && 'pointer-events-none cursor-default',
          className
        )}>
        {/* 라디오 버튼과 안쪽 동그라미를 감싸는 컨테이너 */}
        <div className='relative flex items-center justify-center'>
          <input
            ref={ref}
            type='radio'
            disabled={readOnly}
            className={clsx(
              // 1. 기본 스타일 초기화 및 테두리 설정 (시안 반영)
              'peer size-[31px] appearance-none rounded-full border-[3px] border-neutral-300 transition-all',

              // 2. Admin 조회용 대응

              'read-only:cursor-default disabled:cursor-not-allowed'
            )}
            {...props}
          />
          {/* 3. 선택 시 중앙에 생기는 동그라미 (직접 구현) */}
          <div className='pointer-events-none absolute size-4.75 scale-0 rounded-full bg-secondary transition-transform duration-200 peer-checked:scale-100' />
        </div>

        <span className='text-h5 text-neutral-600'>{label}</span>
      </label>
    );
  }
);
