'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import clsx from 'clsx';
import {MEMBER_TABS} from '@/constants/admin/admin';
import {MemberTabType} from '@/schemas/admin/admin.type';
import {AllMembersTableContainer} from '@/app/(with-header)/mypage/admin/users/_containers/AllMembersTableContainer';
import {ActiveMembersTableContainer} from '@/app/(with-header)/mypage/admin/users/_containers/ActiveMembersTableContainer';

export const AdminUsersContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as MemberTabType) ?? 'ALL';

  const handleTabClick = (tab: MemberTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1');
    params.delete('search');
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
      </div>

      {activeTab === 'ALL' ? (
        <AllMembersTableContainer />
      ) : (
        <ActiveMembersTableContainer />
      )}
    </div>
  );
};
