'use client';

import Logo from '@/assets/small-logo/small-logo-without-icon.svg';
import {OnboardingLoginContainer} from '@/app/onboarding/_containers/OnboardingLoginContainer';
import {useFunnel} from '@use-funnel/browser';
import {OnboardingSignUpContainer} from '@/app/onboarding/_containers/OnboardingSignUpContainer';
import {OnboardingUserInfoContainer} from '@/app/onboarding/_containers/OnboardingUserInfoContainer';
import {OnboardingFindPasswordContainer} from '@/app/onboarding/_containers/OnboardingFindPasswordContainer';
import {OnboardingVerificationCodeContainer} from '@/app/onboarding/_containers/OnboardingVerificationCodeContainer';
import {JoinRequestType} from '@/schemas/auth/auth.schema';
import {OnboardingResetPasswordContainer} from '@/app/onboarding/_containers/OnboardingResetPasswordContainer';

type Context = Partial<JoinRequestType>;

const STEP_CONFIG: Record<string, {title: string; showLoginLink?: boolean}> = {
  login: {title: '로그인'},
  signUp: {title: '회원가입', showLoginLink: true},
  userInfo: {title: '회원가입', showLoginLink: true},
  code: {title: '인증번호 입력'},
  resetPassword: {title: '비밀번호 재설정'},
  findPassword: {title: '비밀번호 찾기'},
};

export const OnboardingContainer = () => {
  const funnel = useFunnel<{
    login: Context;
    signUp: Context;
    findPassword: Context;
    userInfo: Context;
    code: Context;
    resetPassword: Context;
  }>({
    id: 'funnel',
    initial: {
      step: 'login',
      context: {},
    },
  });
  const currentConfig = STEP_CONFIG[funnel.step];
  return (
    <div className='custom-scrollbar flex max-h-209.25 min-h-164 w-134.75 flex-col gap-11.75 overflow-y-scroll rounded-[40px] bg-neutral-100/30 px-11 py-18.5'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row justify-between'>
          <h2 className='flex flex-row items-center gap-3.5'>
            <span className='text-h5 text-white'>Welcome to</span>
            <Logo />
          </h2>
          {currentConfig.showLoginLink && (
            <div className='text-body-m flex flex-col items-end justify-end text-neutral-400'>
              <span>이미 계정이 있나요?</span>
              <button
                className='text-primary'
                onClick={() => funnel.history.push('login')}>
                로그인
              </button>
            </div>
          )}
        </div>

        <h1 className='text-h2 text-neutral-100'>{currentConfig.title}</h1>
      </div>
      <funnel.Render
        login={({history}) => (
          <OnboardingLoginContainer
            onSignUpClick={() => history.push('signUp')}
            onFindPasswordClick={() => history.push('findPassword')}
          />
        )}
        userInfo={({history, context}) => (
          <OnboardingUserInfoContainer
            prevData={context}
            onPrev={() => history.push('signUp', context)}
          />
        )}
        signUp={({history, context}) => (
          <OnboardingSignUpContainer
            prevData={context}
            onNext={(data) => history.push('userInfo', data)}
          />
        )}
        findPassword={({history}) => (
          <OnboardingFindPasswordContainer
            onNext={(email) => history.push('code', {email})}
          />
        )}
        code={({history, context}) => (
          <OnboardingVerificationCodeContainer
            email={context.email}
            onNext={() => history.push('resetPassword', context)}
          />
        )}
        resetPassword={({history}) => (
          <OnboardingResetPasswordContainer
            onSuccess={() => history.push('login')}
          />
        )}
      />
    </div>
  );
};
