'use client';

import SearchIcon from '@/assets/icons/search.svg';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Spinner} from '@/components/ui/Spinner';
import {RecruitmentPeriodSchemaType} from '@/schemas/admin/admin-applications-schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

interface AdminApplicationInformationProps {
  recruitmentPeriod?: RecruitmentPeriodSchemaType;
  isLoading: boolean;
}

export const AdminApplicationInformation = ({
  recruitmentPeriod,
  isLoading,
}: AdminApplicationInformationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const generation = searchParams.get('generationId') ?? '13';

  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') ?? ''
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (keyword.trim()) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleGenerationSelect = (generation: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('generationId', generation);
    params.set('page', '1');

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex w-full justify-between gap-y-4 rounded-[10px] bg-neutral-100 p-4'>
      <div className='flex flex-row gap-7.25'>
        <div className='flex flex-col gap-4'>
          <p className='text-body-m font-bold text-neutral-600'>기수 정보</p>
          <GenerationDropdown
            generation={generation}
            generations={['13', '12', '11', '10']}
            onSelect={handleGenerationSelect}
            disabled={isLoading}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-body-m font-bold text-neutral-600'>지원기간</p>
          <div className='flex flex-row gap-2.5 text-body-m font-normal'>
            {isLoading ? (
              <Spinner size='sm' />
            ) : (
              <>
                <p className='rounded-[10px] bg-neutral-50 px-7 py-1.5 text-neutral-800'>
                  {recruitmentPeriod?.recruitmentStart.slice(0, 10)}
                </p>
                <p className='rounded-[10px] bg-neutral-50 px-7 py-1.5 text-neutral-800'>
                  {recruitmentPeriod?.recruitmentEnd.slice(0, 10)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-1 items-end justify-end lg:pl-10'>
        <div className='flex h-12.5 max-w-108.25 flex-row items-center gap-2.5 rounded-[10px] bg-white px-4 py-2.75'>
          <SearchIcon />
          <input
            type='text'
            placeholder='이름 혹은 학교 검색'
            aria-label='지원자 이름 또는 학교 검색'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isLoading}
            className='w-full text-body-l font-normal outline-none'
          />
        </div>
      </div>
    </div>
  );
};
