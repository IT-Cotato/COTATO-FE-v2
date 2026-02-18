import RecruitmentLayout from '@/components/layout/RecruitmentLayout';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';

export const RecruitmentInactive = () => {
  const {data: recruitmentStatus} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.isActive ?? false;

  return (
    <RecruitmentLayout
      isRecruiting={isRecruiting}
      backgroundColor='bg-neutral-50'
      visualStripSrc='/images/visual/recruitment-visual-strip-white.webp'
    />
  );
};
