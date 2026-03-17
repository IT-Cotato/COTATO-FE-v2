import {ADMIN_NAV_ITEMS} from '@/constants/admin/admin-sidebar';
import clsx from 'clsx';
import Link from 'next/link';

interface AdminDesktopSideBarProps {
  pathName: string;
}

export const AdminDesktopSideBar = ({pathName}: AdminDesktopSideBarProps) => {
  return (
    <nav className='sticky top-22 left-0 flex flex-col gap-7.5 px-6.25 py-12.5'>
      <h2 className='text-h4 text-neutral-400'>관리자 페이지</h2>
      <ul className='flex w-50 flex-col gap-2.5'>
        {ADMIN_NAV_ITEMS.map(({label, href}) => {
          const isActive = pathName === href || pathName.startsWith(`${href}/`);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  'text-h5 block w-full rounded-[10px] px-2 py-2.5 transition-colors',
                  isActive
                    ? 'bg-neutral-800 text-neutral-100'
                    : 'hover:bg-neutral-100'
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
