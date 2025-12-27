'use client';
import {ManageMail} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/ManageMail';
import {MailSelect} from '@/app/admin/(with-sidebar)/results/_components/MailSelect';
import {useState} from 'react';

export const ManageResultMail = () => {
  const [activeTab, setActiveTab] = useState('합격자 메일');

  return (
    <div className='flex flex-col gap-6'>
      <MailSelect activeTab={activeTab} onTabChange={setActiveTab} />
      <ManageMail key={activeTab} mailType={activeTab} alwaysAble={true} />
    </div>
  );
};
