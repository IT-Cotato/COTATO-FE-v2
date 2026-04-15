'use client';

import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {useEffect, useState} from 'react';
import {RecruitmentLayout} from '@/components/layout/RecruitmentLayout';

export const ActionContainer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const {data: recruitmentStatus, isLoading} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.isActive ?? false;

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
    <RecruitmentLayout
      isRecruiting={isRecruiting}
      backgroundColor='bg-[#010101]'
      backgroundSrc={
        isMobile
          ? undefined
          : '/images/background/recruitment-background-keycaps.webp'
      }
      visualStripSrc={
        isMobile ? '/images/visual/visual-strip-mobile.webp' : undefined
      }
    />
  );
};
