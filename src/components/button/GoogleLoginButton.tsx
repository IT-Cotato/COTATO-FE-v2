import GoogleLogo from '@/assets/social/google/google-logo.svg';
import {startGoogleLogin} from '@/lib/googleAuth';

export const GoogleLoginButton = () => {
  return (
    <button
      onClick={startGoogleLogin}
      className='flex w-86.25 shrink-0 items-center justify-center gap-3.75 rounded-[10px] bg-white py-3.75 shadow-[0_0_3px_0_rgba(0,0,0,0.08),0_2px_3px_0_rgba(0,0,0,0.17)]'>
      <GoogleLogo width={24} height={24} />
      <p className='font-[family-name:var(--font-roboto)] text-xl leading-normal font-medium text-black/54'>
        Google 계정으로 로그인
      </p>
    </button>
  );
};
