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
    <div className='flex w-full flex-col gap-5 overflow-hidden rounded-[10px] bg-neutral-50 px-5.5 py-6'>
      <div
        className='flex cursor-pointer items-center justify-between self-stretch'
        onClick={onToggle}>
        <div className='flex h-15.5 min-w-24 flex-col'>
          <span className='text-h5 text-neutral-400'>
            {session.sessionDateTime.split('T')[0].replaceAll('-', '.')}
          </span>
          <h3 className='text-h3 text-neutral-800'>{session.title}</h3>
        </div>
        <div
          className='flex items-center gap-4'
          onClick={(e) => e.stopPropagation()}>
          {isCompleted ? (
            <div
              className={clsx(
                'text-body-m-sb shadow-default flex h-8 w-18.75 items-center justify-center rounded-[10px] text-white',
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
                  'text-body-m-sb shadow-default flex h-8 w-29 items-center justify-center rounded-[10px] text-white transition-all',
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
        <div className='flex h-full w-full items-center gap-7 self-stretch'>
          <div className='relative h-57.5 w-87.5 shrink-0 overflow-hidden rounded-[10px] bg-neutral-200'>
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
          <div className='no-scrollbar h-57.5 w-full overflow-y-auto rounded-[10px] bg-white px-8.5'>
            <div className='flex min-h-full flex-col justify-center gap-3.75 py-9'>
              <div className='flex flex-col gap-1'>
                <span className='text-h5 text-neutral-400'>
                  코테이토 {generationId}기
                </span>
                <h4 className='text-h3 text-neutral-800'>{session.title}</h4>
              </div>
              <div className='h-px w-full shrink-0 bg-neutral-200' />
              <div className='flex gap-10'>
                <div className='flex w-48.25 flex-1 flex-col gap-1'>
                  <span className='text-h5 shrink-0 text-neutral-400'>
                    세션 설명
                  </span>
                  <p className='text-h5 text-neutral-600'>
                    {session.description || '설명이 없습니다.'}
                  </p>
                </div>
                <div className='flex w-94.25 shrink-0 flex-col gap-1'>
                  <span className='text-h5 shrink-0 whitespace-nowrap text-neutral-400'>
                    세션 장소
                  </span>
                  <p className='text-h5 text-neutral-600'>
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
