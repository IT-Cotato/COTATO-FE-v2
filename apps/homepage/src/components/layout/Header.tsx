'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import MainLogo from '@/assets/main-logo/main-logo.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import {ROUTES} from '@/constants/routes';
import {useAuthStore} from '@/store/useAuthStore';
import {useShallow} from 'zustand/shallow';
import {useMemberInfoQuery} from '@/hooks/queries/useMembers.query';
import {useEffect} from 'react';

const NAV_ITEMS = [
  {label: 'ABOUT US', href: ROUTES.ABOUTUS},
  {label: 'PROJECT', href: ROUTES.PROJECT},
  {label: 'RECRUIT', href: 'https://recruit.cotato.kr/', external: true},
];

export const Header = () => {
  const pathname = usePathname();

  const {user, isAuthenticated, isInitialized, setUser} = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isInitialized: state.isInitialized,
      setUser: state.setUser,
    }))
  );

  const {data: memberInfo} = useMemberInfoQuery(isAuthenticated);

  useEffect(() => {
    if (memberInfo) {
      setUser(memberInfo);
    }
  }, [memberInfo, setUser]);

  return (
    <header className='z-header sticky top-0 flex h-22 w-full min-w-360 items-center justify-between bg-black pr-26.25 pl-6.25'>
      <div>
        <Link href={ROUTES.HOME}>
          <MainLogo className='w-36.5' />
        </Link>
      </div>
      <nav className='flex items-center gap-5'>
        {NAV_ITEMS.map(({label, href, external}) => {
          const isActive = !external && pathname === href;
          const baseClasses =
            'text-body-l-sb px-4.25 py-6 transition-colors duration-300 hover:text-white';
          const colorClasses = isActive ? 'text-white' : 'text-neutral-300';

          return (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              className={`${baseClasses} ${colorClasses}`}>
              {label}
            </Link>
          );
        })}

        {isInitialized && (
          <>
            {!isAuthenticated ? (
              // 로그인 안 되어 있을 때
              <Link
                href={ROUTES.ONBOARDING}
                className='text-primary text-body-l-sb'>
                LOGIN
              </Link>
            ) : (
              <>
                <Link
                  href={ROUTES.MYPAGE}
                  className='text-body-l-sb flex flex-row items-center justify-center gap-1.25 px-4.25 py-6 text-white'>
                  <SmallLogo className='h-4 w-4 text-white' />
                  {user?.name || '사용자'}
                </Link>

                {/* 출석 활성화 시간일 때  */}
                <Link
                  href={ROUTES.MYPAGE_ATTENDANCE}
                  className='border-primary text-body-l-sb bg-primary/30 rounded-[10px] border px-6 py-1.5 text-white'>
                  출석하기
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
