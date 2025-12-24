'use client';

import {MailField} from './MailField';
import {MailSendFooter} from './MailSendFooter';
import {MailHeader} from './MailHeader';
import {MAIL_WAITING} from '@/mocks/mock-mail';
import {useManageMail} from '@/hooks/useManageMail';

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

  const handleSendMail = () => {
    console.log('메일 전송');
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
        onSend={handleSendMail}
      />
    </div>
  );
};
