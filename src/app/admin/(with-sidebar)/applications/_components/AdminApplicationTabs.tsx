'use client';

import {AdminApplicationPart} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationPart';
import {AdminApplicationTable} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationTable';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {PART_TABS} from '@/constants/admin/admin-applications';
import {PartType} from '@/schemas/admin-application-type';
import {useRouter, useSearchParams} from 'next/navigation';

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
      <SuspenseWrapper>
        <AdminApplicationTable />
      </SuspenseWrapper>
    </>
  );
};
