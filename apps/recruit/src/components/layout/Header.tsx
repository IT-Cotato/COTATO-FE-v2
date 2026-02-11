'use client';

import Link from 'next/link';
import {HEADER_ITEMS} from '@/constants/layout/layout-header';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import {usePathname, useRouter} from 'next/navigation';
import {Dropdown} from '@/components/layout/Dropdown';
import clsx from 'clsx';
import {useLogout} from '@/hooks/mutations/useAuth';
import {useAuthStore} from '@/store/useAuthStore';
import {useShallow} from 'zustand/shallow';
import {LoginModal} from '@/components/modal/LoginModal';
import {useState} from 'react';
import {ROUTES} from '@/constants/routes';
import {useApplicationStatusQuery} from '@/hooks/queries/useApply.query';
import {HEADER_HEIGHT} from '@/constants/ui';
import ChevronRight from '@/assets/chevrons/chevron-right.svg';

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

  const {data: applicationStatus} = useApplicationStatusQuery(isAuthenticated);
  const hasSubmitted = applicationStatus?.isSubmitted ?? false;

  const handleLogoutClick = () => {
    mutate();
    router.push('/');
  };

  const handleMypageClick = () => {
    router.push(ROUTES.MYPAGE);
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
        className='z-header sticky top-0 flex w-full min-w-360 items-center justify-between bg-black pr-26.25 pl-6.25'>
        <div>
          <Link href='https://recruit.cotato.kr/' target='_blank'>
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
                    className='text-body-l-sb flex cursor-pointer items-center justify-center gap-2.5 px-4.25 py-6 text-white'>
                    <SmallLogo className='h-4 w-4 text-white' /> {user.name}
                  </button>
                }
                className='text-body-l-sb absolute flex w-37.5 flex-col gap-3 rounded-sm bg-neutral-800 p-3.5'>
                <button
                  className='group flex w-full flex-row justify-between border-b border-b-neutral-700 pb-2.75'
                  onClick={handleMypageClick}>
                  <span className='group-hover:text-primary text-neutral-100 duration-300'>
                    마이페이지
                  </span>
                  <ChevronRight className='group-hover:text-primary h-5 w-5 text-neutral-100 duration-300' />
                </button>
                <button
                  onClick={handleLogoutClick}
                  className='hover:text-primary flex w-full items-center gap-0.75 text-neutral-100 duration-300'>
                  로그아웃
                </button>
              </Dropdown>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className='text-body-l-sb text-primary px-4.25 text-center'>
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
