'use client';

import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';

export const RecruitmentInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useRecruitmentStatusQuery();

  return <>{children}</>;
};
