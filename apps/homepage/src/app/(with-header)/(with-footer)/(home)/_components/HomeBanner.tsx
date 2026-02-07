'use client';

import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';
import Image from 'next/image';
import {CotatoLogo} from '@/components/logo/CotatoLogo';

export const HomeBanner = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('core-value');
    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <section
      className='group relative flex h-screen w-full items-center overflow-hidden bg-black'
      aria-label='홈 배너'>
      <div className='relative flex w-full justify-center transition-all duration-500 group-hover:translate-y-4'>
        <Image
          src='/keycap/background-keycap.svg'
          alt=''
          width={1440}
          height={600}
          className='object-cover'
          priority
        />
      </div>

      <div
        className='absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-50'
        aria-hidden='true'
      />

      <div className='absolute top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-2/3 flex-col items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <CotatoLogo />
      </div>

      <div
        className='absolute bottom-40 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100'
        aria-hidden='true'>
        <button
          onClick={scrollToNextSection}
          className='animate-bounce cursor-pointer'
          aria-label='핵심 가치 섹션으로 이동'>
          <MainArrowIcon />
        </button>
      </div>
    </section>
  );
};
