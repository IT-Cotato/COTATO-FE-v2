'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import HamburgerIcon from '@/assets/layout/hamburger.svg';
import {ROUTES} from '@/constants/routes';
import {useAuthStore} from '@/store/useAuthStore';
import {useShallow} from 'zustand/shallow';
import {useMemberInfoQuery} from '@/hooks/queries/useMembers.query';
import {useEffect, useState} from 'react';
import {useAttendanceStatusQuery} from '@/hooks/queries/useAttendanceStatus.query';
import {useLogoutMutation} from '@/hooks/mutations/auth/useAuth.mutations';

import {useRecruitmentsStatus} from '@/hooks/queries/useAdminRecruit.query';
import {HeaderMobileMenu} from '@/app/(with-header)/_components/HeaderMobileMenu';

export const HeaderContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const {data: recruitStatus} = useRecruitmentsStatus();

  const navItems = [
    {label: 'ABOUT US', href: ROUTES.ABOUTUS},
    {label: 'PROJECT', href: ROUTES.PROJECT},
    {
      label: 'RECRUIT',
      href: recruitStatus?.active
        ? 'https://recruit.cotato.kr/'
        : ROUTES.RECRUIT,
      external: recruitStatus?.active,
    },
  ];

  const mobileNavItems = [
    {label: 'HOME', href: ROUTES.HOME},
    {label: 'ABOUT US', href: ROUTES.ABOUTUS},
    {label: 'PROJECT', href: ROUTES.PROJECT},
    {
      label: 'RECRUIT',
      href: recruitStatus?.active
        ? 'https://recruit.cotato.kr/'
        : ROUTES.RECRUIT,
      external: recruitStatus?.active,
    },
  ];

  const {user, isAuthenticated, isInitialized, setUser} = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isInitialized: state.isInitialized,
      setUser: state.setUser,
    }))
  );

  const {data: attendanceStatus} = useAttendanceStatusQuery(isAuthenticated);
  const {data: memberInfo} = useMemberInfoQuery(isAuthenticated);
  const {mutate: logout} = useLogoutMutation();

  useEffect(() => {
    if (memberInfo) {
      setUser(memberInfo);
    }
  }, [memberInfo, setUser]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
    }
  };

  return (
    <header className='z-header sticky top-0 flex h-12.5 w-full items-center justify-between bg-black px-6 lg:h-22 lg:min-w-360 lg:pr-26.25 lg:pl-6.25'>
      <div className='z-50'>
        <Link href={ROUTES.HOME}>
          <MainLogo className='w-28 lg:w-36.5' />
        </Link>
      </div>

      <nav className='hidden items-center gap-5 lg:flex'>
        {navItems.map(({label, href, external}) => {
          const isActive = !external && pathname === href;
          return (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              className={`text-body-l-sb white px-4.25 py-6 transition-colors duration-300 hover:text-neutral-50 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${
                isActive ? 'text-neutral-50' : 'text-neutral-300'
              }`}>
              {label}
            </Link>
          );
        })}

        {isInitialized && (
          <div className='flex items-center gap-5'>
            {!isAuthenticated ? (
              <Link
                href={ROUTES.ONBOARDING}
                className='text-primary text-body-l-sb hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'>
                LOGIN
              </Link>
            ) : (
              <>
                <Link
                  href={ROUTES.MYPAGE}
                  className='text-body-l-sb flex items-center gap-1.25 text-white'>
                  <SmallLogo className='h-4 w-4 text-white' />
                  {user?.name || '사용자'}
                </Link>
                {attendanceStatus?.openStatus === 'OPEN' && (
                  <Link
                    href={ROUTES.MYPAGE_ATTENDANCE}
                    className='border-primary text-body-l-sb bg-primary/30 rounded-[10px] border px-6 py-1.5 text-white'>
                    출석하기
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </nav>

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
        isInitialized={isInitialized}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={handleLogout}
        onClose={() => setIsMenuOpen(false)}
        isAdmin={user?.isAdmin}
      />
    </header>
  );
};
