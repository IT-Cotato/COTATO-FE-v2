'use client';

import {TabType} from '@/schemas/mypage-mem/activity/mypage-mem-type';
import clsx from 'clsx';

interface AttendanceTabProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const AttendanceTab = ({activeTab, onTabChange}: AttendanceTabProps) => {
  const tabs: {id: TabType; label: string}[] = [
    {id: 'attendance', label: '출석 현황'},
    {id: 'penalty', label: '벌점 현황'},
  ];

  return (
    <div className='flex w-full pb-2.5 md:pb-0'>
      <div className='flex gap-5 px-2.5 md:gap-8.5 md:px-0'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'text-h5 md:text-body-l-sb relative w-19 pb-2 font-bold transition-colors md:font-semibold',
                isActive ? 'text-primary' : 'text-neutral-800'
              )}>
              {tab.label}
              {isActive && (
                <div className='bg-primary absolute bottom-0 h-[1.6px] w-full' />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
