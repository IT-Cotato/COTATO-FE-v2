'use client';

import {PART_TABS} from '@/constants/admin/admin-application-questions';
import {AdminApplicationBasicInfoType} from '@/schemas/admin/admin-application.schema';

interface AdminApplicationHeaderProps {
  generation: string;
  basicInfo: AdminApplicationBasicInfoType;
}

export const AdminApplicationHeader = ({
  generation,
  basicInfo,
}: AdminApplicationHeaderProps) => {
  return (
    <header>
      <h1 className='flex gap-5 text-h1 font-bold'>
        <p className='text-neutral-600'>🥔 {generation}기 </p>
        <p className='text-neutral-800'>
          {PART_TABS.find((tab) => tab.value === basicInfo.applicationPartType)
            ?.label ?? '-'}
        </p>
        <p className='text-neutral-800'> {basicInfo.name}</p>
        <p className='text-neutral-600'>지원서 🥔</p>
      </h1>
    </header>
  );
};
