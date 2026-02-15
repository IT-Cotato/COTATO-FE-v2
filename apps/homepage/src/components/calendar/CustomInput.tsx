import React, {forwardRef} from 'react';
import CalendarIcon from '@/assets/calendar/calendar.svg';
import clsx from 'clsx';

interface CustomInputProps {
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  function CustomInput({value, onClick, disabled, placeholder}, ref) {
    return (
      <button
        type='button'
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'text-h5 flex h-11.5 w-57 items-center justify-between gap-2 rounded-[10px] bg-white py-3 pr-7.5 pl-4 text-neutral-800',
          {
            'cursor-pointer': !disabled,
            'cursor-default': disabled,
          }
        )}>
        <span className='flex-1 text-center'>{value || placeholder}</span>
        <CalendarIcon className='h-4 w-4.5' />
      </button>
    );
  }
);

CustomInput.displayName = 'CustomInput';
