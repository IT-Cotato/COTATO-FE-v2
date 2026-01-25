'use client';

import {AdminApplicationsTabPart} from '@/app/admin/(with-sidebar)/applications/_components/tab/AdminApplicationsTabPart';
import {PART_COUNT_MAP, PART_TABS} from '@/constants/admin/admin-applications';
import {
  ApplicationPartViewType,
  ApplicationSummaryType,
} from '@/schemas/admin/admin-applications.schema';
import {useRouter, useSearchParams} from 'next/navigation';

interface AdminApplicationsTabContainerProps {
  summary?: ApplicationSummaryType;
  isLoading: boolean;
}

export const AdminApplicationsTabContainer = ({
  summary,
  isLoading,
}: AdminApplicationsTabContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePart =
    (searchParams.get('part') as ApplicationPartViewType) ?? 'ALL';

  const handleTabClick = (part: ApplicationPartViewType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('part', part);
    params.set('page', '1');

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex gap-7.5'>
      {PART_TABS.map(({label, value}) => {
        const countKey = PART_COUNT_MAP[value];
        const applyNumber = summary?.[countKey];

        return (
          <AdminApplicationsTabPart
            key={value}
            partName={label}
            applyNumber={isLoading ? undefined : applyNumber}
            isActive={activePart === value}
            onClick={() => handleTabClick(value)}
          />
        );
      })}
    </div>
  );
};
