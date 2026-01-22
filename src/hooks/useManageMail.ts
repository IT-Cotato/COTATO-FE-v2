'use client';

import {useState, useEffect, useCallback} from 'react';
import {useAdminMailQuery} from '@/hooks/queries/useAdminMail.query';
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

  const {
    save,
    send,
    isSaving,
    isSending: isSendPending,
  } = useAdminMailMutation(generationId, mailType);

  // 기수나 메일 타입이 바뀌면 모든 로컬 상태 초기화
  useEffect(() => {
    setIsEditing(false);
    setEditingContent(null);
    setActiveJobId(null);
    setJobStatus(null);
  }, [generationId, mailType]);

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
          refetchMailData();
        }
      } catch (error) {
        console.error('상태 조회 실패', error);
      } finally {
        setIsRefreshing(false);
      }
    },
    [mailType, generationId, refetchMailData]
  );

  useEffect(() => {
    const savedJobId = localStorage.getItem(
      `last_job_${mailType}_${generationId}`
    );
    if (savedJobId) {
      setActiveJobId(Number(savedJobId));
    }
  }, [mailType, generationId]);

  useEffect(() => {
    if (activeJobId !== null) {
      checkCurrentStatus(activeJobId);
    }
  }, [activeJobId, checkCurrentStatus]);

  const handleSendClick = () => {
    send(undefined, {
      onSuccess: (res) => {
        const newJobId = res.jobId;
        setActiveJobId(newJobId);
        localStorage.setItem(
          `last_job_${mailType}_${generationId}`,
          newJobId.toString()
        );
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
    isSending: isSendPending || activeJobId !== null,
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
