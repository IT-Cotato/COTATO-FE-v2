'use client';

import {Button} from '@repo/ui/components/buttons/Button';
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
    <div
      role='tablist'
      aria-label='파트별 질문 선택'
      className='flex gap-9.5 lg:gap-12.5'>
      {PART_TABS.map(({label, value}) => {
        const isActive = partParam === value;

        return (
          <Button
            type='button'
            role='tab'
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            key={value}
            label={label}
            onClick={() => handleTabClick(value)}
            textColor={isActive ? 'neutral-800' : 'neutral-500'}
            backgroundColor='white'
            width='lg:min-w-[50px] min-w-[25px]'
            className='text-body-l-b! lg:text-h5!'
            wrapperClassName='lg:h-[40px] h-[22px]'
          />
        );
      })}
    </div>
  );
};
