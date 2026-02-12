import Email from '@repo/ui/assets/footer/email/email.svg';
import Github from '@repo/ui/assets/footer/github/github.svg';
import Insta from '@repo/ui/assets/footer/insta/insta.svg';
import Kakao from '@repo/ui/assets/footer/kakao/kakao.svg';
import NaverCafe from '@repo/ui/assets/footer/naver-cafe/naver-cafe.svg';
import {SocialLink} from './SocialLink';
import {TERMS_LINK} from '../../../constants/terms-link';

interface FooterContactProps {
  isRecruit: boolean;
}

export const FooterContact = ({isRecruit}: FooterContactProps) => {
  const linkHref = isRecruit ? TERMS_LINK.recruit : TERMS_LINK.homepage;
  const linkText = isRecruit
    ? '서비스 이용약관 및 개인정보 처리방침'
    : '서비스 이용약관';

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

      <a
        href={linkHref}
        target='_blank'
        rel='noopener noreferrer'
        className='text-body-m-sb mt-7.5 text-white underline'>
        {linkText}
      </a>

      <p className='text-body-m mt-3.5 text-white'>
        Copyright©2026 COTATO, All rights reserved.
      </p>
    </section>
  );
};
