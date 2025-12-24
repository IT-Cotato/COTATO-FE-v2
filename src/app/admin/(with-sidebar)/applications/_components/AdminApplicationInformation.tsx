'use client';

import SearchIcon from '@/assets/icons/search.svg';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

export const AdminApplicationInformation = () => {
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

    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex flex-row gap-[175.6px] rounded-[10px] bg-neutral-100 pt-3 pr-7.25 pb-4.75 pl-3.5'>
      <div className='flex flex-row gap-7.25'>
        <div className='flex flex-col gap-4'>
          <p className='text-body-m font-bold text-neutral-600'>기수 정보</p>
          <div className='rounded-[10px] bg-primary px-4 py-1.5 text-center text-body-m text-neutral-50'>
            13기
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-body-m font-bold text-neutral-600'>지원기간</p>
          <div className='flex flex-row gap-2.5 text-body-m font-normal'>
            <p className='rounded-[10px] bg-neutral-50 px-7 py-1.5 text-neutral-800'>
              2025-03-06
            </p>
            <p className='rounded-[10px] bg-neutral-50 px-7 py-1.5 text-neutral-800'>
              2025-03-13
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-1 pt-1.25'>
        <div className='flex flex-1 flex-row items-center gap-2.5 rounded-[10px] bg-white px-4 py-2.75'>
          <SearchIcon />
          <input
            type='text'
            placeholder='이름 혹은 학교 검색'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className='flex-1 text-body-l font-normal outline-none'
          />
        </div>
      </div>
    </div>
  );
};
