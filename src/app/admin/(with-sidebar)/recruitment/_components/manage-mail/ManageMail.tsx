'use client';

import {useState} from 'react';
import {useManageMail} from '@/hooks/useManageMail';
import {MailHeader} from './MailHeader';
import {MailField} from './MailField';
import {MailSendFooter} from './MailSendFooter';
import {MailConfirmModal} from '@/components/modal/MailConfirmModal';
import {MAIL_WAITING} from '@/mocks/mock-mail';
import {MAIL_DATA_MAP} from '@/schemas/admin-result-type';

interface ManageMailProps {
  mailType?: keyof typeof MAIL_DATA_MAP;
  alwaysAble?: boolean;
}

export const ManageMail = ({
  mailType = '지원 알림 메일',
  alwaysAble = false,
}: ManageMailProps) => {
  const {
    isEditing,
    content,
    setContent,
    isChanged,
    canSendMail,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
  } = useManageMail(mailType, alwaysAble);

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleConfirmSend = () => {
    console.log(`${mailType} 전송 완료`);
    setIsSent(true);
    setIsSendModalOpen(false);
  };

  const finalCanSend = alwaysAble ? canSendMail && !isSent : canSendMail;

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
        canSendMail={finalCanSend}
        onSend={() => setIsSendModalOpen(true)}
        waitingCount={MAIL_WAITING}
      />
      <MailConfirmModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onConfirm={handleConfirmSend}
        title={`메일을 전송하시겠습니까?`}
      />
    </div>
  );
};
