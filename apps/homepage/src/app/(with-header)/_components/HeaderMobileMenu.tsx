import Link from 'next/link';
import {ROUTES} from '@/constants/routes';
import CancelIcon from '@/assets/cancel/cancel.svg';
import SmallLogoIcon from '@/assets/small-logo/small-logo.svg';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  pathname: string;
  mobileNavItems: Array<{label: string; href: string; external?: boolean}>;
  userName?: string;
  isInitialized: boolean;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  onLogout: () => void;
  onClose: () => void;
}

export const HeaderMobileMenu = ({
  isOpen,
  pathname,
  mobileNavItems,
  userName,
  isInitialized,
  isAuthenticated,
  isAdmin,
  onLogout,
  onClose,
}: HeaderMobileMenuProps) => {
  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/50 lg:hidden'
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-80 flex h-full w-70 flex-col bg-neutral-800 transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <nav className='flex h-full flex-col'>
          <div className='flex flex-col border-b border-neutral-600 px-4 py-[12.5px]'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-row items-center gap-1.25'>
                <SmallLogoIcon className='text-primary h-4 w-4' />
                <span className='text-h5 font-bold text-neutral-50'>
                  {isInitialized &&
                    (isAuthenticated ? `${userName}` : '로그인이 필요합니다')}
                </span>
              </div>

              <button onClick={onClose} aria-label='메뉴 닫기'>
                <CancelIcon className='h-4 w-4 text-white' />
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-8 px-10 py-10'>
            {mobileNavItems.map(({label, href, external}) => {
              const isActive = !external && pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  className={`text-h5 font-bold transition-all duration-300 hover:text-neutral-50 ${
                    isActive ? 'text-neutral-50' : 'text-neutral-300'
                  }`}>
                  {label}
                </Link>
              );
            })}

            {/** 로그인되어 있을 경우 마이페이지 탭 추가 */}
            {isInitialized && isAuthenticated && (
              <div className='flex flex-col gap-8'>
                <Link
                  href={ROUTES.MYPAGE}
                  className={`text-h5 font-bold transition-all duration-300 hover:text-neutral-50 ${
                    pathname.startsWith(ROUTES.MYPAGE)
                      ? 'text-neutral-50'
                      : 'text-neutral-300'
                  }`}>
                  MY PAGE
                </Link>
                <div className='text-h5 flex flex-col gap-3 pl-5'>
                  <Link
                    href={ROUTES.MYPAGE_ACTIVITY}
                    className={`transition-all duration-300 hover:text-neutral-50 ${
                      pathname.startsWith(ROUTES.MYPAGE_ACTIVITY)
                        ? 'text-neutral-50'
                        : 'text-neutral-300'
                    }`}>
                    마이 메뉴
                  </Link>
                  <Link
                    href={ROUTES.MYPAGE_ACCOUNT}
                    className={`transition-all duration-300 hover:text-neutral-50 ${
                      pathname.startsWith(ROUTES.MYPAGE_ACCOUNT)
                        ? 'text-neutral-50'
                        : 'text-neutral-300'
                    }`}>
                    설정
                  </Link>
                  {isAdmin && (
                    <Link
                      href={ROUTES.ADMIN_USERS}
                      className={`transition-all duration-300 hover:text-neutral-50 ${
                        pathname.startsWith(ROUTES.ADMIN_USERS)
                          ? 'text-neutral-50'
                          : 'text-neutral-300'
                      }`}>
                      관리자 메뉴
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {isInitialized && (
            <div className='mt-auto flex flex-col px-7 pb-10'>
              {!isAuthenticated ? (
                <Link
                  href={ROUTES.ONBOARDING}
                  className='text-body-l-sb text-primary border-primary rounded-[30px] border px-4 py-2.25 text-center duration-300'>
                  로그인
                </Link>
              ) : (
                <button
                  onClick={onLogout}
                  className='text-body-l-sb text-primary border-primary rounded-[30px] border px-4 py-2.25 text-center duration-300'>
                  로그아웃
                </button>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
