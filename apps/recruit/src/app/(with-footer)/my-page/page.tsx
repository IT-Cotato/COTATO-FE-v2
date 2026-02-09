import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';
import Image from 'next/image';
import HeroBanner from '@/assets/backgrounds/banners/hero-main.webp';
import {MyPageSubmittedApplicationsContainer} from '@/app/(with-footer)/my-page/_containers/MyPageSubmittedApplicationsContainer';

export default function Mypage() {
  return (
    <section>
      <HeroMainBanner
        heading='COde Together, Arrive TOgether'
        headingStyle='bg-linear-to-r from-[#F89202] from-0% via-[#F89202] via-10% to-[#9E9E9E] to-100% bg-clip-text text-transparent'
        bannerImage={
          <Image
            src={HeroBanner}
            alt='Hero Banner'
            fill
            priority
            className='object-cover object-center'
          />
        }
      />
      <MyPageSubmittedApplicationsContainer />
    </section>
  );
}
