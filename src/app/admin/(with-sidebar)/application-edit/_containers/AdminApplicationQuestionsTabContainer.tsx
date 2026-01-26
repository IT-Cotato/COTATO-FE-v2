'use client';

import {Button} from '@/components/button/Button';
import {PART_TABS} from '@/constants/common/part';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';

import {useRouter, useSearchParams} from 'next/navigation';

export const AdminApplicationQuestionsTabContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const partParam = searchParams.get('questionType') as PartType | null;

  const handleTabClick = (part: PartType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('questionType', part);

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex gap-12.5'>
      {PART_TABS.map(({label, value}) => {
        const isActive = partParam === value;

        return (
          <Button
            key={value}
            label={label}
            labelTypo='h5'
            onClick={() => handleTabClick(value)}
            textColor={isActive ? 'neutral-800' : 'neutral-500'}
            backgroundColor='white'
            width='min-w-[50px]'
            height={40}
          />
        );
      })}
    </div>
  );
};
