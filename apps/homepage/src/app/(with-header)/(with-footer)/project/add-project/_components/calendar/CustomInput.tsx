import React from 'react';
import CalendarIcon from '@/assets/calendar/calendar.svg';
import clsx from 'clsx';

interface CustomInputProps {
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function CustomInput({
  value,
  onClick,
  disabled,
  placeholder,
  ref,
}: CustomInputProps) {
  const label = value
    ? `선택된 날짜: ${value}`
    : `${placeholder ?? '날짜'} 선택하기`;

  return (
    <button
      type='button'
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      aria-haspopup='dialog'
      aria-label={label}
      className={clsx(
        'text-body-m lg:text-h5 flex h-11.5 w-full items-center justify-between gap-2 rounded-[10px] bg-neutral-50 py-3 pr-2 pl-2 text-neutral-800 lg:w-57 lg:bg-white lg:pr-7.5 lg:pl-4',
        {
          'cursor-pointer': !disabled,
          'cursor-default': disabled,
        }
      )}>
      <span className='flex-1 text-center' aria-hidden='true'>
        {value || placeholder}
      </span>
      <CalendarIcon className='h-4 w-4.5' aria-hidden='true' />
    </button>
  );
}
