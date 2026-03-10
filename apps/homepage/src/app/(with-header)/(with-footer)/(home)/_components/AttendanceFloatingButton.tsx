'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import clsx from 'clsx';
import AttendanceIcon from '@/assets/icons/attendance.svg';
import ArrowIcon from '@/assets/arrows/arrow-right.svg';
import {ROUTES} from '@/constants/routes';

export const AttendanceFloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      router.push(ROUTES.MYPAGE_ATTENDANCE);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label='출석하기 버튼'
      className={clsx(
        'bg-primary/60 animate-attendance flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out',
        'rounded-[40px] font-bold whitespace-nowrap text-white',

        isExpanded ? 'h-14 w-46.25 px-6' : 'h-14 w-14'
      )}>
      {isExpanded ? (
        <div className='animate-fadeIn flex flex-row items-center gap-2.5'>
          <p>출석하러 가기</p>
          <ArrowIcon className='w-7 text-white' />
        </div>
      ) : (
        <AttendanceIcon />
      )}
    </button>
  );
};
