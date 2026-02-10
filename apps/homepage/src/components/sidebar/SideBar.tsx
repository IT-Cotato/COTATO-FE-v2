'use client';

import {SIDEBAR_NAV_GROUPS, ADMIN_NAV_GROUP} from '@/constants/sidebar';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface SideBarProps {
  isAdmin?: boolean;
}

export const SideBar = ({isAdmin = false}: SideBarProps) => {
  const pathname = usePathname();
  const groups = isAdmin
    ? [...SIDEBAR_NAV_GROUPS, ADMIN_NAV_GROUP]
    : SIDEBAR_NAV_GROUPS;

  // 로그아웃 핸들러
  const handleLogout = () => {
    console.log('로그아웃 처리');
  };

  return (
    <nav className='z-sidebar no-scrollbar sticky top-30 flex max-h-[calc(100vh-7.5rem)] flex-col gap-7.5 overflow-y-auto px-6.25'>
      {groups.map(({title, items}) => (
        <div key={title} className='flex flex-col gap-4.75'>
          <h4 className='text-h4 text-neutral-400'>{title}</h4>
          <ul className='flex w-50 flex-col gap-2.5'>
            {items.map(({label, href, icon: Icon}) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={clsx(
                      'text-h5 flex w-full items-center gap-2 rounded-[5px] px-2 py-2.5 transition-colors',
                      isActive
                        ? 'bg-neutral-800 text-neutral-100'
                        : 'text-neutral-800'
                    )}>
                    {Icon && <Icon />}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <FullButton
        label='로그아웃'
        variant='outline'
        height={40}
        backgroundColor='neutral-50'
        textColor='primary'
        labelTypo='body_l_sb'
        borderRadius={30}
        onClick={handleLogout}
        wrapperClassName={clsx('mb-10', isAdmin ? 'mt-[175px]' : 'mt-[505px]')}
      />
    </nav>
  );
};
