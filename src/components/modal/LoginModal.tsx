import {Modal} from '@/components/modal/Modal';
import {GoogleLoginButton} from '@/components/button/GoogleLoginButton';

interface LoginModal {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({title, isOpen, onClose}: LoginModal) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleStyle='text-h5 leading-6.5 text-active text-neutral-800'
      content='지원서 작성을 위해 로그인을 해주세요!'
      actions={<GoogleLoginButton />}
      warning='* 로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.'
    />
  );
};
