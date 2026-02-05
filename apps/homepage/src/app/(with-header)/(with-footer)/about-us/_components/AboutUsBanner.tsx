import BackgroundUniverse from '@/assets/about-us/background-universe.svg';
import {CotatoLogo} from '@/components/logo/CotatoLogo';

export const AboutUsBanner = () => {
  return (
    <section className='relative flex h-270 w-full items-center justify-center overflow-hidden bg-black'>
      <div className='absolute inset-0 z-0 flex items-center justify-center'>
        <BackgroundUniverse className='h-full w-full -translate-y-30 object-cover' />
      </div>
      <div className='absolute top-1/3 left-1/6 z-10 -translate-y-1/2'>
        <CotatoLogo />
      </div>
    </section>
  );
};
