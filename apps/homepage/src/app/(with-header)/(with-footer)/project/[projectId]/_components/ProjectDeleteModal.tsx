import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';

interface ProjectDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

export const ProjectDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  projectName,
}: ProjectDeleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${projectName}을 삭제하시겠습니까?`}
      titleStyle='text-h4 text-neutral-800'
      content='확인 버튼 클릭 시 프로젝트가 영구 삭제됩니다.'
      actions={
        <FullButton label='확인' variant='primary' onClick={onConfirm} />
      }
      contentWrapperClassName='gap-[48px]'
    />
  );
};
