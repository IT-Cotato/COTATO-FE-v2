import React, {forwardRef} from 'react';
import CalendarIcon from '@/assets/calendar/calendar.svg';
import clsx from 'clsx';

interface CustomInputProps {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({value, onClick, disabled}, ref) => {
    return (
      <button
        type='button'
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          'flex h-9 w-38.5 items-center justify-between gap-2.5 rounded-[10px] bg-neutral-50 px-4 py-1.5 text-body-l text-neutral-800',
          {
            'cursor-pointer': !disabled,
            'cursor-default': disabled,
          }
        )}>
        <span>{value}</span>
        <CalendarIcon />
      </button>
    );
  }
);

CustomInput.displayName = 'CustomInput';
