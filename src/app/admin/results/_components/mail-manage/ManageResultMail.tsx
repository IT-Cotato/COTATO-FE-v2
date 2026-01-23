'use client';

import {useState} from 'react';
import {ManageMail} from '@/app/admin/recruitment/_components/manage-mail/ManageMail';
import {MailSelect} from '@/app/admin/results/_components/mail-manage/MailSelect';

interface ManageResultMailProps {
  generationId: number;
}

export const ManageResultMail = ({generationId}: ManageResultMailProps) => {
  const [activeTab, setActiveTab] = useState('합격자 메일');

  return (
    <div className='flex flex-col gap-6'>
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
