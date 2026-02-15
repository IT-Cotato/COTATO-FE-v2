'use client';

import {useCallback, useState} from 'react';
import {useAdminMailQuery} from '@/hooks/queries/useAdminMail.query';
import {useAdminMailMutation} from '@/hooks/mutations/useAdminMail.mutation';

export const useManageMail = (generationId: number, mailType: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [prevParams, setPrevParams] = useState({generationId, mailType});
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const {data, isLoading, refetch, isFetching} = useAdminMailQuery(
    generationId,
    mailType
  );

  const {
    save,
    send,
    isSaving,
    isSending: isMutationSending,
  } = useAdminMailMutation(generationId, mailType);

  if (
    prevParams.generationId !== generationId ||
    prevParams.mailType !== mailType
  ) {
    setPrevParams({generationId, mailType});
    setIsEditing(false);
    setEditingContent(null);
  }

  // 대상자 수
  const totalTargetCount = data
    ? 'subscriberCount' in data
      ? data.subscriberCount
      : data.recipientCount
    : 0;

  // 수동 새로고침
  const handleRefreshStatus = useCallback(async () => {
    setIsManualRefreshing(true);

    // refetch와의 최소 대기 시간 (600ms)
    await Promise.all([
      refetch(),
      new Promise((resolve) => setTimeout(resolve, 600)),
    ]);
    setIsManualRefreshing(false);
  }, [refetch]);

  // 전송 중 (성공 + 실패 합이 0일 때)
  const isCurrentlyProcessing =
    isMutationSending ||
    isManualRefreshing ||
    (data?.isSent && data.successCount + data.failCount === 0) ||
    (isFetching && !data?.isSent);

  const handleSendClick = () => {
    send(undefined, {
      onSuccess: () => {
        handleRefreshStatus();
      },
    });
  };

  const currentContent =
    editingContent !== null ? editingContent : (data?.content ?? '');

  return {
    isLoading,
    isSaving,
    isSending: isCurrentlyProcessing,
    isRefreshing: isFetching || isManualRefreshing,
    isEditing,
    content: currentContent,
    setContent: (val: string) => setEditingContent(val),
    isSent: data?.isSent ?? false,
    waitingCount: totalTargetCount,
    status: {
      successCount: data?.successCount ?? 0,
      failCount: data?.failCount ?? 0,
    },
    isChanged: editingContent !== null && data?.content !== editingContent,
    handleEditClick: () => setIsEditing(true),
    handleCancelClick: () => {
      setEditingContent(null);
      setIsEditing(false);
    },
    handleSaveClick: () =>
      save(currentContent, {onSuccess: () => setIsEditing(false)}),
    handleSendClick,
    refreshStatus: handleRefreshStatus,
  };
};
