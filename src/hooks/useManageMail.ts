'use client';

import {useState, useEffect, useCallback} from 'react';
import {useAdminMailQuery} from './queries/useAdminMail.query';
import {useAdminMailMutation} from '@/hooks/mutations/useAdminMail.mutation';
import {getMailJobStatus} from '@/services/api/admin/admin-mail.api';
import {MailJobStatus} from '@/schemas/admin/admin-mail.type';

export const useManageMail = (generationId: number, mailType: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<number | null>(null);
  const [jobStatus, setJobStatus] = useState<MailJobStatus | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data,
    isLoading,
    refetch: refetchMailData,
  } = useAdminMailQuery(generationId, mailType);
  const {save, send, isSaving} = useAdminMailMutation(generationId, mailType);

  const checkCurrentStatus = useCallback(
    async (jobId: number) => {
      setIsRefreshing(true);
      try {
        const isNotification = mailType === '지원 알림 메일';
        const status = await getMailJobStatus(jobId, isNotification);
        setJobStatus(status);

        if (status.isCompleted) {
          setActiveJobId(null);
          localStorage.removeItem(`last_job_${mailType}_${generationId}`);
          refetchMailData(); // 메일 전송 완료 여부 동기화
        }
      } catch (error) {
        console.error('상태 조회 실패', error);
      } finally {
        setIsRefreshing(false);
      }
    },
    [mailType, generationId, refetchMailData]
  );

  // 페이지 진입 시 로컬스토리지에 진행 중인 작업이 있는지 확인
  useEffect(() => {
    const savedJobId = localStorage.getItem(
      `last_job_${mailType}_${generationId}`
    );
    if (savedJobId) {
      const jobId = Number(savedJobId);
      setActiveJobId(jobId);
      checkCurrentStatus(jobId);
    }
  }, [mailType, generationId, checkCurrentStatus]);

  const handleSendClick = () => {
    send(undefined, {
      onSuccess: (res) => {
        const newJobId = res.jobId;
        setActiveJobId(newJobId);
        localStorage.setItem(
          `last_job_${mailType}_${generationId}`,
          newJobId.toString()
        );
        checkCurrentStatus(newJobId);
      },
    });
  };

  const currentContent =
    editingContent !== null ? editingContent : (data?.content ?? '');
  const waitingCount = data
    ? 'subscriberCount' in data
      ? data.subscriberCount
      : data.recipientCount
    : 0;

  return {
    isLoading,
    isSaving,
    isRefreshing,
    isSending: activeJobId !== null,
    isEditing,
    content: currentContent,
    setContent: (val: string) => setEditingContent(val),
    isSent: data?.isSent ?? false,
    waitingCount,
    jobStatus,
    isChanged: editingContent !== null && data?.content !== editingContent,
    handleEditClick: () => setIsEditing(true),
    handleCancelClick: () => {
      setEditingContent(null);
      setIsEditing(false);
    },
    handleSaveClick: () =>
      save(currentContent, {onSuccess: () => setIsEditing(false)}),
    handleSendClick,
    refreshStatus: () => activeJobId && checkCurrentStatus(activeJobId),
  };
};
