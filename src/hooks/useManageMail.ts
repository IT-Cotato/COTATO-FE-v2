import {useState} from 'react';
import {MOCK_MAIL_CONTENT} from '@/mocks/mock-mail';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';

interface UseManageMailReturn {
  isEditing: boolean;
  content: string;
  setContent: (content: string) => void;
  isChanged: boolean;
  canSendMail: boolean;
  handleEditClick: () => void;
  handleCancelClick: () => void;
  handleSaveClick: () => void;
}

export const useManageMail = (): UseManageMailReturn => {
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
