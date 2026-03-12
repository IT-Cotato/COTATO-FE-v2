'use client';

import {useState, useMemo} from 'react';
import Image from 'next/image';
import PrevIcon from '@/assets/chevrons/chevron-left.svg';
import clsx from 'clsx';
import {SessionAttendance} from '@/schemas/mypage-mem/attendance/attendance.schema';
import {ATTENDANCE_STATUS} from '@/constants/mypage-mem/mypage-activity';

interface SessionCardProps {
  session: SessionAttendance;
  generationId: number;
  isExpanded: boolean;
  onToggle: () => void;
  onAttendance: () => void;
}

const DEFAULT_IMAGE = '/images/attendance/default-session.svg';

export const SessionCard = ({
  session,
  generationId,
  isExpanded,
  onToggle,
  onAttendance,
}: SessionCardProps) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const images = useMemo(
    () =>
      session.imageUrls && session.imageUrls.length > 0
        ? session.imageUrls
        : [DEFAULT_IMAGE],
    [session.imageUrls]
  );

  const {isCompleted, showAttendanceButton, isButtonActive} = useMemo(() => {
    // NOT_YET이 아니고 실제 결과 값이 있을 때
    const hasFinalResult =
      session.myAttendanceResult && session.myAttendanceResult !== 'NOT_YET';

    const status = session.attendanceStatus;

    // OPEN, LATE일 때만 출석하기 가능
    const canAttend = status === 'OPEN' || status === 'LATE';

    // 출석하기 버튼 렌더링 여부
    const shouldShowButton =
      !hasFinalResult && (status === 'BEFORE' || canAttend);

    return {
      isCompleted: hasFinalResult,
      showAttendanceButton: shouldShowButton,
      isButtonActive: canAttend, // false면 disabled
    };
  }, [session.myAttendanceResult, session.attendanceStatus]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImgIdx > 0) setCurrentImgIdx((prev) => prev - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImgIdx < images.length - 1) setCurrentImgIdx((prev) => prev + 1);
  };

  return (
    <div className='flex w-full flex-col gap-2 overflow-hidden rounded-[10px] bg-neutral-50 px-5.5 py-2.5 md:gap-5 md:py-6'>
      <div
        className='flex cursor-pointer items-center justify-between gap-1 self-stretch'
        onClick={onToggle}>
        <div className='flex h-12 min-w-0 flex-col md:h-15.5'>
          <span className='md:text-h5 text-body-l text-neutral-400'>
            {session.sessionDateTime.split('T')[0].replaceAll('-', '.')}
          </span>
          <h3 className='text-h5 md:text-h3 truncate font-bold text-neutral-800'>
            {session.title}
          </h3>
        </div>
        <div
          className='flex shrink-0 items-center gap-4'
          onClick={(e) => e.stopPropagation()}>
          {isCompleted ? (
            <div
              className={clsx(
                'md:shadow-default shadow-mobile-dropdown text-body-m-sb flex h-8 w-18.75 items-center justify-center rounded-[10px] text-white',
                ATTENDANCE_STATUS[
                  session.myAttendanceResult as keyof typeof ATTENDANCE_STATUS
                ].className
              )}>
              {
                ATTENDANCE_STATUS[
                  session.myAttendanceResult as keyof typeof ATTENDANCE_STATUS
                ].label
              }
            </div>
          ) : (
            showAttendanceButton && (
              <button
                onClick={isButtonActive ? onAttendance : undefined}
                disabled={!isButtonActive}
                className={clsx(
                  'md:shadow-default text-body-m-sb flex h-8 w-29 items-center justify-center rounded-[10px] text-white transition-all',
                  isButtonActive
                    ? 'bg-primary cursor-pointer'
                    : 'bg-text-disabled cursor-default'
                )}>
                출석하기
              </button>
            )
          )}
        </div>
      </div>
      {isExpanded && (
        <div className='flex h-full w-full flex-col gap-4 self-stretch md:flex-row md:items-center md:gap-7'>
          <div className='relative hidden h-57.5 w-87.5 shrink-0 overflow-hidden rounded-[10px] bg-neutral-200 md:block'>
            <Image
              src={images[currentImgIdx]!}
              alt='session'
              fill
              className='object-cover'
              priority
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  disabled={currentImgIdx === 0}
                  className='absolute top-1/2 left-5.25 z-10 -translate-y-1/2 cursor-pointer disabled:opacity-30'>
                  <PrevIcon className='h-6 w-6 text-white' />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentImgIdx === images.length - 1}
                  className='absolute top-1/2 right-5.25 z-10 -translate-y-1/2 rotate-180 cursor-pointer disabled:opacity-30'>
                  <PrevIcon className='h-6 w-6 text-white' />
                </button>
              </>
            )}
          </div>
          <div className='no-scrollbar w-full rounded-[10px] bg-white px-8.5 md:h-57.5 md:overflow-y-auto'>
            <div className='flex flex-col justify-center gap-2 py-5.25 md:min-h-full md:gap-3.75 md:py-9'>
              <div className='flex flex-col md:gap-1'>
                <span className='md:text-h5 text-[14px] text-neutral-400'>
                  코테이토 {generationId}기
                </span>
                <h4 className='text-h5 md:text-h3 font-bold text-neutral-800'>
                  {session.title}
                </h4>
              </div>
              <div className='h-px w-full shrink-0 bg-neutral-200' />
              <div className='flex flex-row gap-2.75 md:gap-10'>
                <div className='flex flex-1 flex-col gap-1.75 md:gap-1'>
                  <span className='md:text-h5 text-body-l-b text-neutral-400'>
                    세션 설명
                  </span>
                  <p className='md:text-h5 text-body-m text-neutral-600'>
                    {session.description || '설명이 없습니다.'}
                  </p>
                </div>
                <div className='flex flex-col gap-1 md:w-94.25 md:shrink-0'>
                  <span className='md:text-h5 text-body-l-b text-neutral-400'>
                    세션 장소
                  </span>
                  <p className='md:text-h5 text-body-m text-neutral-600'>
                    {session.sessionType === 'ONLINE' && !session.placeName ? (
                      '온라인 세션'
                    ) : (
                      <>
                        {session.placeName || ''}
                        {session.roadNameAddress
                          ? ` ${session.roadNameAddress}`
                          : ''}
                        {!session.placeName &&
                          !session.roadNameAddress &&
                          '장소 정보가 없습니다.'}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
