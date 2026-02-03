import Email from '../../../assets/footer/email/email.svg';
import Github from '../../../assets/footer/github/github.svg';
import Insta from '../../../assets/footer/insta/insta.svg';
import Kakao from '../../../assets/footer/kakao/kakao.svg';
import NaverCafe from '../../../assets/footer/naver-cafe/naver-cafe.svg';
import {SocialLink} from './SocialLink';

export const FooterContact = () => {
  return (
    <section className='flex flex-col items-end'>
      <div className='flex items-center gap-5.25'>
        <h3 className='text-h5 text-white'>Contact Us</h3>
        <div className='flex items-center gap-3'>
          <SocialLink href='mailto:itcotato@gmail.com' ariaLabel='이메일'>
            <Email />
          </SocialLink>
          <SocialLink href='https://github.com/IT-Cotato' ariaLabel='GitHub'>
            <Github />
          </SocialLink>
          <SocialLink
            href='https://www.instagram.com/cotato_official/'
            ariaLabel='Instagram'>
            <Insta />
          </SocialLink>
          <SocialLink
            href='https://pf.kakao.com/_LQLyG'
            ariaLabel='KakaoTalk 채널'>
            <Kakao />
          </SocialLink>
          <SocialLink
            href='https://cafe.naver.com/cotato'
            ariaLabel='네이버 카페'>
            <NaverCafe />
          </SocialLink>
        </div>
      </div>

      <a href='/terms' className='text-body-s-sb mt-7.5 text-white underline'>
        이용약관 및 개인정보 처리방침
      </a>

      <p className='text-body-s mt-3.5 text-white'>
        Copyright©2026 COTATO, All rights reserved.
      </p>
    </section>
  );
};
