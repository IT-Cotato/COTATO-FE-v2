'use client';

import {ROUTES} from '@/constants/routes';
import {useAttendanceStatusQuery} from '@/hooks/queries/useAttendanceStatus.query';
import {useAuthStore} from '@/store/useAuthStore';
import clsx from 'clsx';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useShallow} from 'zustand/shallow';
import AttendanceIcon from '@/assets/icons/attendance.svg';
import ArrowIcon from '@/assets/arrows/arrow-right.svg';

export const HomeMobileAttendanceContainer = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const router = useRouter();

  const {isAuthenticated} = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
    }))
  );

  const {data: attendanceStatus} = useAttendanceStatusQuery(isAuthenticated);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      router.push(ROUTES.MYPAGE_ATTENDANCE);
    }
  };

  return (
    <div
      className={clsx(
        'fixed right-7 bottom-7 z-30 transition-all duration-300',
        'md:hidden'
      )}>
      {attendanceStatus?.openStatus === 'OPEN' && (
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
      )}
    </div>
  );
};
