'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import clsx from 'clsx';
import {MEMBER_TABS} from '@/constants/admin/admin-users';
import {MemberTabType} from '@/schemas/admin/admin-users.schema';
import {AdminUsersTableContainer} from './AdminUsersTableContainer';

export const AdminUsersContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as MemberTabType) ?? 'ALL';

  const handleTabClick = (tab: MemberTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='w-full'>
      <div role='tablist' className='flex gap-6'>
        {MEMBER_TABS.map(({label, value}) => (
          <button
            key={value}
            role='tab'
            type='button'
            aria-selected={activeTab === value}
            className={clsx(
              'text-body-l cursor-pointer pb-2 font-semibold transition-colors',
              activeTab === value
                ? 'border-primary text-primary border-b-2'
                : 'text-neutral-400 hover:text-neutral-600'
            )}
            onClick={() => handleTabClick(value)}>
            {label}
          </button>
        ))}
      </div>

      <AdminUsersTableContainer activeTab={activeTab} />
    </div>
  );
};
