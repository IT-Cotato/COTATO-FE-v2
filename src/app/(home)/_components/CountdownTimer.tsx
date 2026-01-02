'use client';

import {useState, useEffect, useMemo} from 'react';

interface CountdownTimerProps {
  isDark?: boolean;
}

const calculateTimeLeft = (targetTimestamp: number) => {
  const now = new Date().getTime();
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

export default function CountdownTimer({isDark = false}: CountdownTimerProps) {
  // TODO: 추후 API에서 받아온 targetDate로 교체 예정
  const targetDate = useMemo(
    () => new Date('2026-03-01T00:00:00').getTime(),
    []
  );

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const textColor = isDark ? 'text-white' : 'text-neutral-600';

  return (
    <div className='flex items-center justify-center gap-12 text-h1'>
      <span className={textColor}>{timeLeft.h}</span>
      <span className={textColor}>:</span>
      <span className={textColor}>{timeLeft.m}</span>
      <span className={textColor}>:</span>
      <span className={textColor}>{timeLeft.s}</span>
    </div>
  );
}
