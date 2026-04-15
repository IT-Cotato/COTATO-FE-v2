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
import ChevronRight from '@/assets/chevrons/chevron-right.svg';
import HamburgerIcon from '@/assets/icons/hamburger.svg';
import {HeaderMobileMenu} from '@/app/_mobile/HeaderMobileMenu';

export const HeaderContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {mutate} = useLogout();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /** 어드민 헤더는 min-w-360(1440px) 적용하여 레이아웃 깨짐 방지 */
  const isAdmin = pathname.startsWith(ROUTES.ADMIN);

  const mobileNavItems = [
    {label: '지원하기', href: ROUTES.APPLY, canBeDisabled: true},
    {label: '모집 공고', href: ROUTES.RECRUIT},
    {label: 'FAQ', href: ROUTES.FAQ},
  ];

  const adminNavItems = [
    {label: '지원서 열람', href: ROUTES.ADMIN_APPLICATIONS},
    {label: '지원서 수정', href: ROUTES.ADMIN_APPLICATION_EDIT},
    {label: '모집 활성화', href: ROUTES.ADMIN_RECRUITMENT},
    {label: '합격자 관리', href: ROUTES.ADMIN_RESULTS},
  ];

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

  const isMyPageActive =
    pathname === ROUTES.MYPAGE || pathname.startsWith(`${ROUTES.MYPAGE}/`);

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

  return (
    <header
      style={{height: 'var(--header-h)'}}
      className={clsx(
        'z-header sticky top-0 flex w-full items-center justify-between bg-black px-6 py-3.75 lg:pr-26.25 lg:pl-6.25',
        {'lg:min-w-360': isAdmin}
      )}>
      <div>
        <Link href={ROUTES.HOME}>
          <MainLogo className='w-28 lg:w-36.5' />
        </Link>
      </div>

      <div className='hidden items-center gap-5 lg:flex'>
        <nav className='flex gap-5'>
          {menuItems.map((item) => {
            const shouldDisable = item.canBeDisabled && hasSubmitted;
            let isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.label === 'ADMIN' && pathname.startsWith(ROUTES.ADMIN)) {
              isActive = true;
            }

            if (shouldDisable) {
              return (
                <span
                  key={item.href}
                  className={clsx(
                    'text-body-l-sb cursor-not-allowed px-4.25 py-6 text-center opacity-50 transition-colors duration-300',
                    isActive ? 'text-white' : 'text-neutral-300'
                  )}>
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'text-body-l-sb px-4.25 py-6 text-center transition-colors duration-300',
                  isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                )}>
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
                <span
                  className={clsx(
                    'duration-300',
                    isMyPageActive
                      ? 'text-primary'
                      : 'group-hover:text-primary text-neutral-100'
                  )}>
                  마이페이지
                </span>
                <ChevronRight
                  className={clsx(
                    'h-5 w-5 duration-300',
                    isMyPageActive
                      ? 'text-primary'
                      : 'group-hover:text-primary text-neutral-100'
                  )}
                />
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

      {/** 모바일 햄버거 헤더  */}
      {!isMenuOpen && (
        <button
          className='z-50 block p-2 text-white lg:hidden'
          onClick={() => setIsMenuOpen(true)}
          aria-label='메뉴 열기'>
          <HamburgerIcon className='h-5 w-5' />
        </button>
      )}

      <HeaderMobileMenu
        isOpen={isMenuOpen}
        pathname={pathname}
        mobileNavItems={mobileNavItems}
        adminNavItems={adminNavItems}
        isInitialized={isInitialized}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={handleLogoutClick}
        onClose={() => setIsMenuOpen(false)}
        isAdmin={user?.role === 'STAFF'}
        hasSubmitted={hasSubmitted}
      />

      <LoginModal
        title='COTATO에 오신 것을 환영합니다!'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};
