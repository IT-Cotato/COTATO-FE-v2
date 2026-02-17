'use client';

import {OnboardingFormCode} from '@/app/onboarding/_components/OnboardingFormCode';
import {OnboardingFormInput} from '@/app/onboarding/_components/OnboardingFormInput';
import {Button} from '@repo/ui/components/buttons/Button';
import {useState} from 'react';
import {JoinRequestSchema, JoinRequestType} from '@/schemas/auth/auth.schema';
import {useAuthMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {OnboardingFormPassword} from '@/components/password-form/OnboardingFormPassword';

interface OnboardingSignUpContainerProps {
  onNext: (data: {email: string; password: string; name: string}) => void;
  prevData?: Partial<JoinRequestType>;
}

export const OnboardingSignUpContainer = ({
  onNext,
  prevData,
}: OnboardingSignUpContainerProps) => {
  const [formData, setFormData] = useState({
    name: prevData?.name || '',
    email: prevData?.email || '',
    code: '',
    password: prevData?.password || '',
    confirmPassword: prevData?.password || '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const {sendCodeMutation, verifyCodeMutation} = useAuthMutation();
  const isSendingCode = sendCodeMutation.isPending;

  const result = JoinRequestSchema.safeParse({
    ...formData,
    // 스키마를 통과시키기 위한 더미 데이터 (아직 입력받지 않은 필드들)
    phoneNumber: '01012345678',
    termsOfServiceAgreed: true,
    privacyPolicyAgreed: true,
    generationNumber: 13,
    gender: 'MALE',
    university: 'OO대학교',
    position: 'NONE',
  });

  const errors = !result.success ? result.error.format() : null;

  const isFormValid =
    result.success &&
    verifyCodeMutation.isSuccess &&
    formData.password === formData.confirmPassword;

  const isPasswordMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  // 인증코드 발송 핸들러
  const handleSendCode = () => {
    if (!formData.email.includes('@')) return;
    sendCodeMutation.mutate({email: formData.email});
  };

  // 인증코드 확인 핸들러
  const handleVerifyCode = () => {
    verifyCodeMutation.mutate({
      email: formData.email,
      code: formData.code,
    });
  };

  return (
    <div className='flex flex-col gap-4'>
      <OnboardingFormInput
        type='text'
        label='이름'
        onChange={(val) => setFormData({...formData, name: val})}
        value={formData.name}
        placeholder='이름을 입력해 주세요.'
        error={errors?.name?._errors[0]}
      />

      <OnboardingFormCode
        onChange={(val) => setFormData({...formData, email: val})}
        value={formData.email}
        label='아이디'
        placeholder='이메일 형식으로 입력해 주세요.'
        type='email'
        error={errors?.email?._errors[0]}
        onButtonClick={handleSendCode}
        buttonColor={
          isSendingCode || sendCodeMutation.isSuccess
            ? 'bg-text-muted'
            : 'bg-primary'
        }
        buttonLabel={
          sendCodeMutation.isSuccess ? '코드 발송 완료' : '인증코드 발송'
        }
        disabled={isSendingCode || sendCodeMutation.isSuccess}
      />

      <OnboardingFormCode
        value={formData.code}
        onChange={(val) => setFormData({...formData, code: val})}
        label='인증'
        placeholder='인증 코드를 입력해 주세요.'
        type='text'
        onButtonClick={handleVerifyCode}
        buttonColor={
          verifyCodeMutation.isSuccess ? 'bg-text-muted' : 'bg-primary'
        }
        buttonLabel={verifyCodeMutation.isSuccess ? '인증 완료' : '인증하기'}
        disabled={verifyCodeMutation.isSuccess}
      />

      <OnboardingFormPassword
        label='비밀번호'
        value={formData.password}
        onChange={(val) => setFormData({...formData, password: val})}
        showPassword={showPassword}
        onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
        error={errors?.password?._errors[0]}
      />

      <OnboardingFormPassword
        label='비밀번호 확인'
        value={formData.confirmPassword}
        onChange={(val) => setFormData({...formData, confirmPassword: val})}
        showPassword={showPasswordConfirm}
        onTogglePasswordVisibility={() =>
          setShowPasswordConfirm(!showPasswordConfirm)
        }
        error={isPasswordMismatch ? '비밀번호가 일치하지 않습니다.' : ''}
      />

      <div className='mt-4 flex justify-end'>
        <Button
          label='다음으로'
          disabled={!isFormValid}
          backgroundColor={isFormValid ? 'primary' : 'text-disabled'}
          width={200}
          height={45}
          onClick={() =>
            onNext({
              email: formData.email,
              password: formData.password,
              name: formData.name,
            })
          }
        />
      </div>
    </div>
  );
};
