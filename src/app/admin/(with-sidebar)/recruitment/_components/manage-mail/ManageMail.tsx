'use client';

import {useState} from 'react';

import {MAIL_WAITING} from '@/mocks/mock-mail';
import {useManageMail} from '@/hooks/useManageMail';
import {MailHeader} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/MailHeader';
import {MailField} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/MailField';
import {MailSendFooter} from '@/app/admin/(with-sidebar)/recruitment/_components/manage-mail/MailSendFooter';
import {RecruitmentModal} from '@/app/admin/(with-sidebar)/recruitment/_components/RecruitmentModal';

export const ManageMail = () => {
  const {
    isEditing,
    content,
    setContent,
    isChanged,
    canSendMail,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
  } = useManageMail();

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const handleConfirmSend = () => {
    console.log('메일 전송:', content);
    setIsSendModalOpen(false);
  };

  return (
    <div className='flex w-full flex-col items-start gap-5'>
      <MailHeader
        isEditing={isEditing}
        isChanged={isChanged}
        onEdit={handleEditClick}
        onCancel={handleCancelClick}
        onSave={handleSaveClick}
      />
      <MailField
        isEditing={isEditing}
        content={content}
        setContent={setContent}
      />
      <MailSendFooter
        waitingCount={MAIL_WAITING}
        canSendMail={canSendMail}
        onSend={() => setIsSendModalOpen(true)}
      />
      <RecruitmentModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onConfirm={handleConfirmSend}
        content=' 메일을 전송하시겠습니까?'
      />
    </div>
  );
};
