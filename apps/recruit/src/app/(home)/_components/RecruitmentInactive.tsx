import RecruitmentLayout from '@/components/layout/RecruitmentLayout';

export const RecruitmentInactive = () => {
  return (
    <RecruitmentLayout
      isRecruiting={false}
      backgroundColor='bg-neutral-50'
      visualStripSrc='/images/visual/recruitment-visual-strip-white.webp'
    />
  );
};
