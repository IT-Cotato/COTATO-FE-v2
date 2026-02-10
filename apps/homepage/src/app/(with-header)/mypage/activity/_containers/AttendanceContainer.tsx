'use client';

import {AttendanceTab} from '@/app/(with-header)/mypage/activity/_components/AttendanceTab';
import {AttendanceCheckContainer} from '@/app/(with-header)/mypage/activity/_containers/AttendanceCheckContainer';
import {AttendanceStatusContainer} from '@/app/(with-header)/mypage/activity/_containers/AttendanceStatusContainer';
import {TabType} from '@/schemas/mypage-mem/mypage-mem-type';
import {useState} from 'react';

export const AttendanceContainer = () => {
  const [activeTab, setActiveTab] = useState<TabType>('attendance');

  return (
    <div className='flex w-full flex-col items-center gap-7.5'>
      <AttendanceTab activeTab={activeTab} onTabChange={setActiveTab} />
      <AttendanceStatusContainer activeTab={activeTab} />
      <AttendanceCheckContainer activeTab={activeTab} />
    </div>
  );
};
