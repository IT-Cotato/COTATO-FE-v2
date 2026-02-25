'use client';

import {useState} from 'react';
import TrashIcon from '@/assets/trash/trash.svg';
import SearchIcon from '@repo/ui/assets/icons/search.svg';
import ClockIcon from '@/assets/clock/clock.svg';
import {SessionData} from '@/schemas/admin/session.schema';
import {LocationSearchModal} from './LocationSearchModal';

interface SessionEditFormProps {
  form: SessionData;
  onChange: (updater: (prev: SessionData) => SessionData) => void;
}

const INPUT_BASE =
  'rounded-lg border border-neutral-200 placeholder:text-neutral-600 outline-none bg-neutral-50';

const RADIO_BASE =
  'checked:after:bg-active relative h-6.5 w-6.5 appearance-none rounded-full border-2 border-neutral-300 after:absolute after:top-1/2 after:left-1/2 after:h-4 after:w-4 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:content-[""] focus:outline-none';

export const SessionEditForm = ({form, onChange}: SessionEditFormProps) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const set = <K extends keyof SessionData>(field: K, value: SessionData[K]) =>
    onChange((prev) => ({...prev, [field]: value}));

  const setAttendTime = (
    field: keyof SessionData['attendTime'],
    value: string
  ) =>
    onChange((prev) => ({
      ...prev,
      attendTime: {...prev.attendTime, [field]: value},
    }));

  return (
    <>
      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(place) => {
          onChange((prev) => ({
            ...prev,
            placeName: place.placeName,
            location: {
              latitude: Number(place.y),
              longitude: Number(place.x),
            },
          }));
          setIsLocationModalOpen(false);
        }}
      />
      <div className='flex w-full flex-col gap-3.75 rounded-[10px] bg-white px-8.5 py-9'>
        <div className='flex flex-col gap-1'>
          <p className='text-h5 text-neutral-400'>{form.generation}</p>
          <input
            type='text'
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder='9회차 세션'
            className={`text-h3 ${INPUT_BASE} px-4 py-3`}
          />
        </div>
        <div className='h-px w-full shrink-0 bg-neutral-200' />
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-12 gap-y-2'>
          <p className='text-h5 text-neutral-600'>세션 장소</p>
          <div className='flex items-center gap-5'>
            <div
              onClick={() => setIsLocationModalOpen(true)}
              className={`flex cursor-pointer items-center ${INPUT_BASE} h-8 w-27.5 gap-2.5 px-1.5 py-1.25`}>
              <SearchIcon className='h-4.5 w-4.5 shrink-0 text-neutral-600' />
              <span
                className={`text-body-m truncate ${form.placeName ? 'text-neutral-800' : 'text-neutral-600'}`}>
                {form.placeName || '장소 검색'}
              </span>
            </div>
            <input
              type='text'
              value={form.detailAddress}
              onChange={(e) => set('detailAddress', e.target.value)}
              placeholder='상세 장소 (예: 세미나실 1)'
              className={`text-body-m ${INPUT_BASE} h-8 w-27.5 px-1.5 py-1.25 placeholder:text-neutral-600`}
            />
            <button
              type='button'
              aria-label='장소 삭제'
              onClick={() => {
                onChange((prev) => ({
                  ...prev,
                  placeName: '',
                  detailAddress: '',
                }));
              }}
              className='shrink-0 cursor-pointer'>
              <TrashIcon className='h-6 w-6' />
            </button>
          </div>

          <p className='text-h5 text-neutral-600'>대면 여부</p>
          <div className='flex gap-4'>
            <label className='flex cursor-pointer items-center gap-1.5'>
              <input
                type='radio'
                name={`attendanceType-${form.sessionId}`}
                value='offline'
                checked={form.isOffline}
                onChange={() =>
                  onChange((prev) => ({
                    ...prev,
                    isOffline: true,
                    isOnline: false,
                  }))
                }
                className={RADIO_BASE}
              />
              <span className='text-body-m text-neutral-600'>대면</span>
            </label>
            <label className='flex cursor-pointer items-center gap-1.5'>
              <input
                type='radio'
                name={`attendanceType-${form.sessionId}`}
                value='online'
                checked={form.isOnline}
                onChange={() =>
                  onChange((prev) => ({
                    ...prev,
                    isOffline: false,
                    isOnline: true,
                  }))
                }
                className={RADIO_BASE}
              />
              <span className='text-body-m text-neutral-600'>비대면</span>
            </label>
          </div>

          <p className='text-h5 text-neutral-600'>출석 인정 시간</p>
          <div className='flex gap-5'>
            <div
              className={`flex items-center ${INPUT_BASE} h-8 w-27.5 gap-2.5 px-1.5 py-1.25`}>
              <ClockIcon className='h-4.5 w-4.5 shrink-0 text-neutral-600' />
              <input
                type='text'
                value={form.attendanceStartTime}
                onChange={(e) => set('attendanceStartTime', e.target.value)}
                placeholder='18:50'
                className='text-body-m w-full bg-transparent outline-none placeholder:text-neutral-600'
              />
            </div>
            <div
              className={`flex items-center ${INPUT_BASE} h-8 w-27.5 gap-2.5 px-1.5 py-1.25`}>
              <ClockIcon className='h-4.5 w-4.5 shrink-0 text-neutral-600' />
              <input
                type='text'
                value={form.attendTime.attendanceEndTime}
                onChange={(e) =>
                  setAttendTime('attendanceEndTime', e.target.value)
                }
                placeholder='19:00'
                className='text-body-m w-full bg-transparent outline-none placeholder:text-neutral-600'
              />
            </div>
          </div>

          <p className='text-h5 text-neutral-600'>지각 인정 시간</p>
          <div className='flex gap-5'>
            <div
              className={`flex items-center ${INPUT_BASE} h-8 w-27.5 gap-2.5 px-1.5 py-1.25`}>
              <ClockIcon className='h-4.5 w-4.5 shrink-0 text-neutral-600' />
              <input
                type='text'
                value={form.attendTime.lateEndTime}
                onChange={(e) => setAttendTime('lateEndTime', e.target.value)}
                placeholder='19:20'
                className='text-body-m w-full bg-transparent outline-none placeholder:text-neutral-600'
              />
            </div>
          </div>

          <p className='text-h5 text-neutral-600'>세션 설명</p>
          <input
            type='text'
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder='세션 설명을 입력해주세요.'
            className={`text-body-m ${INPUT_BASE} h-8 px-2`}
          />

          <p className='text-h5 self-start pt-1.5 text-neutral-600'>
            세션 내용
          </p>
          <textarea
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            placeholder='세션 내용을 입력해주세요.'
            rows={2}
            className={`text-body-m resize-none ${INPUT_BASE} px-2 py-1.5`}
          />
        </div>
      </div>
    </>
  );
};
