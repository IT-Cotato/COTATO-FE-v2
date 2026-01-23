import Email from '@/assets/footer/email/email.svg';
import Github from '@/assets/footer/github/github.svg';
import Insta from '@/assets/footer/insta/insta.svg';
import Kakao from '@/assets/footer/kakao/kakao.svg';
import NaverCafe from '@/assets/footer/naver-cafe/naver-cafe.svg';
import {SocialLink} from '@/components/layout/SocialLink';

export const FooterContact = () => {
  return (
    <section className='flex flex-col items-end'>
      <div className='flex items-center gap-5.25'>
        <h3 className='text-h5 text-white'>Contact Us</h3>
        <div className='flex items-center gap-3'>
          <SocialLink href='mailto:itcotato@gmail.com'>
            <Email />
          </SocialLink>
          <SocialLink href='https://github.com/IT-Cotato'>
            <Github />
          </SocialLink>
          <SocialLink href='https://www.instagram.com/cotato_official/'>
            <Insta />
          </SocialLink>
          <SocialLink href='https://pf.kakao.com/_LQLyG'>
            <Kakao />
          </SocialLink>
          <SocialLink href='https://cafe.naver.com/cotato'>
            <NaverCafe />
          </SocialLink>
        </div>
      </div>

      <a href='/terms' className='mt-7.5 text-body-s-sb text-white underline'>
        이용약관 및 개인정보 처리방침
      </a>

      <p className='mt-3.5 text-body-s text-white'>
        Copyright©2026 COTATO, All rights reserved.
      </p>
    </section>
  );
};
