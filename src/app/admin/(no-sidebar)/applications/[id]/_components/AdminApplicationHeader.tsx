'use client';

import {PART_TABS} from '@/constants/admin/admin-application-questions';
import {AdminApplicationBasicInfoType} from '@/schemas/admin/admin-application.schema';
import LogoIcon from '@/assets/small-logo/small-logo.svg';

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
      <h1 className='flex gap-5 text-h4 font-bold text-neutral-800'>
        <LogoIcon className='h-7.5 w-7.5 text-active' />
        <span> {generation}기 </span>
        <span>
          {PART_TABS.find((tab) => tab.value === basicInfo.applicationPartType)
            ?.label ?? '-'}
        </span>
        <span> {basicInfo.name} </span>
        <span>지원서</span>
        <LogoIcon className='h-7.5 w-7.5 text-active' />
      </h1>
    </header>
  );
};
