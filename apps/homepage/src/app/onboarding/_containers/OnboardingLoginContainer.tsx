'use client';

import {FullButton} from '@repo/ui/components/buttons/FullButton';

import {useState} from 'react';
import {OnboardingFormInput} from '@/app/onboarding/_components/OnboardingFormInput';
import {OnboardingFormPassword} from '@/components/password-form/OnboardingFormPassword';
import {useLoginMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {LoginSchema} from '@/schemas/auth/auth.schema';

interface OnboardingLoginContainerProps {
  onSignUpClick: () => void;
  onFindPasswordClick: () => void;
}

export const OnboardingLoginContainer = ({
  onSignUpClick,
  onFindPasswordClick,
}: OnboardingLoginContainerProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const {mutate, isPending} = useLoginMutation();

  const validation = LoginSchema.safeParse(loginData);
  const isValid = validation.success;

  const errors = !validation.success ? validation.error.format() : null;
  const emailError = errors?.email?._errors[0];
  const passwordError = errors?.password?._errors[0];

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!isValid || isPending) return;
    mutate(loginData);
  };

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-7'>
      <div className='flex flex-col gap-7'>
        <OnboardingFormInput
          label='아이디'
          value={loginData.email}
          onChange={(val) => setLoginData({...loginData, email: val})}
          placeholder='ID'
          type='string'
          error={emailError}
        />

        <OnboardingFormPassword
          label='비밀번호'
          showPassword={showPassword}
          value={loginData.password}
          onChange={(val) => setLoginData({...loginData, password: val})}
          onTogglePasswordVisibility={handleTogglePasswordVisibility}
          error={passwordError}
        />
      </div>
      <div className='border-b border-neutral-800'></div>
      <div className='flex flex-row justify-between'>
        <button
          type='button'
          className='text-body-l border-b border-b-neutral-300 text-neutral-300'
          onClick={onSignUpClick}>
          회원가입
        </button>
        <button
          type='button'
          className='text-body-l border-b border-b-neutral-300 text-neutral-300'
          onClick={onFindPasswordClick}>
          비밀번호 찾기
        </button>
      </div>
      <FullButton
        label='로그인'
        disabled={isPending}
        height={45}
        type='submit'
        onClick={handleLogin}
      />
    </form>
  );
};
