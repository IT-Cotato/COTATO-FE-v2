'use client';

import {mailTabs} from '@/constants/admin/admin-result';

interface MailSelectProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MailSelect = ({activeTab, onTabChange}: MailSelectProps) => {
  return (
    <div className='flex gap-17.5'>
      {mailTabs.map((tab) => (
        <section
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`cursor-pointer text-h5 transition-colors ${
            activeTab === tab ? 'text-neutral-800' : 'text-neutral-500'
          }`}>
          {tab}
        </section>
      ))}
    </div>
  );
};
