'use client';

import {CotatoLogo} from '@/components/logo/CotatoLogo';
import Image from 'next/image';
import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';

export const AboutUsBanner = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('main-activities');
    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <section
      className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-black'
      aria-label='소개 배너'>
      <div className='relative flex w-full justify-center transition-all duration-500'>
        <Image
          src='/keycap/background-universe.svg'
          alt=''
          width={1920}
          height={600}
          className='object-cover'
          priority
        />
      </div>
      <div className='absolute top-1/2 left-1/6 z-10 flex h-[50%] -translate-y-1/2 flex-col items-center justify-between'>
        <CotatoLogo />
        <button
          onClick={scrollToNextSection}
          className='animate-bounce cursor-pointer'
          aria-label='활동 소개 섹션으로 이동'>
          <MainArrowIcon />
        </button>
      </div>
    </section>
  );
};
