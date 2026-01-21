'use client';

import {useState} from 'react';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useManageMail} from '@/hooks/useManageMail';
import {MailHeader} from './MailHeader';
import {MailField} from './MailField';
import {MailSendFooter} from './MailSendFooter';
import {MailConfirmModal} from '@/components/modal/MailConfirmModal';
import {Spinner} from '@/components/ui/Spinner';

interface ManageMailProps {
  mailType?: string;
  alwaysAble?: boolean;
}

export const ManageMail = ({
  mailType = '지원 알림 메일',
  alwaysAble = false,
}: ManageMailProps) => {
  const {generation, isRecruiting} = useRecruitmentStore();

  const labelMap: Record<string, string> = {
    '지원 알림 메일': '대기자',
    '합격자 메일': '합격자',
    '불합격자 메일': '불합격자',
    '예비합격자 메일': '예비합격자',
  };

  const currentLabel = labelMap[mailType] || '대상자';

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
  const hasPermission = isRecruiting || alwaysAble;
  const finalCanSend = hasPermission && !isSent && waitingCount > 0;

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
        canSendMail={finalCanSend}
        isSent={isSent}
        onSend={() => setIsSendModalOpen(true)}
        waitingCount={waitingCount}
        waitingLabel={currentLabel}
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
