import MainLogo from '@/assets/main-logo/main-logo.svg';
import Email from '@/assets/footer/email/email.svg';
import Github from '@/assets/footer/github/github.svg';
import Insta from '@/assets/footer/insta/insta.svg';
import Kakao from '@/assets/footer/kakao/kakao.svg';
import NaverCafe from '@/assets/footer/naver-cafe/naver-cafe.svg';

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
            <a
              href='mailto:itcotato@gmail.com'
              target='_blank'
              rel='noopener noreferrer'>
              <Email />
            </a>
            <a
              href='https://github.com/IT-Cotato'
              target='_blank'
              rel='noopener noreferrer'>
              <Github />
            </a>
            <a
              href='https://www.instagram.com/cotato_official/'
              target='_blank'
              rel='noopener noreferrer'>
              <Insta />
            </a>
            <a
              href='https://pf.kakao.com/_LQLyG'
              target='_blank'
              rel='noopener noreferrer'>
              <Kakao />
            </a>
            <a
              href='https://cafe.naver.com/cotato'
              target='_blank'
              rel='noopener noreferrer'>
              <NaverCafe />
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
