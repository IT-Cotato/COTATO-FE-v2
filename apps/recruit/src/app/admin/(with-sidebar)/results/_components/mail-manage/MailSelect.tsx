'use client';

import clsx from 'clsx';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {mailTabs} from '@/schemas/admin/admin-mail.type';

interface MailSelectProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MailSelect = ({activeTab, onTabChange}: MailSelectProps) => {
  return (
    <nav aria-label='합격자 관리 - 메일 전송 탭'>
      <ul className='flex justify-between gap-8 lg:justify-start lg:gap-12.5'>
        {mailTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <li key={tab}>
              <FullButton
                label={tab}
                borderRadius={0}
                backgroundColor='white'
                textColor={isActive ? 'neutral-800' : 'neutral-500'}
                className={clsx(
                  'border-none px-0',
                  'text-body-l-b! lg:text-h5!'
                )}
                wrapperClassName='h-5.5 lg:h-10'
                onClick={() => onTabChange(tab)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
