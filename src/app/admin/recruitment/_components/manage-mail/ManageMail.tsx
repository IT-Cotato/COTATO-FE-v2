'use client';

import {useState} from 'react';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useManageMail} from '@/hooks/useManageMail';
import {MailHeader} from './MailHeader';
import {MailField} from './MailField';
import {MailSendFooter} from './MailSendFooter';
import {MailConfirmModal} from '@/components/modal/MailConfirmModal';
import {Spinner} from '@/components/ui/Spinner';

export const ManageMail = ({mailType = '지원 알림 메일'}) => {
  const {generation} = useRecruitmentStore();
  const {
    isLoading,
    isEditing,
    content,
    setContent,
    isSent,
    waitingCount,
    jobStatus,
    isRefreshing,
    isChanged,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleSendClick,
    refreshStatus,
  } = useManageMail(Number(generation), mailType);

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  if (isLoading)
    return (
      <div className='flex w-full justify-center'>
        <Spinner size='lg' />
      </div>
    );

  return (
    <div className='flex w-full flex-col gap-5'>
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
        canSendMail={!isSent && waitingCount > 0}
        isSent={isSent}
        onSend={() => setIsSendModalOpen(true)}
        waitingCount={waitingCount}
        jobStatus={jobStatus}
        isRefreshing={isRefreshing}
        onRefresh={refreshStatus}
      />
      <MailConfirmModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onConfirm={() => {
          handleSendClick();
          setIsSendModalOpen(false);
        }}
        title={`${mailType}을 전송하시겠습니까?`}
      />
    </div>
  );
};
