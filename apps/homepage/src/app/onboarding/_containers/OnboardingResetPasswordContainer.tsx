import {OnboardingFormPassword} from '@/app/onboarding/_components/OnboardingFormPassword';
import {usePasswordMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {ResetPasswordSchema} from '@/schemas/members/members.schema';
import {clearAuthState} from '@/services/utils/tokenManager';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';

import {useState} from 'react';

interface OnboardingResetPasswordContainerProps {
  onSuccess: () => void;
}
export const OnboardingResetPasswordContainer = ({
  onSuccess,
}: OnboardingResetPasswordContainerProps) => {
  const [isCompleteModalOpen, setIsCompleteModalOpen] =
    useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const {resetPasswordMutation} = usePasswordMutation();
  const validation = ResetPasswordSchema.safeParse({password, passwordConfirm});
  const errors = !validation.success ? validation.error.format() : null;
  const passwordError = errors?.password?._errors[0];
  const confirmError = errors?.passwordConfirm?._errors[0];

  const handleReset = () => {
    if (!validation.success) return;

    resetPasswordMutation.mutate(password, {
      onSuccess: () => {
        setIsCompleteModalOpen(true);
        clearAuthState();
      },
    });
  };

  {
    return (
      <div className='flex flex-col gap-7'>
        <OnboardingFormPassword
          value={password}
          onChange={(val) => setPassword(val)}
          onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
          label='새로운 비밀번호'
          placeholder='새로운 비밀번호를 입력해 주세요.'
          error={passwordError}
        />
        <OnboardingFormPassword
          value={passwordConfirm}
          onChange={(val) => setPasswordConfirm(val)}
          showPassword={showPasswordConfirm}
          onTogglePasswordVisibility={() =>
            setShowPasswordConfirm(!showPasswordConfirm)
          }
          label='비밀번호 확인'
          placeholder='비밀번호를 한 번 더 입력해 주세요.'
          error={confirmError}
        />
        <FullButton
          label='재설정하기'
          onClick={handleReset}
          disabled={!validation.success || resetPasswordMutation.isPending}
        />
        {isCompleteModalOpen && (
          <Modal
            isOpen={isCompleteModalOpen}
            title='비밀번호 재설정이 완료되었습니다.'
            content='이제 새로운 비밀번호로 로그인하실 수 있습니다.'
            titleStyle='text-h4 font-bold'
            actions={
              <FullButton
                label='로그인'
                onClick={() => {
                  setIsCompleteModalOpen(false);
                  onSuccess();
                }}
              />
            }
          />
        )}
      </div>
    );
  }
};
