'use client';

import {AttendanceFloatingButton} from '@/app/(with-header)/(with-footer)/(home)/_components/AttendanceFloatingButton';
import {useAttendanceStatusQuery} from '@/hooks/queries/useAttendanceStatus.query';
import {useAuthStore} from '@/store/useAuthStore';
import clsx from 'clsx';
import {useShallow} from 'zustand/shallow';

export const HomeAttendanceContainer = () => {
  const {isAuthenticated} = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
    }))
  );
  const {data: attendanceStatus} = useAttendanceStatusQuery(isAuthenticated);

  return (
    <div
      className={clsx(
        'fixed right-7 bottom-7 z-30 transition-all duration-300',
        'md:hidden'
      )}>
      {attendanceStatus?.openStatus === 'OPEN' && <AttendanceFloatingButton />}
    </div>
  );
};
