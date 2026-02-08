import {AdminApplicationBasicInfoType} from '@/schemas/admin/admin-application.schema';
import LogoIcon from '@/assets/small-logo/small-logo.svg';
import {PART_TABS} from '@/constants/common/part';

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
      <h1 className='text-h4 flex gap-5 font-bold text-neutral-800'>
        <LogoIcon className='text-active h-7.5 w-7.5' />
        <span> {generation}기 </span>
        <span>
          {PART_TABS.find((tab) => tab.value === basicInfo.applicationPartType)
            ?.label ?? '-'}
        </span>
        <span> {basicInfo.name} </span>
        <span>지원서</span>
        <LogoIcon className='text-active h-7.5 w-7.5' />
      </h1>
    </header>
  );
};
