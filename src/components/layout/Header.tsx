'use client';

import Link from 'next/link';
import {HEADER_ITEMS} from '@/constants/layout/layout-header';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import {usePathname, useRouter} from 'next/navigation';
import Logout from '@/assets/logout/logout.svg';
import {Dropdown} from '@/components/layout/Dropdown';
import clsx from 'clsx';
import {useLogout} from '@/hooks/mutations/useAuth';
import {useAuthStore} from '@/store/useAuthStore';
import {useShallow} from 'zustand/shallow';
import {LoginModal} from '@/components/modal/LoginModal';
import {useState} from 'react';
import {ROUTES} from '@/constants/routes';
import {HEADER_HEIGHT} from '@/constants/ui';
import {useApplicationStatus} from '@/hooks/queries/useApply.query';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {mutate} = useLogout();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {user, isInitialized, isAuthenticated} = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
    }))
  );

  const {data: applicationStatus} = useApplicationStatus(isAuthenticated);
  const hasSubmitted = applicationStatus?.isSubmitted ?? false;

  const handleLogoutClick = () => {
    mutate();
    router.push('/');
  };

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
      'text-body-l-sb text-center px-4.25 py-6 transition-colors duration-300',
      isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
    );

  return (
    <>
      <header
        style={{height: `${HEADER_HEIGHT}px`}}
        className='sticky top-0 z-header flex w-full min-w-360 items-center justify-between bg-black pr-26.25 pl-6.25'>
        <div>
          <Link href='https://www.cotato.kr/' target='_blank'>
            <MainLogo className='w-36.5' />
          </Link>
        </div>
        <div className='flex items-center gap-5'>
          <nav className='flex gap-5'>
            {menuItems.map((item) => {
              const shouldDisable = item.canBeDisabled && hasSubmitted;
              let isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.label === 'ADMIN' && pathname.startsWith(ROUTES.ADMIN)) {
                isActive = true;
              }

              const linkClassName = clsx(
                itemClass(isActive),
                shouldDisable && 'cursor-not-allowed opacity-50'
              );

              if (shouldDisable) {
                return (
                  <span key={item.href} className={linkClassName}>
                    {item.label}
                  </span>
                );
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
          {isInitialized &&
            (user ? (
              <Dropdown
                trigger={
                  <button
                    type='button'
                    className='flex cursor-pointer items-center justify-center gap-2.5 px-4.25 py-6 text-body-l-sb text-white'>
                    <SmallLogo /> {user.name}
                  </button>
                }
                className='absolute rounded-sm border border-primary bg-black px-2 py-1'>
                <button
                  onClick={handleLogoutClick}
                  className='flex w-full items-center gap-0.75 text-body-l-sb text-primary'>
                  <Logout />
                  LOGOUT
                </button>
              </Dropdown>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className='px-4.25 text-center text-body-l-sb text-primary'>
                LOGIN
              </button>
            ))}
        </div>
      </header>

      <LoginModal
        title='COTATO에 오신 것을 환영합니다!'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
