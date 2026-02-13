import React, {forwardRef} from 'react';
import CalendarIcon from '@repo/ui/assets/icons/calendar.svg';
import clsx from 'clsx';

interface CustomInputProps {
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  hideIcon?: boolean;
}

export const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  function CustomInput({value, onClick, disabled, placeholder, hideIcon}, ref) {
    return (
      <button
        type='button'
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'text-body-l flex h-9 w-[153px] items-center justify-between gap-2 rounded-[5px] bg-white px-2.5 text-neutral-800',
          {
            'cursor-pointer': !disabled,
            'cursor-default': disabled,
          }
        )}>
        <span className='flex-1 text-center'>{value || placeholder}</span>
        {!hideIcon && <CalendarIcon className='h-5 w-5 hover:text-primary' />}
      </button>
    );
  }
);

CustomInput.displayName = 'CustomInput';