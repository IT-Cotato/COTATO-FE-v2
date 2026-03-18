'use client';

import {useState} from 'react';
import Close from '@/assets/modal/close.svg';
import {Button} from '@repo/ui/components/buttons/Button';
import {DateField} from './DateField';

interface AddGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {generation: number; startDate: Date; endDate: Date}) => void;
}

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

function parseDateText(formatted: string): Date | null {
  if (formatted.length !== 10) return null;
  const date = new Date(formatted);
  if (isNaN(date.getTime())) return null;
  const [year, month, day] = formatted.split('-').map(Number);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export const AddGenerationModal = ({
  isOpen,
  onClose,
  onSave,
}: AddGenerationModalProps) => {
  const [generation, setGeneration] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDateText, setStartDateText] = useState('');
  const [endDateText, setEndDateText] = useState('');
  const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(
    null
  );

  if (!isOpen) return null;

  const resetState = () => {
    setGeneration('');
    setStartDate(null);
    setEndDate(null);
    setStartDateText('');
    setEndDateText('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = () => {
    if (!generation || !startDate || !endDate) return;
    onSave({generation: parseInt(generation), startDate, endDate});
    resetState();
  };

  const handleStartDateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setStartDateText(formatted);
    const parsed = parseDateText(formatted);
    setStartDate(parsed);
    if (parsed && endDate && parsed > endDate) setEndDate(null);
  };

  const handleEndDateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setEndDateText(formatted);
    setEndDate(parseDateText(formatted));
  };

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6'
      onClick={handleClose}>
      <div
        className='relative flex w-113.5 flex-col gap-4 rounded-[10px] bg-white px-4 py-5 lg:gap-6.5 lg:px-6.5 lg:py-7.5'
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className='absolute top-5 right-4 lg:top-6.5 lg:right-6.5'
          aria-label='닫기'>
          <Close className='h-6 w-6 cursor-pointer' />
        </button>

        <h2 className='text-h5 lg:text-h4 font-bold text-neutral-800'>
          활동 기수 추가하기
        </h2>

        <div className='flex flex-col gap-2.5'>
          <label className='text-h5 font-bold text-neutral-600 lg:font-semibold'>
            기수
          </label>
          <div className='flex items-center gap-2.5'>
            <input
              type='number'
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              className='text-h5 focus:ring-primary h-7.5 w-19 [appearance:textfield] rounded-[10px] bg-neutral-50 px-4 text-center font-semibold text-neutral-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              placeholder='13'
            />
            <span className='text-body-l font-semibold text-neutral-600'>
              기
            </span>
          </div>
        </div>

        <DateField
          label='시작 날짜'
          date={startDate}
          dateText={startDateText}
          isOpen={openCalendar === 'start'}
          onDateChange={(date) => {
            setStartDate(date);
            if (date && endDate && date > endDate) setEndDate(null);
          }}
          onTextChange={handleStartDateText}
          onToggle={() =>
            setOpenCalendar(openCalendar === 'start' ? null : 'start')
          }
          onClose={() => setOpenCalendar(null)}
        />

        <DateField
          label='종료 날짜'
          date={endDate}
          dateText={endDateText}
          isOpen={openCalendar === 'end'}
          minDate={startDate}
          onDateChange={setEndDate}
          onTextChange={handleEndDateText}
          onToggle={() =>
            setOpenCalendar(openCalendar === 'end' ? null : 'end')
          }
          onClose={() => setOpenCalendar(null)}
        />

        <Button
          label='추가하기'
          variant='primary'
          height={40}
          borderRadius={5}
          labelTypo='body_l'
          disabled={!generation || !startDate || !endDate}
          enableHover
          onClick={handleSubmit}
          className='w-full! lg:w-29!'
          wrapperClassName='mt-2.5 w-full lg:w-auto lg:self-end'
        />
      </div>
    </div>
  );
};
