import MainLogo from '@/assets/main-logo/main-logo.svg';

export default function Footer() {
  return (
    <footer className='flex h-[223px] flex-none items-center justify-center bg-black px-[62px] py-[47px] text-white'>
      <div className='flex w-full items-end justify-between'>
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
        <section className='flex items-center gap-[21px]'>
          <h3 className='text-h3'>Contact Us</h3>
          <div className='flex items-center gap-[12px]'>
            {/* 아이콘 들어갈 공간 */}
          </div>
        </section>
      </div>
    </footer>
  );
}
