'use client';

import clsx from 'clsx';
import {useState, useEffect, useMemo} from 'react';

interface CountdownTimerProps {
  highlightUnits?: boolean;
}

const calculateTimeLeft = (targetTimestamp: number) => {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return {h: '00', m: '00', s: '00'};
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    h: String(hours).padStart(2, '0'),
    m: String(minutes).padStart(2, '0'),
    s: String(seconds).padStart(2, '0'),
  };
};

export default function CountdownTimer({
  highlightUnits = false,
}: CountdownTimerProps) {
  // 서버/첫 렌더에서도 항상 동일한 값
  const [timeLeft, setTimeLeft] = useState<{h: string; m: string; s: string}>(
    () => ({h: '00', m: '00', s: '00'})
  );

  // 목표 시간 (추후 API 연동 가능)
  const targetDate = useMemo(
    () => new Date('2026-03-01T00:00:00').getTime(),
    []
  );

  useEffect(() => {
    const tick = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    // 첫 업데이트는 브라우저 페인트 이후에 실행
    const rafId = requestAnimationFrame(tick);
    const timerId = setInterval(tick, 1000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(timerId);
    };
  }, [targetDate]);

  const textColor = highlightUnits ? 'text-primary' : 'text-neutral-400';

  return (
    <div className='flex items-end gap-10'>
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
}
