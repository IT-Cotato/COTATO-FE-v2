import {useState} from 'react';
import {useAdminMailQuery} from './queries/useAdminMail.query';
import {useAdminMailMutation} from '@/hooks/mutations/useAdminMail.mutation';

export const useManageMail = (generationId: number, mailType: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const {data, isLoading} = useAdminMailQuery(generationId, mailType);
  const {save, send, isSaving, isSending} = useAdminMailMutation(
    generationId,
    mailType
  );

  // 수정 중이면 수정본, 아니면 서버 데이터 사용
  const currentContent =
    editingContent !== null ? editingContent : (data?.content ?? '');

  const waitingCount = data
    ? 'subscriberCount' in data
      ? data.subscriberCount
      : 'recipientCount' in data
        ? data.recipientCount
        : 0
    : 0;

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setEditingContent(null);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    save(currentContent, {
      onSuccess: () => {
        setIsEditing(false);
        setEditingContent(null);
        alert('저장되었습니다.');
      },
    });
  };

  const handleSendClick = () => {
    send(undefined, {
      onSuccess: () => {
        alert('메일 전송이 완료되었습니다.');
      },
    });
  };

  return {
    isLoading,
    isSaving,
    isSending,
    isEditing,
    content: currentContent,
    setContent: (val: string) => setEditingContent(val),
    isSent: data?.isSent ?? false,
    waitingCount,
    isChanged: editingContent !== null && data?.content !== editingContent,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleSendClick,
  };
};
