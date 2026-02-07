import {CotatoLogo} from '@/components/logo/CotatoLogo';
import Image from 'next/image';

export const AboutUsBanner = () => {
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
      <div className='absolute top-1/3 left-1/6 z-10 -translate-y-1/2'>
        <CotatoLogo />
      </div>
    </section>
  );
};
