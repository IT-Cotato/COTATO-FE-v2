'use client';

import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {CustomInput} from './calendar/CustomInput';
import {CustomHeader} from './calendar/CustomHeader';
import RightArrow from '@/assets/arrows/arrow-right.svg';

interface GenerationInfoSectionProps {
  selectedGeneration: number;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export const GenerationInfoSection = ({
  selectedGeneration,
  initialStartDate = null,
  initialEndDate = null,
}: GenerationInfoSectionProps) => {
  // TODO: API 연동 시 서버 데이터로 교체
  const [savedStartDate, setSavedStartDate] = useState<Date | null>(initialStartDate);
  const [savedEndDate, setSavedEndDate] = useState<Date | null>(initialEndDate);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setSavedStartDate(initialStartDate);
    setSavedEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const handleEdit = () => {
    setStartDate(savedStartDate);
    setEndDate(savedEndDate);
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: API 연동 시 저장 로직 구현
    setSavedStartDate(startDate);
    setSavedEndDate(endDate);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setStartDate(savedStartDate);
    setEndDate(savedEndDate);
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col gap-[5px] rounded-[10px] bg-neutral-100 px-[21px] py-[13px]'>
      <p className='text-body-l font-semibold text-neutral-800'>활동정보</p>

      <div className='flex items-end gap-3'>
        {/* 기수 정보 */}
        <div className='flex flex-col gap-3'>
          <span className='text-body-l font-medium text-neutral-600'>
            기수 정보
          </span>
          <div className='flex h-8 w-17 items-center justify-center rounded-[8px] bg-white text-body-m font-semibold text-neutral-700 shadow-[0_6px_15px_0_rgba(0,0,0,0.10)]'>
            {selectedGeneration}기
          </div>
        </div>

        {/* 활동기간 */}
        <div className='flex flex-col gap-2'>
          <span className='text-body-l font-medium text-neutral-600'>
            활동기간
          </span>
          <div className='flex items-center gap-2.5'>
            {isEditing ? (
              <>
                <div className='relative'>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => {
                      setStartDate(date);
                      if (date && endDate && date > endDate) {
                        setEndDate(null);
                      }
                    }}
                    dateFormat='yyyy-MM-dd'
                    placeholderText='시작 일자'
                    customInput={<CustomInput />}
                    popperPlacement='bottom-start'
                    formatWeekDay={(nameOfDay: string) => nameOfDay.toLowerCase().slice(0, 3)}
                    renderCustomHeader={(props) => <CustomHeader {...props} />}
                  />
                </div>
                <div className='flex items-center justify-center px-2'>
                  <RightArrow className='h-4 w-4 text-neutral-400' />
                </div>
                <div className='relative'>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    minDate={startDate ?? undefined}
                    dateFormat='yyyy-MM-dd'
                    placeholderText='종료 일자'
                    customInput={<CustomInput />}
                    popperPlacement='bottom-start'
                    formatWeekDay={(nameOfDay: string) => nameOfDay.toLowerCase().slice(0, 3)}
                    renderCustomHeader={(props) => <CustomHeader {...props} />}
                  />
                </div>
              </>
            ) : (
              <>
                <CustomInput
                  value={savedStartDate ? savedStartDate.toLocaleDateString('ko-KR') : undefined}
                  placeholder='시작 일자'
                  disabled
                  hideIcon
                />
                <div className='flex items-center justify-center px-2'>
                  <RightArrow className='h-4 w-4 text-neutral-400' />
                </div>
                <CustomInput
                  value={savedEndDate ? savedEndDate.toLocaleDateString('ko-KR') : undefined}
                  placeholder='종료 일자'
                  disabled
                  hideIcon
                />
              </>
            )}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className='ml-auto flex gap-2'>
          {isEditing ? (
            <>
              <button
                type='button'
                onClick={handleCancel}
                className='rounded-lg bg-white px-5 py-2 text-body-m font-semibold text-neutral-600 transition-colors hover:bg-neutral-300'>
                취소
              </button>
              <button
                type='button'
                onClick={handleSave}
                className='rounded-lg bg-primary px-5 py-2 text-body-m font-semibold text-white transition-colors hover:bg-active'>
                저장
              </button>
            </>
          ) : (
            <button
              type='button'
              onClick={handleEdit}
              className='rounded-lg bg-neutral-600 text-white px-5 py-2 text-body-m font-semibold text-white transition-colors hover:bg-active'>
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
