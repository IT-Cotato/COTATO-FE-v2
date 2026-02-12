import {OnboardingFormInput} from '@/app/onboarding/_components/OnboardingFormInput';
import {usePasswordMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {SendCodeRequestSchema} from '@/schemas/auth/auth.schema';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {useState} from 'react';

interface OnboardingFindPasswordContainerProps {
  onNext: (email: string) => void;
}

export const OnboardingFindPasswordContainer = ({
  onNext,
}: OnboardingFindPasswordContainerProps) => {
  const [email, setEmail] = useState<string>('');
  const result = SendCodeRequestSchema.safeParse({email});
  const {sendResetCodeMutation} = usePasswordMutation();

  const isValid = result.success;
  const emailError = !result.success
    ? result.error.format().email?._errors[0]
    : undefined;

  const handleSendCode = () => {
    if (!isValid) return;

    sendResetCodeMutation.mutate(
      {email},
      {
        onSuccess: () => {
          onNext(email);
        },
      }
    );
  };

  return (
    <div className='flex flex-col gap-25'>
      <div className='text-body-l flex flex-col text-neutral-100'>
        <span>비밀번호를 잊으셨나요?</span>
        <span>이메일 인증 후 비밀번호 재설정을 진행해주세요.</span>
      </div>

      <div className='flex flex-col gap-12.5'>
        <OnboardingFormInput
          label='아이디'
          type='email'
          placeholder='가입하신 이메일을 입력해 주세요.'
          value={email}
          onChange={(val) => setEmail(val)}
          error={emailError}
        />

        <FullButton
          onClick={handleSendCode}
          label='인증코드 전송하기'
          disabled={!isValid || sendResetCodeMutation.isPending}
        />
      </div>
    </div>
  );
};
