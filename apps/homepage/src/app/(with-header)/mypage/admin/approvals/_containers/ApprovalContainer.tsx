'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import clsx from 'clsx';
import {APPROVAL_TABS} from '@/constants/admin/admin';
import {ApprovalTabType} from '@/schemas/admin/admin.schema';
import {ApprovalTableContainer} from './ApprovalTableContainer';

export const ApprovalContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as ApprovalTabType) ?? 'REQUESTED';

  // TODO: API 연동 시 검색 로직 구현
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {};

  const handleTabClick = (tab: ApprovalTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  // TODO: API 연동 시 실제 카운트로 교체
  const tabCounts: Record<ApprovalTabType, number> = {
    REQUESTED: 256,
    REJECTED: 0,
  };

  return (
    <div className='w-full'>
      <div role='tablist' className='flex items-end gap-6'>
        {APPROVAL_TABS.map(({label, value}) => (
          <button
            key={value}
            role='tab'
            type='button'
            aria-selected={activeTab === value}
            className={clsx(
              'text-body-l cursor-pointer pb-2 font-semibold transition-colors',
              activeTab === value
                ? 'border-primary text-primary border-b-2 px-3'
                : 'px-3 text-neutral-800'
            )}
            onClick={() => handleTabClick(value)}>
            {label}
            <span className='text-body-m ml-2.5 inline-flex h-5.25 min-w-4.75 items-center justify-center rounded-full bg-neutral-500 px-[5.5px] text-white'>
              {tabCounts[value]}
            </span>
          </button>
        ))}
      </div>

      <ApprovalTableContainer
        activeTab={activeTab}
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />
    </div>
  );
};
