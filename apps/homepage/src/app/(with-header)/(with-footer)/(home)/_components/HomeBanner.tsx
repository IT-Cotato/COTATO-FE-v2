'use client';

import MainLogo from '@/assets/main-logo/main-logo.svg';
import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';
import Image from 'next/image';

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
        <div className='flex flex-col items-center gap-9.5'>
          <p className='text-h4 bg-linear-to-r from-[#F89202] via-[#F89202] to-[#9E9E9E] bg-clip-text whitespace-nowrap text-transparent'>
            COde Together, Arrive TOgether
          </p>
          <MainLogo
            role='img'
            aria-label='COTEATO 로고'
            className='h-auto w-auto'
          />
        </div>
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
