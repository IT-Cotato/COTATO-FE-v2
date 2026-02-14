'use client';

import SearchIcon from '@repo/ui/assets/icons/search.svg';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {RecruitmentPeriodSchemaType} from '@/schemas/admin/admin-applications.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

interface AdminApplicationsInformationProps {
  generation: string;
  generations: string[];
  recruitmentPeriod?: RecruitmentPeriodSchemaType;
  isLoading: boolean;
}

export const AdminApplicationsInformation = ({
  generation,
  generations,
  recruitmentPeriod,
  isLoading,
}: AdminApplicationsInformationProps) => {
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
    <div
      className='flex w-full justify-between gap-50 gap-y-4 rounded-[10px] bg-neutral-100 p-4'
      aria-busy={isLoading}>
      <div className='flex flex-row gap-7.25'>
        <div
          className='flex flex-col gap-4'
          role='group'
          aria-labelledby='generation-label'>
          <label id='generation-label' className='text-body-l text-neutral-600'>
            기수 정보
          </label>
          <GenerationDropdown
            generation={generation}
            generations={generations}
            onSelect={handleGenerationSelect}
            disabled={isLoading}
          />
        </div>
        <div
          role='group'
          aria-labelledby='recruitment-period-label'
          className='flex flex-col gap-4'>
          <p
            id='recruitment-period-label'
            className='text-body-l text-neutral-600'>
            지원기간
          </p>

          <div className='text-body-l flex flex-row gap-2.5 font-normal'>
            {isLoading ? (
              <Spinner size='sm' />
            ) : (
              <>
                <p className='rounded-[10px] bg-neutral-50 px-8 py-1.75 text-neutral-800'>
                  {recruitmentPeriod?.recruitmentStart?.slice(0, 10)}
                </p>
                <p className='rounded-[10px] bg-neutral-50 px-8 py-1.75 text-neutral-800'>
                  {recruitmentPeriod?.recruitmentEnd?.slice(0, 10)}
                </p>
              </>
            )}
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
          className='flex h-12.5 w-full flex-row items-center gap-2.5 rounded-[10px] bg-white px-4 py-2.75'>
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
    </div>
  );
};
