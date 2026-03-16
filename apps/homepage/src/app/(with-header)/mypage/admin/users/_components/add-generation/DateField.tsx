'use client';

import {useRef, useEffect, useId} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {formatDate} from '@repo/ui/utils/date';
import {CustomInput} from '../calendar/CustomInput';
import {CustomHeader} from '../calendar/CustomHeader';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

const mobileInputClass =
  'text-body-m h-10 w-full rounded-[5px] bg-neutral-50 p-[5.5px] px-2.5 text-left text-neutral-800 outline-none placeholder:text-neutral-500 lg:hidden';

interface DateFieldProps {
  label: string;
  date: Date | null;
  dateText: string;
  isOpen: boolean;
  minDate?: Date | null;
  onDateChange: (date: Date | null) => void;
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  onClose: () => void;
}

export const DateField = ({
  label,
  date,
  dateText,
  isOpen,
  minDate,
  onDateChange,
  onTextChange,
  onToggle,
  onClose,
}: DateFieldProps) => {
  const inputId = useId();
  const calendarRef = useRef<HTMLDivElement>(null);
  useClickOutside(calendarRef, () => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div ref={calendarRef} className='relative flex flex-col gap-2.5'>
      <label
        htmlFor={inputId}
        className='text-h5 font-bold text-neutral-600 lg:font-semibold'>
        {label}
      </label>
      {/* 모바일: 텍스트 직접 입력 */}
      <input
        id={inputId}
        type='text'
        value={dateText}
        onChange={onTextChange}
        placeholder='YYYY-MM-DD'
        maxLength={10}
        aria-label={label}
        inputMode='numeric'
        className={mobileInputClass}
      />
      {/* 데스크탑: 캘린더 */}
      <CustomInput
        value={formatDate(date) ?? ''}
        placeholder='YYYY-MM-DD'
        className='hidden h-10 w-full bg-neutral-50 lg:flex'
        textAlign='left'
        onClick={onToggle}
      />
      {isOpen && (
        <div className='absolute top-full left-0 z-10 mt-1 rounded-[10px] bg-white shadow-lg'>
          <DatePicker
            selected={date}
            onChange={(d: Date | null) => {
              onDateChange(d);
              onClose();
            }}
            minDate={minDate ?? undefined}
            inline
            formatWeekDay={(nameOfDay: string) =>
              nameOfDay.toLowerCase().slice(0, 3)
            }
            renderCustomHeader={(props) => <CustomHeader {...props} />}
          />
        </div>
      )}
    </div>
  );
};
