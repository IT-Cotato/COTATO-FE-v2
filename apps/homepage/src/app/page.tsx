'use client';

import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';
import {Footer} from '@repo/ui/components/layout/footer/Footer';
import Image from 'next/image';
import HeroBanner from '@/assets/backgrounds/banner/hero-main.webp';

export default function Home() {
  return (
    <>
      <div className='bg-active flex flex-col'>
        <div>sdf</div>
      </div>
      <Footer />
      <HeroMainBanner
        heading='Cotato와 함께할 여정이 궁금하신가요?'
        subheading='자주 묻는 질문에서 답을 찾아보세요.'
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
    </>
  );
}
