import {useState} from 'react';
import {MOCK_MAIL_CONTENT} from '@/mocks/mock-mail';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';

export const useManageMail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(MOCK_MAIL_CONTENT);
  const [originalContent, setOriginalContent] = useState(MOCK_MAIL_CONTENT);

  const isRecruiting = useRecruitmentStore((state) => state.isRecruiting);
  const isChanged = content !== originalContent;
  const canSendMail = isRecruiting && !isEditing;

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
