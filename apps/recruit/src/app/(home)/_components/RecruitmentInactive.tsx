'use client';

import {RecruitmentLayout} from '@/components/layout/RecruitmentLayout';
import {useEffect, useState} from 'react';

export const RecruitmentInactive = () => {
  const [isMobile, setIsMobile] = useState(false);

  const visualStripSrc = isMobile
    ? '/images/visual/visual-strip-mobile.webp'
    : '/images/visual/recruitment-visual-strip-white.webp';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <RecruitmentLayout isRecruiting={false} visualStripSrc={visualStripSrc} />
  );
};
