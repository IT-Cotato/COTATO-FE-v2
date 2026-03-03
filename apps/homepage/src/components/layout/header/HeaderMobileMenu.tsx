'use client';

import Link from 'next/link';
import {ROUTES} from '@/constants/routes';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  pathname: string;
  mobileNavItems: Array<{label: string; href: string; external?: boolean}>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const HeaderMobileMenu = ({
  isOpen,
  pathname,
  mobileNavItems,
  isInitialized,
  isAuthenticated,
  onLogout,
}: HeaderMobileMenuProps) => {
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col bg-neutral-800 transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <nav className='flex h-full flex-col gap-8 px-7.5 pt-25'>
        <h1 className='text-h4 text-neutral-400'>메인 메뉴</h1>

        {mobileNavItems.map(({label, href, external}) => {
          const isActive = !external && pathname === href;
          return (
            <Link
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              className={`text-h5 px-7 font-bold transition-all duration-300 hover:text-neutral-50 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${
                isActive
                  ? 'text-neutral-50 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                  : 'text-neutral-300'
              }`}>
              {label}
            </Link>
          );
        })}

        {isInitialized && isAuthenticated && (
          <Link
            href={ROUTES.MYPAGE}
            className={`text-h5 px-7 font-bold transition-all duration-300 hover:text-neutral-50 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${
              pathname.startsWith(ROUTES.MYPAGE)
                ? 'text-neutral-50 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                : 'text-neutral-300'
            }`}>
            MY PAGE
          </Link>
        )}

        {isInitialized && (
          <div className='mt-auto flex flex-col pb-8'>
            {!isAuthenticated ? (
              <Link
                href={ROUTES.ONBOARDING}
                className='text-body-l-sb text-primary border-primary rounded-[30px] border px-17.5 py-2.25 text-center duration-300'>
                로그인
              </Link>
            ) : (
              <button
                onClick={onLogout}
                className='text-body-l-sb text-primary border-primary rounded-[30px] border px-17.5 py-2.25 text-center duration-300'>
                로그아웃
              </button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};
