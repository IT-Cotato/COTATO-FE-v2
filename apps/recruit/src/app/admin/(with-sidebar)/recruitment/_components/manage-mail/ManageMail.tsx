'use client';

import {useState} from 'react';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useManageMail} from '@/hooks/useManageMail';
import {MailHeader} from './MailHeader';
import {MailField} from './MailField';
import {MailSendFooter} from './MailSendFooter';
import {MailConfirmModal} from '@/components/modal/MailConfirmModal';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useGenerationStore} from '@/store/useGenerationStore';

interface ManageMailProps {
  mailType?: string;
  alwaysAble?: boolean;
  generationId: number;
}

export const ManageMail = ({
  mailType = '지원 알림 메일',
  alwaysAble = false,
  generationId,
}: ManageMailProps) => {
  const {isRecruiting} = useRecruitmentStore();
  const {generations} = useGenerationStore();

  const isGenerationExist = generations.some(
    (g) => g.generationId === generationId
  );

  const {
    isLoading,
    isEditing,
    content,
    setContent,
    isSent,
    waitingCount,
    status,
    isSending,
    isRefreshing,
    isChanged,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleSendClick,
    refreshStatus,
  } = useManageMail(generationId, mailType);

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const labelMap: Record<string, string> = {
    '지원 알림 메일': '대기자',
    '합격자 메일': '합격자',
    '불합격자 메일': '불합격자',
    '예비합격자 메일': '예비합격자',
  };

  const currentLabel = labelMap[mailType] || '대상자';

  const canAccess = isGenerationExist || alwaysAble;
  const hasPermission = isRecruiting || alwaysAble;

  const finalCanEdit = canAccess && !isSent;
  const finalCanSend =
    canAccess && hasPermission && !isSent && waitingCount > 0;

  if (isLoading)
    return (
      <div className='flex w-full justify-center'>
        <Spinner size='lg' />
      </div>
    );

  return (
    <div className='flex w-full flex-col gap-3.5'>
      <MailHeader
        isEditing={isEditing}
        isChanged={isChanged}
        onEdit={handleEditClick}
        onCancel={handleCancelClick}
        onSave={handleSaveClick}
        canEdit={finalCanEdit}
      />
      <MailField
        isEditing={isEditing}
        content={content}
        setContent={setContent}
      />
      <MailSendFooter
        canSendMail={finalCanSend}
        isSent={isSent}
        isInProgress={isSending}
        onSend={() => setIsSendModalOpen(true)}
        waitingCount={waitingCount}
        waitingLabel={currentLabel}
        successCount={status.successCount}
        failCount={status.failCount}
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
