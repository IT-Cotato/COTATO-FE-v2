'use client';

import {mailTabs} from '@/schemas/admin-result-type';

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
            activeTab === tab
              ? 'font-bold text-neutral-800'
              : 'font-medium text-neutral-500 hover:text-neutral-600'
          }`}>
          {tab}
        </section>
      ))}
    </div>
  );
};
