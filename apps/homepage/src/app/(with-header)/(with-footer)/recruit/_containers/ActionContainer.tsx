'use client';

import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {RecruitLayout} from '@/components/layout/RecruitLayout';
import {useRecruitmentsStatus} from '@/hooks/queries/useAdminRecruit.query';

export const ActionContainer = () => {
  const {data, isLoading} = useRecruitmentsStatus();
  const isRecruiting = data?.active ?? false;

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
      visualStripSrc='/images/visual/recruitment-visual-strip-black.webp'
      limitVisualStripWidth={true}
    />
  );
};
