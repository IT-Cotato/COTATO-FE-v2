'use client';

import dynamic from 'next/dynamic';

const CustomDateTimePicker = dynamic(
  () =>
    import(
      '@/app/admin/(with-sidebar)/application-edit/_components/calendar/CustomDateTimePicker'
    ).then((m) => m.CustomDateTimePicker),
  {ssr: false}
);
import CalendarIcon from '@repo/ui/assets/icons/calendar.svg';
import 'react-datepicker/dist/react-datepicker.css';
import {useMemo, useRef, useState} from 'react';
import {formatRecruitmentDate} from '@/utils/formatDate';
import clsx from 'clsx';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface AdminDatePickerButtonContainerProps {
  value?: string | null;
  onChange: (value: string | null) => void;
}

export const AdminDatePickerButtonContainer = ({
  value,
  onChange,
}: AdminDatePickerButtonContainerProps) => {
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
        className='flex w-full items-center justify-between rounded-[10px] bg-neutral-100 px-2 py-2 lg:gap-3 lg:px-4 lg:py-3'
        onClick={() => setIsOpen((prev) => !prev)}>
        <span className='text-body-m lg:text-body-l max-w-13 truncate font-normal text-neutral-600 sm:max-w-none'>
          {formatRecruitmentDate(value ?? toLocalISOString(new Date()))}
        </span>
        <CalendarIcon
          className={clsx(
            isOpen ? 'text-primary' : 'text-neutral-600',
            'h-4 w-4 lg:h-6 lg:w-6'
          )}
        />
      </button>

      {isOpen && (
        <div className='absolute top-full left-1/2 z-50 mt-2 -translate-x-5/7 lg:-translate-1/2'>
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
