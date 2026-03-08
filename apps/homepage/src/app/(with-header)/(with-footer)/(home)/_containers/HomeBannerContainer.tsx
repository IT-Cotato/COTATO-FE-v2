'use client';

import {useState} from 'react';
import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';
import Image from 'next/image';
import {CotatoLogo} from '@repo/ui/components/logo/CotatoLogo';
import clsx from 'clsx';

export const HomeBannerContainer = () => {
  const [isOverlayHidden, setIsOverlayHidden] = useState<boolean>(false);

  const scrollToNextSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSection = document.getElementById('core-value');
    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const toggleOverlay = () => {
    setIsOverlayHidden(!isOverlayHidden);
  };

  return (
    <section
      className='group relative flex h-screen w-full items-center overflow-hidden bg-black'
      aria-label='홈 배너'
      onClick={toggleOverlay}>
      <div className='absolute inset-0 translate-y-0 transition-all duration-500 xl:px-12.5 xl:group-hover:translate-y-4'>
        <div className='relative h-full w-full overflow-hidden rounded-2xl'>
          <Image
            src='/keycap/background-keycap.svg'
            alt=''
            fill
            className='object-cover object-[40%_center] md:object-center xl:object-contain'
            priority
            aria-hidden='true'
          />
        </div>
      </div>

      <div
        className={clsx(
          'absolute inset-0 z-10 transition-opacity duration-500',
          'bg-black/40 backdrop-blur-[6px]',
          isOverlayHidden ? 'opacity-0' : 'opacity-100',
          'xl:opacity-0 xl:backdrop-blur-none xl:group-hover:bg-black/60 xl:group-hover:opacity-100'
        )}
        aria-hidden='true'
      />

      <div
        className={clsx(
          'absolute top-1/3 left-1/2 z-20 flex -translate-x-1/2 -translate-y-2/3 flex-col items-center transition-opacity duration-300',
          isOverlayHidden ? 'opacity-0' : 'opacity-100',
          'xl:opacity-0 xl:group-hover:opacity-100'
        )}>
        <CotatoLogo />
      </div>

      <div
        className={clsx(
          'absolute bottom-60 left-1/2 z-20 -translate-x-1/2 transition-all duration-300',
          isOverlayHidden ? 'opacity-0' : 'opacity-100',
          'xl:opacity-0 xl:group-hover:opacity-100'
        )}>
        <button
          onClick={scrollToNextSection}
          className='h-6.75 w-6.75 animate-bounce cursor-pointer sm:h-12.5 sm:w-12.5'
          aria-label='핵심 가치 섹션으로 이동'>
          <MainArrowIcon />
        </button>
      </div>
    </section>
  );
};
