'use client';

import {AdminApplicationPart} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationPart';
import {AdminApplicationTable} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationTable';
import {useRouter, useSearchParams} from 'next/navigation';

type PartType = 'all' | 'plan' | 'design' | 'frontend' | 'backend';

const PART_TABS: {label: string; value: PartType}[] = [
  {label: '전체 회원', value: 'all'},
  {label: '기획', value: 'plan'},
  {label: '디자인', value: 'design'},
  {label: '프론트엔드', value: 'frontend'},
  {label: '백엔드', value: 'backend'},
];

export const AdminApplicationTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePart = (searchParams.get('part') as PartType) ?? 'all';

  const handleTabClick = (part: PartType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('part', part);

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <>
      <div className='flex gap-7.75'>
        {PART_TABS.map(({label, value}) => (
          <AdminApplicationPart
            key={value}
            partName={label}
            applyNumber={32}
            isActive={activePart === value}
            onClick={() => handleTabClick(value)}
          />
        ))}
      </div>

      <AdminApplicationTable />
    </>
  );
};
