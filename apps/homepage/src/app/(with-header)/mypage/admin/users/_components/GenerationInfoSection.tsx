'use client';

import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {CustomInput} from '@/app/(with-header)/mypage/admin/users/_components/calendar/CustomInput';
import {CustomHeader} from '@/app/(with-header)/mypage/admin/users/_components/calendar/CustomHeader';
import RightArrow from '@/assets/arrows/arrow-right.svg';
import {useGenerationDetailQuery} from '@/hooks/queries/useGeneration.query';
import {useUpdateGenerationMutation} from '@/hooks/mutations/useGeneration.mutation';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

interface GenerationInfoSectionProps {
  selectedGeneration: number;
}

export const GenerationInfoSection = ({
  selectedGeneration,
}: GenerationInfoSectionProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [savedStartDate, setSavedStartDate] = useState<Date | null>(null);
  const [savedEndDate, setSavedEndDate] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: generationDetail,
    isLoading,
    isError,
  } = useGenerationDetailQuery(selectedGeneration);
  const {mutate: updateGen} = useUpdateGenerationMutation();

  useEffect(() => {
    if (generationDetail) {
      setSavedStartDate(new Date(`${generationDetail.startDate}T00:00:00`));
      setSavedEndDate(new Date(`${generationDetail.endDate}T00:00:00`));
    } else {
      setSavedStartDate(null);
      setSavedEndDate(null);
    }
    setIsEditing(false);
  }, [generationDetail]);

  const handleEdit = () => {
    setStartDate(savedStartDate);
    setEndDate(savedEndDate);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!startDate || !endDate) {
      alert('시작 일자와 종료 일자를 모두 입력해주세요.');
      return;
    }
    if (startDate > endDate) {
      alert('시작 일자는 종료 일자보다 이전이어야 합니다.');
      return;
    }
    updateGen(
      {
        generationId: selectedGeneration,
        data: {
          startDate: startDate.toLocaleDateString('sv-SE'),
          endDate: endDate.toLocaleDateString('sv-SE'),
        },
      },
      {
        onSuccess: () => {
          setSavedStartDate(startDate);
          setSavedEndDate(endDate);
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setStartDate(savedStartDate);
    setEndDate(savedEndDate);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isError || !generationDetail) {
    return (
      <div className='flex justify-center'>
        <p className='text-body-m text-neutral-500'>
          데이터를 불러오는 데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[5px] rounded-[10px] bg-neutral-100 px-5.25 py-4.25'>
      <p className='text-body-l font-semibold text-neutral-800'>활동정보</p>

      <div className='flex items-end gap-3'>
        {/* 기수 정보 */}
        <div className='flex flex-col gap-3'>
          <span className='text-body-l font-medium text-neutral-600'>
            기수 정보
          </span>
          <div className='text-body-m flex h-8 w-17 items-center justify-center rounded-lg bg-white font-semibold text-neutral-700 shadow-[0_6px_15px_0_rgba(0,0,0,0.10)]'>
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
                    formatWeekDay={(nameOfDay: string) =>
                      nameOfDay.toLowerCase().slice(0, 3)
                    }
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
                    formatWeekDay={(nameOfDay: string) =>
                      nameOfDay.toLowerCase().slice(0, 3)
                    }
                    renderCustomHeader={(props) => <CustomHeader {...props} />}
                  />
                </div>
              </>
            ) : (
              <>
                <CustomInput
                  value={
                    savedStartDate
                      ? savedStartDate.toLocaleDateString('sv-SE')
                      : undefined
                  }
                  placeholder='시작 일자'
                  disabled
                  hideIcon
                />
                <div className='flex items-center justify-center px-2'>
                  <RightArrow className='h-4 w-4 text-neutral-400' />
                </div>
                <CustomInput
                  value={
                    savedEndDate
                      ? savedEndDate.toLocaleDateString('sv-SE')
                      : undefined
                  }
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
                className='text-body-m rounded-lg bg-white px-5 py-2 font-semibold text-neutral-600 transition-colors hover:bg-neutral-300'>
                취소
              </button>
              <button
                type='button'
                onClick={handleSave}
                className='bg-primary text-body-m hover:bg-active rounded-lg px-5 py-2 font-semibold text-white transition-colors'>
                저장
              </button>
            </>
          ) : (
            <button
              type='button'
              onClick={handleEdit}
              className='text-body-m hover:bg-active rounded-lg bg-neutral-600 px-5 py-2 font-semibold text-white transition-colors'>
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
