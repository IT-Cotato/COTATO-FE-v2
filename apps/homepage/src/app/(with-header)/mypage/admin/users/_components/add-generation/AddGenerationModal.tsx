'use client';

import {useState} from 'react';
import DatePicker from 'react-datepicker';
import Close from '@/assets/modal/close.svg';
import 'react-datepicker/dist/react-datepicker.css';
import {CustomInput} from '../calendar/CustomInput';
import {CustomHeader} from '../calendar/CustomHeader';
import {Button} from '@repo/ui/components/buttons/Button';

interface AddGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {generation: number; startDate: Date; endDate: Date}) => void;
}

export const AddGenerationModal = ({
  isOpen,
  onClose,
  onSave,
}: AddGenerationModalProps) => {
  const [generation, setGeneration] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(
    null
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!generation || !startDate || !endDate) return;
    onSave({
      generation: parseInt(generation),
      startDate,
      endDate,
    });
    setGeneration('');
    setStartDate(null);
    setEndDate(null);
  };

  const formatDate = (date: Date | null) =>
    date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      : '';

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50'
      onClick={onClose}>
      <div
        className='relative flex w-113.5 flex-col gap-6.5 rounded-[10px] bg-white px-6.5 py-7.5'
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className='absolute top-6.5 right-6.5'
          aria-label='닫기'>
          <Close className='h-6 w-6 cursor-pointer' />
        </button>

        <h2 className='text-h4 font-bold text-neutral-800'>
          활동 기수 추가하기
        </h2>

        <div className='flex flex-col gap-2.5'>
          <label className='text-h5 font-semibold text-neutral-800'>기수</label>
          <div className='flex items-center gap-2.5'>
            <input
              type='number'
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              className='text-h5 focus:ring-primary h-7.5 w-[76px] [appearance:textfield] rounded-[10px] bg-neutral-50 px-4 text-center font-semibold text-neutral-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              placeholder='13'
            />
            <span className='text-body-l font-semibold text-neutral-600'>
              기
            </span>
          </div>
        </div>

        <div className='relative flex flex-col gap-2.5'>
          <label className='text-h5 font-semibold text-neutral-800'>
            시작 날짜
          </label>
          <CustomInput
            value={formatDate(startDate)}
            placeholder='YYYY-MM-DD'
            className='h-10 w-full bg-neutral-50'
            textAlign='left'
            onClick={() =>
              setOpenCalendar(openCalendar === 'start' ? null : 'start')
            }
          />
          {openCalendar === 'start' && (
            <div className='absolute top-full left-0 z-10 mt-1 rounded-[10px] bg-white shadow-lg'>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  setStartDate(date);
                  if (date && endDate && date > endDate) {
                    setEndDate(null);
                  }
                  setOpenCalendar(null);
                }}
                inline
                dayClassName={() => '!bg-transparent !font-normal'}
                formatWeekDay={(nameOfDay: string) =>
                  nameOfDay.toLowerCase().slice(0, 3)
                }
                renderCustomHeader={(props) => <CustomHeader {...props} />}
              />
            </div>
          )}
        </div>

        <div className='relative flex flex-col gap-2.5'>
          <label className='text-h5 font-semibold text-neutral-800'>
            종료 날짜
          </label>
          <CustomInput
            value={formatDate(endDate)}
            placeholder='YYYY-MM-DD'
            className='h-10 w-full bg-neutral-50'
            textAlign='left'
            onClick={() =>
              setOpenCalendar(openCalendar === 'end' ? null : 'end')
            }
          />
          {openCalendar === 'end' && (
            <div className='absolute top-full left-0 z-10 mt-1 rounded-[10px] bg-white shadow-lg'>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  setEndDate(date);
                  setOpenCalendar(null);
                }}
                minDate={startDate ?? undefined}
                inline
                dayClassName={() => '!bg-transparent !font-normal'}
                formatWeekDay={(nameOfDay: string) =>
                  nameOfDay.toLowerCase().slice(0, 3)
                }
                renderCustomHeader={(props) => <CustomHeader {...props} />}
              />
            </div>
          )}
        </div>

        <Button
          label='추가하기'
          variant='primary'
          width={116}
          height={40}
          borderRadius={5}
          labelTypo='body_l'
          disabled={!generation || !startDate || !endDate}
          enableHover
          onClick={handleSubmit}
          className='mt-2.5 self-end'
        />
      </div>
    </div>
  );
};
