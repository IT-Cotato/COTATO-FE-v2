import React, {forwardRef} from 'react';
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
}

export const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  function CustomInput(
    {
      value,
      onClick,
      disabled,
      placeholder,
      hideIcon,
      className,
      textAlign = 'center',
    },
    ref
  ) {
    return (
      <button
        type='button'
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'text-body-l flex h-9 items-center justify-between gap-2 rounded-[5px] px-2.5 text-neutral-800',
          !className?.includes('w-') && 'w-38.25', // 기본 너비
          !className?.includes('h-') && 'h-9', // 기본 높이
          !className?.includes('bg-') && 'bg-white', // 기본 배경색
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
        {!hideIcon && <CalendarIcon className='hover:text-primary h-5 w-5' />}
      </button>
    );
  }
);

CustomInput.displayName = 'CustomInput';
