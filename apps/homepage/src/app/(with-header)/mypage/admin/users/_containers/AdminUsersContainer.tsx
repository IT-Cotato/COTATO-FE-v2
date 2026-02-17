'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import clsx from 'clsx';
import {MEMBER_TABS} from '@/constants/admin/admin';
import {MemberTabType} from '@/schemas/admin/admin.schema';
import {AdminUsersTableContainer} from './AdminUsersTableContainer';
import {SearchBar} from '@/app/(with-header)/mypage/admin/_components/SearchBar';

export const AdminUsersContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as MemberTabType) ?? 'ALL';

  // TODO: API 연동 시 검색 로직 구현
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {};

  const handleTabClick = (tab: MemberTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1');
    setKeyword('');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='w-full'>
      <div role='tablist' className='flex items-end gap-6'>
        {MEMBER_TABS.map(({label, value}) => (
          <button
            key={value}
            role='tab'
            type='button'
            aria-selected={activeTab === value}
            className={clsx(
              'text-body-l cursor-pointer pb-2 font-semibold transition-colors',
              activeTab === value
                ? 'border-primary text-primary text-body-l-sb border-b-2 px-3'
                : 'text-body-l-sb px-3 text-neutral-800'
            )}
            onClick={() => handleTabClick(value)}>
            {label}
          </button>
        ))}
        {activeTab === 'ACTIVE' && (
          <SearchBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            onSearch={handleSearch}
          />
        )}
      </div>

      <AdminUsersTableContainer
        activeTab={activeTab}
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />
    </div>
  );
};
