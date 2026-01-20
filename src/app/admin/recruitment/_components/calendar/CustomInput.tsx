import React, {forwardRef} from 'react';
import CalendarIcon from '@/assets/calendar/calendar.svg';

interface CustomInputProps {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({value, onClick}, ref) => {
    return (
      <button
        type='button'
        ref={ref}
        onClick={onClick}
        className='flex h-9 w-38.5 items-center justify-between gap-2.5 rounded-[12px] bg-neutral-50 px-3.5 py-1.5 text-body-m'>
        <span>{value}</span>
        <CalendarIcon />
      </button>
    );
  }
);

CustomInput.displayName = 'CustomInput';
