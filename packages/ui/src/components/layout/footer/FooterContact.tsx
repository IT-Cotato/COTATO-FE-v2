import Email from '../../../assets/footer/email/email.svg';
import Github from '../../../assets/footer/github/github.svg';
import Insta from '../../../assets/footer/insta/insta.svg';
import Kakao from '../../../assets/footer/kakao/kakao.svg';
import NaverCafe from '../../../assets/footer/naver-cafe/naver-cafe.svg';
import {SocialLink} from './SocialLink';
interface FooterContactProps {
  termsHref: string;
  termsText: string;
}

export const FooterContact = ({termsHref, termsText}: FooterContactProps) => {
  return (
    <section className='flex flex-col gap-6 lg:items-end lg:gap-0'>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-5.25'>
        <h3 className='text-h5 hidden text-white lg:block'>Contact Us</h3>
        <div className='flex items-center gap-5 lg:gap-3'>
          <SocialLink href='mailto:itcotato@gmail.com' ariaLabel='이메일'>
            <Email className='h-6 w-6' />
          </SocialLink>
          <SocialLink href='https://github.com/IT-Cotato' ariaLabel='GitHub'>
            <Github className='h-6 w-6' />
          </SocialLink>
          <SocialLink
            href='https://www.instagram.com/cotato_official/'
            ariaLabel='Instagram'>
            <Insta className='h-6 w-6' />
          </SocialLink>
          <SocialLink
            href='https://pf.kakao.com/_LQLyG'
            ariaLabel='KakaoTalk 채널'>
            <Kakao className='h-6 w-6' />
          </SocialLink>
          <SocialLink
            href='https://cafe.naver.com/cotato'
            ariaLabel='네이버 카페'>
            <NaverCafe className='h-6 w-6' />
          </SocialLink>
        </div>
      </div>

      <div className='flex flex-col gap-2 lg:items-end lg:gap-[3px]'>
        <a
          href={termsHref}
          target='_blank'
          rel='noopener noreferrer'
          className='text-body-m lg:text-body-m-sb mt-4 text-neutral-400 underline decoration-neutral-500 underline-offset-4 lg:mt-7.5'>
          {termsText}
        </a>

        <p className='text-body-m text-center text-neutral-400 lg:text-right'>
          Copyright © 2026 COTATO. All rights reserved.
        </p>
      </div>
    </section>
  );
};
