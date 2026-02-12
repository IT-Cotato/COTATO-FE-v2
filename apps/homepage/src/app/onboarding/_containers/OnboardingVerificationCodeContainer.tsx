import {usePasswordMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {setAccessToken} from '@/services/utils/tokenManager';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import clsx from 'clsx';
import {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';

interface OnboardingVerificationCodeContainerProps {
  email: string | undefined;
  onNext: () => void;
}

export const OnboardingVerificationCodeContainer = ({
  email,
  onNext,
}: OnboardingVerificationCodeContainerProps) => {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {verifyResetCodeMutation, sendResetCodeMutation} =
    usePasswordMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const {value} = e.target;
    if (!/^\d*$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value.slice(-1);
    setCodes(newCodes);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = codes.join('');
    if (code.length < 6 || !email) return;

    verifyResetCodeMutation.mutate(
      {email, code},
      {
        onSuccess: (data) => {
          setAccessToken(data.accessToken);
          onNext();
        },
      }
    );
  };

  const handleResend = () => {
    if (!email) return;
    sendResetCodeMutation.mutate({email});
    setCodes(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isComplete = codes.every((c) => c !== '');

  return (
    <div className='flex flex-col gap-20'>
      <div className='text-body-l flex flex-col text-neutral-100'>
        <span>{email}(으)로 인증코드를 발송했습니다.</span>
        <span>이메일에서 코드 6자리를 확인 후 입력해 주세요.</span>
      </div>
      <div className='flex flex-col gap-6.25'>
        {' '}
        <div className='flex justify-between gap-2'>
          {codes.map((code, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type='text'
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={clsx(
                'text-h2 focus:ring-primary h-20 w-17 rounded-[10px] bg-neutral-800 text-center text-neutral-100 outline-none focus:ring-1',
                code ? 'ring-primary ring-1' : 'ring-0'
              )}
            />
          ))}
        </div>
        <div>
          <div className='text-body-l flex flex-col text-neutral-100'>
            <span>인증 메일은 발송 시점부터 30분 동안 유효하며,</span>
            <span>재발송 시 기존 인증 코드는 만료됩니다.</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-7'>
        <FullButton
          label='인증하기'
          onClick={handleVerify}
          disabled={!isComplete || verifyResetCodeMutation.isPending}
        />
        <div className='text-body-l flex flex-row justify-between text-neutral-300'>
          <button className='border-b border-b-neutral-300'>
            인증코드를 받지 못했나요?
          </button>
          <button
            className='border-b border-b-neutral-300'
            onClick={handleResend}
            disabled={sendResetCodeMutation.isPending}>
            다시받기
          </button>
        </div>
      </div>
    </div>
  );
};
