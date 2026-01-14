'use client';

import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatusQuery';

export const RecruitmentInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useRecruitmentStatusQuery();

  return <>{children}</>;
};
