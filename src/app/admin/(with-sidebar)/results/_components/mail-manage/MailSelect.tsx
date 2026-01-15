'use client';

import clsx from 'clsx';
import {FullButton} from '@/components/button/FullButton';
import {mailTabs} from '@/schemas/admin/admin-mail-type';

interface MailSelectProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MailSelect = ({activeTab, onTabChange}: MailSelectProps) => {
  return (
    <nav aria-label='합격자 관리 - 메일 전송 탭'>
      <ul className='flex gap-17.5'>
        {mailTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <li key={tab}>
              <FullButton
                label={tab}
                height={40}
                borderRadius={0}
                backgroundColor='neutral-50'
                textColor={isActive ? 'neutral-800' : 'neutral-500'}
                className={clsx('px-0', 'border-none')}
                onClick={() => onTabChange(tab)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
