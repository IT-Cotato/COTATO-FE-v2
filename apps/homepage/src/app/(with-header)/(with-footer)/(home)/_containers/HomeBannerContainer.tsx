'use client';

import MainArrowIcon from '@/assets/home/main-arrow-icon.svg';
import Image from 'next/image';
import {CotatoLogo} from '@/components/logo/CotatoLogo';
import {useAuthStore} from '@/store/useAuthStore';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {Button} from '@repo/ui/components/buttons/Button';
import {motion} from 'framer-motion';

export const HomeBannerContainer = () => {
  const router = useRouter();
  const {isAuthenticated, isInitialized} = useAuthStore();

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('core-value');
    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleJoinUsClick = () => {
    router.push(ROUTES.ONBOARDING);
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
        className='absolute bottom-60 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100'
        aria-hidden='true'>
        {isInitialized &&
          (isAuthenticated ? (
            <button
              onClick={scrollToNextSection}
              className='animate-bounce cursor-pointer'
              aria-label='핵심 가치 섹션으로 이동'>
              <MainArrowIcon />
            </button>
          ) : (
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
                  'drop-shadow(0 4px 20px rgba(255, 255, 255, 0.6))',
                  'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}>
              <Button
                label='JOIN US'
                width={185}
                height={55}
                backgroundColor='neutral-100'
                textColor='neutral-800'
                labelTypo='h5'
                onClick={handleJoinUsClick}
                className='transition-shadow duration-300 hover:shadow-[0_4px_40px_0_rgba(255,255,255,0.80)]'
              />
            </motion.div>
          ))}
      </div>
    </section>
  );
};
