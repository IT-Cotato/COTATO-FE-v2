'use client';

import {Modal} from '@/components/modal/Modal';
import {GoogleLoginButton} from '@/components/button/GoogleLoginButton';

interface LoginModalProps {
  title: string;
  content?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({
  title,
  content,
  isOpen,
  onClose,
}: LoginModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleStyle='text-h4 leading-6.5 text-active text-neutral-800'
      content={content}
      actions={<GoogleLoginButton />}
      warning='* 로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.'
    />
  );
};
