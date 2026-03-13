'use client';

import Image from 'next/image';
import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';
import {CotatoLogo} from '@repo/ui/components/logo/CotatoLogo';
import {useState} from 'react';
import clsx from 'clsx';

export const AboutUsBannerContainer = () => {
  const [isOverlayHidden, setIsOverlayHidden] = useState<boolean>(false);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('main-activities');
    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  const toggleOverlay = () => {
    if (window.innerWidth >= 1280) return;
    setIsOverlayHidden(!isOverlayHidden);
  };

  return (
    <section
      className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-black'
      aria-label='소개 배너'
      onClick={toggleOverlay}>
      <div className='relative flex h-full w-full justify-center'>
        <Image
          src='/keycap/background-universe.webp'
          alt=''
          aria-hidden='true'
          fill
          className='hidden object-cover xl:block'
          priority
          fetchPriority='high'
          quality={75}
        />
        <Image
          src='/keycap/background-universe-mobile.webp'
          alt=''
          aria-hidden='true'
          fill
          className='block object-cover xl:hidden'
          priority
          fetchPriority='high'
          quality={75}
        />
      </div>

      <div
        className={clsx(
          'absolute inset-0 z-10 flex transition-all duration-500',
          'items-center justify-center',
          isOverlayHidden ? 'pointer-events-none opacity-0' : 'opacity-100',
          'bg-black/40 backdrop-blur-[6px]',
          'xl:justify-start xl:bg-transparent xl:backdrop-blur-none'
        )}>
        <div className='flex h-[40%] flex-col items-center justify-between xl:ml-[16.666%]'>
          <CotatoLogo />
          <button
            onClick={(e) => {
              e.stopPropagation();
              scrollToNextSection();
            }}
            className='animate-bounce cursor-pointer'
            aria-label='활동 소개 섹션으로 이동'>
            <MainArrowIcon className='h-6.75 w-6.75 sm:h-12.5 sm:w-12.5' />
          </button>
        </div>
      </div>
    </section>
  );
};
