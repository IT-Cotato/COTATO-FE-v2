'use client';

import {Button} from '@/components/button/Button';
import {PART_TABS} from '@/constants/admin/admin-application-form';
import {PartEtcType} from '@/schemas/admin/admin-application-type';

import {useRouter, useSearchParams} from 'next/navigation';

export const AdminApplicationFormTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePart = (searchParams.get('part') as PartEtcType) ?? 'plan';

  const handleTabClick = (part: PartEtcType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('part', part);

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex gap-17.5'>
      {PART_TABS.map(({label, value}) => {
        const isActive = activePart === value;

        return (
          <Button
            key={value}
            label={label}
            labelTypo='h5'
            onClick={() => handleTabClick(value)}
            textColor={isActive ? 'neutral-800' : 'neutral-500'}
            backgroundColor='neutral-50'
            width='min-w-[50px]'
            height={40}
          />
        );
      })}
    </div>
  );
};
