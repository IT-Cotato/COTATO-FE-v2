import GoogleLogo from '@/assets/social/google/google-logo.svg';
import {startGoogleLogin} from '@/lib/googleAuth';

export const GoogleLoginButton = () => {
  return (
    <button
      type='button'
      onClick={startGoogleLogin}
      className='flex w-60.5 shrink-0 items-center justify-center gap-3.75 rounded-[10px] bg-white py-2 shadow-[0_0_3px_0_rgba(0,0,0,0.08),0_2px_3px_0_rgba(0,0,0,0.17)] lg:w-86.25 lg:py-3.75'>
      <GoogleLogo width={24} height={24} />
      <p className='text-h4 font-[family-name:var(--font-roboto)] leading-normal text-black/54 lg:text-xl lg:font-medium'>
        Google 계정으로 로그인
      </p>
    </button>
  );
};
