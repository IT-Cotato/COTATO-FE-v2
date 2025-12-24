import SocialLink from './SocialLink';
import Email from '@/assets/footer/email/email.svg';
import Github from '@/assets/footer/github/github.svg';
import Insta from '@/assets/footer/insta/insta.svg';
import Kakao from '@/assets/footer/kakao/kakao.svg';
import NaverCafe from '@/assets/footer/naver-cafe/naver-cafe.svg';

export const FooterContact = () => {
  return (
    <section className='flex items-center gap-[21px]'>
      <h3 className='text-h3'>Contact Us</h3>
      <div className='flex items-center gap-[12px]'>
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
    </section>
  );
};
