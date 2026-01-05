'use client';

import {useState, useEffect, useMemo} from 'react';

interface CountdownTimerProps {
  isDark?: boolean;
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

export default function CountdownTimer({isDark = false}: CountdownTimerProps) {
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
