'use client';

import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {RecruitLayout} from '@/components/layout/RecruitLayout';
import {useRecruitmentsStatus} from '@/hooks/queries/useAdminRecruit.query';
import {useEffect, useState} from 'react';

export const ActionContainer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const {data, isLoading} = useRecruitmentsStatus();
  const isRecruiting = data?.active ?? false;
  const visualStripSrc = isMobile
    ? '/images/visual/recruitment-visual-strip-double.webp'
    : '/images/visual/recruitment-visual-strip-black.webp';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[#010101]'>
        <Spinner />
      </div>
    );
  }

  return (
    <RecruitLayout
      isRecruiting={isRecruiting}
      backgroundColor='bg-[#010101]'
      visualStripSrc={visualStripSrc}
      limitVisualStripWidth={true}
    />
  );
};
