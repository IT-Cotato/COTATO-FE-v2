import SmallLogoIcon from '@/assets/small-logo/small-logo.svg';
import CancelIcon from '@/assets/icons/delete.svg';
import Link from 'next/link';
import {ROUTES} from '@/constants/routes';
import {useState} from 'react';
import {LoginModal} from '@/components/modal/LoginModal';
import {createPortal} from 'react-dom';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  pathname: string;
  mobileNavItems: Array<{label: string; href: string; canBeDisabled?: boolean}>;
  adminNavItems: Array<{label: string; href: string}>;
  userName?: string;
  isInitialized: boolean;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  onLogout: () => void;
  onClose: () => void;
  hasSubmitted: boolean;
}
export const HeaderMobileMenu = ({
  isOpen,
  pathname,
  mobileNavItems,
  adminNavItems,
  userName,
  isInitialized,
  isAuthenticated,
  isAdmin,
  onLogout,
  onClose,
  hasSubmitted,
}: HeaderMobileMenuProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/50 lg:hidden'
          onClick={onClose}
        />
      )}
      <div
        className={`z-header fixed top-0 right-0 flex h-full w-70 flex-col bg-neutral-800 transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <nav className='flex h-full flex-col'>
          <div className='flex flex-col border-b border-neutral-600 px-4 py-3.25'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-row items-center gap-1.25'>
                <SmallLogoIcon className='text-primary h-4 w-4' />
                <span className='text-h5 font-bold text-neutral-50'>
                  {isInitialized &&
                    (isAuthenticated ? `${userName}` : '로그인이 필요합니다')}
                </span>
              </div>
              <button onClick={onClose} aria-label='메뉴 닫기'>
                <CancelIcon className='h-6 w-6 text-white' />
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-8 overflow-y-auto px-10 py-10'>
            <div className='flex flex-col gap-4'>
              <p className='text-h5 pb-2 font-bold text-neutral-50'>
                메인 메뉴
              </p>
              {mobileNavItems.map(({label, href, canBeDisabled}) => {
                const isActive = pathname === href;
                const isDisabled = canBeDisabled && hasSubmitted;

                {
                  /** 이미 지원한 사용자일 경우 지원하기 disabled */
                }
                if (isDisabled) {
                  return (
                    <span
                      key={label}
                      className='text-h5 cursor-not-allowed font-bold text-neutral-600'>
                      {label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={onClose}
                    className={`text-h5 px-4 transition-all duration-300 hover:text-neutral-50 ${
                      isActive ? 'text-neutral-50' : 'text-neutral-400'
                    }`}>
                    {label}
                  </Link>
                );
              })}
              {/* 마이페이지 (로그인 시 노출) */}
              {isInitialized && isAuthenticated && (
                <div className='flex flex-col gap-6'>
                  <Link
                    href={ROUTES.MYPAGE}
                    onClick={onClose}
                    className={`text-h5 px-4 font-bold transition-all duration-300 hover:text-neutral-50 ${
                      pathname.startsWith(ROUTES.MYPAGE)
                        ? 'text-primary'
                        : 'text-neutral-400'
                    }`}>
                    마이 페이지
                  </Link>
                </div>
              )}
            </div>

            {/* 관리자 메뉴 (STAFF 권한 전용) */}
            {isInitialized && isAdmin && (
              <div className='flex flex-col gap-4 pt-8'>
                <p className='text-h5 pb-2 font-bold text-neutral-50'>ADMIN</p>
                {adminNavItems.map(({label, href}) => {
                  const isActive =
                    pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={onClose}
                      className={`text-h5 px-4 transition-all duration-300 hover:text-neutral-50 ${
                        isActive ? 'text-primary' : 'text-neutral-400'
                      }`}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 하단 로그인/로그아웃*/}
          {isInitialized && (
            <div className='mt-auto flex flex-col px-7 pb-10'>
              {!isAuthenticated ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className='text-body-l-sb text-primary border-primary rounded-[30px] border px-4 py-2.25 text-center duration-300'>
                  로그인
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className='text-body-l-sb text-primary border-primary rounded-[30px] border px-4 py-2.25 text-center duration-300'>
                  로그아웃
                </button>
              )}
            </div>
          )}
        </nav>

        {createPortal(
          <LoginModal
            title='COTATO에 오신 것을 환영합니다!'
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />,
          document.body
        )}
      </div>
    </>
  );
};
