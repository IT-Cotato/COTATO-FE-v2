'use client';

import {AdminApplicationFormPart} from '@/app/admin/(with-sidebar)/application-form/_components/form/AdminApplicationFormPart';
import {PART_TABS} from '@/constants/admin/admin-application-form';
import {PartTypeEtc} from '@/schemas/admin-application-type';
import {useRouter, useSearchParams} from 'next/navigation';

export const AdminApplicationFormTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePart = (searchParams.get('part') as PartTypeEtc) ?? 'plan';

  const handleTabClick = (part: PartTypeEtc) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('part', part);

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex gap-17.5'>
      {PART_TABS.map(({label, value}) => (
        <AdminApplicationFormPart
          partName={label}
          key={value}
          onClick={() => handleTabClick(value)}
          isActive={activePart === value}
        />
      ))}
    </div>
  );
};
