import React from 'react';
import CalendarIcon from '@repo/ui/assets/icons/calendar.svg';
import clsx from 'clsx';

interface CustomInputProps {
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  hideIcon?: boolean;
  className?: string;
  textAlign?: 'left' | 'center';
  ref?: React.Ref<HTMLButtonElement>;
}

export function CustomInput({
  value,
  onClick,
  disabled,
  placeholder,
  hideIcon,
  className,
  textAlign = 'center',
  ref,
}: CustomInputProps) {
  return (
    <button
      type='button'
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'text-body-m lg:text-body-l flex items-center justify-between gap-0.5 rounded-[5px] p-[5.5px] text-neutral-800 lg:gap-2 lg:px-2.5',
        !className?.includes('w-') && 'w-full min-w-25 lg:w-38.25',
        !className?.includes('h-') && 'h-9',
        !className?.includes('bg-') && 'bg-neutral-50',
        {
          'cursor-pointer': !disabled,
          'cursor-default': disabled,
        },
        className
      )}>
      <span
        className={clsx(
          'flex-1',
          textAlign === 'center' ? 'text-center' : 'text-left',
          !value && 'text-neutral-500'
        )}>
        {value || placeholder}
      </span>
      {!hideIcon && (
        <CalendarIcon className='hover:text-primary h-4 w-4 lg:h-5 lg:w-5' />
      )}
    </button>
  );
}
