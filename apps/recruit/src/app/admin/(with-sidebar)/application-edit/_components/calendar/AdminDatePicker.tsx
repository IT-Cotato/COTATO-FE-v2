'use client';

import {CustomDateTimePicker} from '@/app/admin/(with-sidebar)/application-edit/_components/calendar/CustomDateTimePicker';
import CalendarIcon from '@/assets/icons/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';
import {useMemo, useRef, useState} from 'react';
import {useClickOutside} from '@/hooks/useClickOutside';
import {formatRecruitmentDate} from '@/utils/formatDate';
import clsx from 'clsx';

interface AdminDatePickerProps {
  value?: string | null;

  onChange: (value: string | null) => void;
}

export const AdminDatePicker = ({value, onChange}: AdminDatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedDate = useMemo(
    () => (value ? new Date(value) : new Date()),
    [value]
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, () => setIsOpen(false));

  return (
    <div className='relative max-w-[556.5px] flex-1' ref={calendarRef}>
      <button
        type='button'
        className='flex w-full items-center justify-between gap-3 rounded-[10px] bg-neutral-100 px-4 py-3'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-body-l font-normal text-neutral-600'>
          {formatRecruitmentDate(value ?? toLocalISOString(new Date()))}
        </span>
        <CalendarIcon
          className={clsx(
            isOpen ? 'text-primary' : 'text-neutral-600',
            'h-6 w-6'
          )}
        />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 z-50 mt-2'>
          <CustomDateTimePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              if (!date) return;
              onChange(toLocalISOString(date));
            }}
          />
        </div>
      )}
    </div>
  );
};
const toLocalISOString = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
};
