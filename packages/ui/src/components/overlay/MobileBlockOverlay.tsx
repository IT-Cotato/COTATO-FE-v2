'use client';

import {useState, useEffect} from 'react';
import {CotatoLogo} from '../logo/CotatoLogo';

interface MobileBlockOverlayProps {
  title: string;
}

export const MobileBlockOverlay = ({title}: MobileBlockOverlayProps) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 720);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile === false) return null;

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='mobile-block-title'
      className={`fixed inset-0 z-104 flex flex-col items-center justify-center bg-black p-10 text-center ${isMobile === null ? 'hidden max-lg:flex lg:hidden' : ''}`}>
      <CotatoLogo />
      <div className='mt-20 flex flex-col gap-10'>
        <h1 id='mobile-block-title' className='text-h2 font-bold text-white'>
          데스크톱 환경에 <br /> 최적화되어 있습니다
        </h1>
        <p className='text-h5 leading-relaxed text-neutral-400'>
          현재 {title}는 <br />
          PC 버전으로 제작 중입니다. <br />
          원활한 이용을 위해 PC로 접속해 주세요!
        </p>
      </div>
      <div className='text-body-m mt-20 text-neutral-500'>
        COMING SOON : MOBILE OPTIMIZATION
      </div>
    </div>
  );
};
