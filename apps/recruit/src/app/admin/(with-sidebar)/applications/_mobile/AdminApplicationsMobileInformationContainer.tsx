'use client';

import SearchIcon from '@repo/ui/assets/icons/search.svg';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {RecruitmentPeriodSchemaType} from '@/schemas/admin/admin-applications.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

interface AdminApplicationsMobileInformationContainerProps {
  generation: string;
  generations: string[];
  recruitmentPeriod?: RecruitmentPeriodSchemaType;
  isLoading: boolean;
}

export const AdminApplicationsMobileInformationContainer = ({
  generation,
  generations,
  recruitmentPeriod,
  isLoading,
}: AdminApplicationsMobileInformationContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    if (isLoading) return;
    const params = new URLSearchParams(searchParams.toString());

    params.set('generationId', generation);
    params.set('page', '1');

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <aside className='flex flex-col gap-2.5 rounded-[10px] bg-neutral-100 px-5 py-3.25 lg:hidden'>
      <h2 className='text-body-l-b text-neutral-800'>활동 정보</h2>
      <div className='flex flex-row gap-2.5'>
        <div className='flex flex-col gap-2'>
          <p className='text-body-l flex flex-row gap-2.5 text-neutral-600'>
            기수 정보
          </p>
          <GenerationDropdown
            generation={generation}
            generations={generations}
            onSelect={handleGenerationSelect}
            disabled={isLoading}
            className='px-[9px] py-[6px]'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-body-l flex flex-row gap-2.5 text-neutral-600'>
            활동 기간
          </p>
          <div className='flex flex-row'>
            <div className='text-body-l flex flex-row gap-2 text-neutral-800'>
              {isLoading ? (
                <Spinner size='sm' />
              ) : (
                <>
                  <p className='rounded-[10px] bg-neutral-50 px-2.5 py-1.25'>
                    {recruitmentPeriod?.recruitmentStart?.slice(0, 10) ?? '-'}
                  </p>
                  <p className='rounded-[10px] bg-neutral-50 px-2.5 py-1.25'>
                    {recruitmentPeriod?.recruitmentEnd?.slice(0, 10) ?? '-'}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-1 items-end justify-end'>
        <form
          role='search'
          aria-label='지원자 검색'
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className='flex h-10 w-full flex-row items-center gap-2.5 rounded-[10px] bg-white px-4 py-2.75'>
          <SearchIcon
            aria-hidden='true'
            className='h-4 w-4 text-neutral-600'
            focusable='false'
          />
          <input
            type='search'
            placeholder='이름 혹은 학교 검색'
            aria-label='지원자 이름 또는 학교 검색'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            disabled={isLoading}
            className='text-body-l w-full font-normal outline-none placeholder:text-neutral-600'
          />
        </form>
      </div>
    </aside>
  );
};
