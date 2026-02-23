'use client';

import {useRecruitmentNoticeQuery} from '@/hooks/queries/useRecruitmentNotice.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import clsx from 'clsx';
import {useState, useEffect} from 'react';

interface CountdownTimerProps {
  highlightUnits?: boolean;
}

export const CountdownTimer = ({
  highlightUnits = false,
}: CountdownTimerProps) => {
  const {data: noticeData, isLoading} = useRecruitmentNoticeQuery();
  const [timeLeft, setTimeLeft] = useState(() => ({
    d: '0',
    h: '0',
    m: '0',
    s: '0',
  }));

  useEffect(() => {
    if (!noticeData?.endDate) return;

    const targetDate = new Date(noticeData.endDate).getTime();

    const initial = calculateTimeLeft(targetDate);
    setTimeLeft(initial);

    if (
      initial.d === '0' &&
      initial.h === '0' &&
      initial.m === '0' &&
      initial.s === '0'
    ) {
      return;
    }

    const timerId = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);
      if (
        remaining.d === '0' &&
        remaining.h === '0' &&
        remaining.m === '0' &&
        remaining.s === '0'
      ) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [noticeData]);

  const textColor = highlightUnits ? 'text-primary' : 'text-neutral-400';

  if (isLoading) return <Spinner />;

  return (
    <div className='flex items-end gap-10'>
      <div className='flex flex-col'>
        <p className={clsx(textColor, 'text-body-l-sb text-center')}>DAY</p>
        <span className='text-h1 text-center text-neutral-400'>
          {timeLeft.d}일
        </span>
      </div>

      <span className='text-h1 text-center text-neutral-400'>:</span>

      <div className='flex flex-col'>
        <p className={clsx(textColor, 'text-body-l-sb text-center')}>HOUR</p>
        <span className='text-h1 text-center text-neutral-400'>
          {timeLeft.h}시간
        </span>
      </div>

      <span className='text-h1 text-center text-neutral-400'>:</span>

      <div className='flex flex-col'>
        <p className={clsx(textColor, 'text-body-l-sb text-center')}>MINUTE</p>
        <span className='text-h1 text-center text-neutral-400'>
          {timeLeft.m}분
        </span>
      </div>

      <span className='text-h1 text-center text-neutral-400'>:</span>

      <div className='flex flex-col'>
        <p className={clsx(textColor, 'text-body-l-sb text-center')}>SECOND</p>
        <span className='text-h1 text-center text-neutral-400'>
          {timeLeft.s}초
        </span>
      </div>
    </div>
  );
};

const calculateTimeLeft = (targetTimestamp: number) => {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return {d: '0', h: '0', m: '0', s: '0'};
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    d: String(days),
    h: String(hours),
    m: String(minutes),
    s: String(seconds),
  };
};
