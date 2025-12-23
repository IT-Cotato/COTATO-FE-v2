import MainLogo from '@/assets/main-logo/main-logo.svg';

export const FooterInfo = () => {
  return (
    <div className='flex w-[287px] flex-col items-start gap-[23px]'>
      <div className='flex flex-col items-start gap-[7px]'>
        <MainLogo />
        <p className='text-body-s'>COTATO (코테이토, 연합 IT 동아리)</p>
      </div>
      <nav className='flex flex-col items-start gap-[7px]'>
        <a href='/terms' className='text-body-s font-semibold underline'>
          이용약관 및 개인정보 처리방침
        </a>
        <p className='text-body-s'>
          Copyright©2026 COTATO, All rights reserved.
        </p>
      </nav>
    </div>
  );
};
