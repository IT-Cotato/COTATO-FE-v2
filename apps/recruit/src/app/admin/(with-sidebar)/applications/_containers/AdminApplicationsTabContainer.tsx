'use client';

import {AdminApplicationsTabPart} from '@/app/admin/(with-sidebar)/applications/_components/tab/AdminApplicationsTabPart';
import {
  APPLICATIONS_PART_TABS,
  PART_COUNT_MAP,
} from '@/constants/admin/admin-applications';
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    e.preventDefault();

    const nextIndex =
      e.key === 'ArrowRight'
        ? (index + 1) % APPLICATIONS_PART_TABS.length
        : (index - 1 + APPLICATIONS_PART_TABS.length) %
          APPLICATIONS_PART_TABS.length;

    const nextTab = APPLICATIONS_PART_TABS[nextIndex];
    handleTabClick(nextTab.value);
  };

  return (
    <div className='flex gap-7.5' role='tablist' aria-label='지원 파트 선택'>
      {APPLICATIONS_PART_TABS.map(({label, value}, index) => {
        const countKey = PART_COUNT_MAP[value];
        const applyNumber = summary?.[countKey];
        const isActive = activePart === value;
        return (
          <AdminApplicationsTabPart
            key={value}
            partName={label}
            applyNumber={isLoading ? undefined : applyNumber}
            isActive={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabClick(value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};
