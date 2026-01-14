'use client';

import {ADMIN_NAV_ITEMS} from '@/constants/admin/admin-sidebar';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export const AdminSideBar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex w-62.5 flex-col gap-7.5'>
      <h2 className='text-h4 text-neutral-400'>관리자 페이지</h2>
      <ul className='flex w-full flex-col gap-2.5'>
        {ADMIN_NAV_ITEMS.map(({label, href}) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'block w-full rounded-[10px] px-2 py-2.5 text-h5 transition-colors',
                  isActive && 'bg-neutral-800 text-neutral-100'
                )}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
