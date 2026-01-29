'use client';

import {useState} from 'react';
import {ManageMail} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/ManageMail';
import {MailSelect} from '@/app/admin/(with-sidebar)/results/_components/mail-manage/MailSelect';

interface ManageResultMailProps {
  generationId: number;
}

export const ManageResultMail = ({generationId}: ManageResultMailProps) => {
  const [activeTab, setActiveTab] = useState('합격자 메일');

  return (
    <div className='flex flex-col gap-3.5'>
      <MailSelect activeTab={activeTab} onTabChange={setActiveTab} />
      <ManageMail
        key={activeTab}
        mailType={activeTab}
        generationId={generationId}
        alwaysAble={true}
      />
    </div>
  );
};
