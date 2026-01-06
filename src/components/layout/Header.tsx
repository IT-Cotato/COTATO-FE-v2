'use client';

import Link from 'next/link';
import {HEADER_ITEMS} from '@/constants/layout/layout-header';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import {usePathname} from 'next/navigation';
import Logout from '@/assets/logout/logout.svg';
import {ROUTES} from '@/constants/routes';
import {Dropdown} from '@/components/layout/Dropdown';
import clsx from 'clsx';
import {useLogout} from '@/hooks/mutations/useAuth';
import {useAuthStore} from '@/store/useAuthStore';
import {useShallow} from 'zustand/shallow';

export const Header = () => {
  const pathname = usePathname();
  const {mutate} = useLogout();

  const {user} = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  const menuItems = [...HEADER_ITEMS];

  if (user?.role === 'STAFF') {
    const applyIndex = menuItems.findIndex((item) => item.label === '지원하기');
    if (applyIndex >= 0) {
      menuItems.splice(applyIndex, 0, {
        label: 'ADMIN',
        href: '/admin/applications',
      });
    }
  }

  const itemClass = (isActive: boolean) =>
    clsx(
      'text-body-m flex h-22 items-center justify-center gap-2.5 px-[17px] py-6 transition-colors',
      isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
    );

  return (
    <header className='sticky top-0 z-header flex h-22 w-full items-center justify-between bg-black px-[105px]'>
      <div>
        <Link href='/'>
          <MainLogo />
        </Link>
      </div>
      <div className='flex items-center gap-5'>
        <nav className='flex gap-5'>
          {menuItems.map((item) => {
            let isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.label === 'ADMIN' && pathname.startsWith('/admin')) {
              isActive = true;
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={itemClass(isActive)}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        {user ? (
          <Dropdown
            trigger={
              <div className='flex h-22 cursor-pointer items-center justify-center gap-2.5 px-[17px] py-6 text-body-m text-white'>
                <SmallLogo /> {user.name}
              </div>
            }
            className='absolute flex h-[30px] w-[102px] flex-col items-start gap-[10px] rounded-[4px] border border-primary bg-black px-[11px] py-[6px]'>
            <button
              onClick={() => mutate()}
              className='flex w-full items-center justify-start gap-[3px] text-body-s text-primary'>
              <Logout />
              LOGOUT
            </button>
          </Dropdown>
        ) : (
          <Link
            href={ROUTES.LOGIN}
            className='flex h-22 items-center justify-center gap-2.5 px-[17px] py-6 text-body-m text-primary'>
            LOGIN
          </Link>
        )}
      </div>
    </header>
  );
};
