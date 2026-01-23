'use client';

import {PART_TABS} from '@/constants/admin/admin-application-questions';
import {AdminApplicationBasicInfoType} from '@/schemas/admin/admin-application.schema';

interface AdminApplicationHeaderProps {
  generation: string | null;
  basicInfo: AdminApplicationBasicInfoType;
}

export const AdminApplicationHeader = ({
  generation,
  basicInfo,
}: AdminApplicationHeaderProps) => {
  return (
    <header>
      <h1 className='flex gap-5 text-h1 font-bold'>
        <span className='text-neutral-600'>🥔 {generation}기 </span>
        <span className='text-neutral-800'>
          {PART_TABS.find((tab) => tab.value === basicInfo.applicationPartType)
            ?.label ?? '-'}
        </span>
        <span className='text-neutral-800'> {basicInfo.name}</span>
        <span className='text-neutral-600'>지원서 🥔</span>
      </h1>
    </header>
  );
};
