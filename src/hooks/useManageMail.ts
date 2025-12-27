'use client';

import {useState} from 'react';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {MAIL_DATA_MAP} from '@/schemas/admin-result-type';

export const useManageMail = (
  mailType: string,
  alwaysAble: boolean = false
) => {
  const initialData =
    MAIL_DATA_MAP[mailType] || MAIL_DATA_MAP['지원 알림 메일'];

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialData);
  const [originalContent, setOriginalContent] = useState(initialData);

  const isRecruiting = useRecruitmentStore((state) => state.isRecruiting);
  const isChanged = content !== originalContent;
  const canSendMail = !isEditing && (alwaysAble || isRecruiting);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setContent(originalContent);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (!isChanged) return;
    setOriginalContent(content);
    setIsEditing(false);
  };

  return {
    isEditing,
    content,
    setContent,
    isChanged,
    canSendMail,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
  };
};
