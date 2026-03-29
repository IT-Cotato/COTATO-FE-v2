'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import clsx from 'clsx';
import {APPROVAL_TABS} from '@/constants/admin/admin';
import {ApprovalTabType} from '@/constants/admin/admin';
import {ApprovalTableContainer} from '@/app/(with-header)/mypage/admin/approvals/_containers/ApprovalTableContainer';
import {useApplicantsQuery} from '@/hooks/queries/useAdminApprovals.query';

export const ApprovalContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab');
  const activeTab: ApprovalTabType =
    tabParam === 'REQUESTED' || tabParam === 'REJECTED'
      ? tabParam
      : 'REQUESTED';
  const searchKeyword = searchParams.get('search') ?? '';
  const [keyword, setKeyword] = useState(searchKeyword);

  useEffect(() => {
    setKeyword(searchKeyword);
  }, [searchKeyword]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('search', keyword.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleTabClick = (tab: ApprovalTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1');
    params.delete('search');
    setKeyword('');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const {data: requestedData} = useApplicantsQuery({
    status: 'REQUESTED',
    size: 1,
  });
  const {data: rejectedData} = useApplicantsQuery({
    status: 'REJECTED',
    size: 1,
  });

  const tabCounts: Record<ApprovalTabType, number> = {
    REQUESTED: requestedData?.totalElements ?? 0,
    REJECTED: rejectedData?.totalElements ?? 0,
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
              'text-body-l-b lg:text-body-l-sb cursor-pointer pb-2 transition-colors',
              activeTab === value
                ? 'border-primary text-primary border-b px-3 lg:border-b-2'
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
