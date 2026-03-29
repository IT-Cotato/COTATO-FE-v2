import RecruitmentLayout from '@/components/layout/RecruitmentLayout';

export const RecruitmentInactive = () => {
  return (
    <RecruitmentLayout
      isRecruiting={false}
      visualStripSrc='/images/visual/recruitment-visual-strip-white.webp'
    />
  );
};
