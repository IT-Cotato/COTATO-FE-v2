'use client';

import {CustomDateTimePicker} from '@/app/admin/(with-sidebar)/application-form/_components/calendar/CustomDateTimePicker';
import CalendarIcon from '@/assets/icons/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';
import {useRef, useState} from 'react';
import {useClickOutside} from '@/hooks/useClickOutside';

interface AdminDatePickerProps {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const AdminApplicationFormCalendar = ({
  value,
  placeholder = '날짜 선택',
  onChange,
}: AdminDatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, () => setIsOpen(false));

  return (
    <div className='relative w-fit' ref={calendarRef}>
      <button
        type='button'
        className='flex w-57 items-center justify-between rounded-[10px] bg-neutral-100 px-4 py-3'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-body-m font-normal text-neutral-600'>
          {value ?? placeholder}
        </span>
        <CalendarIcon />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 z-50 mt-2'>
          <CustomDateTimePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              if (!date) return;
              setSelectedDate(date);
              onChange(date.toISOString().slice(0, 10));
            }}
          />
        </div>
      )}
    </div>
  );
};
