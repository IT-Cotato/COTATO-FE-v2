'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@repo/ui/components/buttons/Button';
import {
  usePasswordMutation,
  useLogoutMutation,
} from '@/hooks/mutations/auth/useAuth.mutations';
import {SuccessModal} from './SuccessModal';
import {
  MyPageResetPasswordSchema,
  MyPageResetPasswordType,
} from '@/schemas/mypage-mem/account/account.schema';
import {OnboardingFormPassword} from '@/app/onboarding/_components/OnboardingFormPassword';

export const ResetPWForm = () => {
  const [showPws, setShowPws] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {resetPasswordMutation} = usePasswordMutation();
  const {mutate: logout} = useLogoutMutation();

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: {errors, isValid},
  } = useForm<MyPageResetPasswordType>({
    resolver: zodResolver(MyPageResetPasswordSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  const isPasswordMatched =
    passwordValue &&
    passwordConfirmValue &&
    passwordValue === passwordConfirmValue &&
    !errors.password &&
    !errors.passwordConfirm;

  const onSubmit = (data: MyPageResetPasswordType) => {
    if (data.currentPassword === data.password) {
      setError('password', {
        message: '이전에 사용한 적 없는 비밀번호를 설정해주세요.',
      });
      return;
    }

    resetPasswordMutation.mutate(data.password, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
      onError: () => {
        setError('currentPassword', {
          message: '현재 비밀번호가 올바르지 않습니다.',
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex min-w-[1100px] flex-col gap-[26px]'>
      <OnboardingFormPassword
        variant='mypage'
        label='현재 비밀번호'
        placeholder='현재 비밀번호를 입력해주세요.'
        value={watch('currentPassword') || ''}
        onChange={(val) =>
          setValue('currentPassword', val, {shouldValidate: true})
        }
        showPassword={showPws.current}
        onTogglePasswordVisibility={() =>
          setShowPws((prev) => ({...prev, current: !prev.current}))
        }
        error={errors.currentPassword?.message}
      />
      <OnboardingFormPassword
        variant='mypage'
        label='새 비밀번호'
        placeholder='새로운 비밀번호를 입력하세요.'
        helperText='8~16자, 영문, 숫자 특수문자를 포함하여 설정해주세요.'
        value={watch('password') || ''}
        onChange={(val) => setValue('password', val, {shouldValidate: true})}
        showPassword={showPws.new}
        onTogglePasswordVisibility={() =>
          setShowPws((prev) => ({...prev, new: !prev.new}))
        }
        error={errors.password?.message}
      />
      <div className='flex flex-col gap-1'>
        <OnboardingFormPassword
          variant='mypage'
          label='새 비밀번호 확인'
          placeholder='새 비밀번호를 다시 한 번 더 입력해주세요.'
          value={watch('passwordConfirm') || ''}
          onChange={(val) =>
            setValue('passwordConfirm', val, {shouldValidate: true})
          }
          showPassword={showPws.confirm}
          onTogglePasswordVisibility={() =>
            setShowPws((prev) => ({...prev, confirm: !prev.confirm}))
          }
          error={errors.passwordConfirm?.message}
        />
        {isPasswordMatched && (
          <span className='text-body-l text-primary'>
            비밀번호가 일치합니다.
          </span>
        )}
      </div>
      <div className='mt-6 flex justify-end'>
        <Button
          type='submit'
          label='비밀번호 재설정'
          backgroundColor='primary'
          width={142}
          height={42}
          labelTypo='body_l_sb'
          disabled={!isValid || resetPasswordMutation.isPending}
        />
      </div>
      <SuccessModal
        isOpen={isModalOpen}
        onConfirm={() => {
          setIsModalOpen(false);
          logout();
        }}
      />
    </form>
  );
};
