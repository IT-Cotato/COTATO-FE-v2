'use client';

import Link from 'next/link';
import clsx from 'clsx';
import type {MouseEventHandler} from 'react';
import {getSidebarNavGroups} from '@/constants/sidebar';
import {FullButton} from '@repo/ui/components/buttons/FullButton';

interface SideBarViewProps {
  isAdmin?: boolean;
  canManageHomepageImages?: boolean;
  pathname: string;
  onLogout: () => void;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** 실제 마이페이지와 로컬 사진 화면이 공유하는 메뉴 표시다. 인증과 로그아웃 처리는 호출자가 담당한다. */
export const SideBarView = ({
  isAdmin = false,
  canManageHomepageImages = false,
  pathname,
  onLogout,
  onLinkClick,
}: SideBarViewProps) => {
  const groups = getSidebarNavGroups(isAdmin, canManageHomepageImages);

  return (
    <nav className='z-sidebar no-scrollbar sticky top-30 flex flex-col gap-6 overflow-y-auto px-6.25 py-10'>
      {groups.map(({title, items}) => (
        <div key={title} className='flex flex-col gap-4.75'>
          <h4 className='text-h4 text-neutral-400'>{title}</h4>
          <ul className='flex w-50 flex-col gap-2.5'>
            {items.map(
              ({
                label,
                href,
                icon: Icon,
                activeIcon: ActiveIcon,
                isExternal,
              }) => {
                const isActive =
                  !isExternal &&
                  (pathname === href || pathname.startsWith(`${href}/`));
                const DisplayIcon = isActive && ActiveIcon ? ActiveIcon : Icon;

                const itemStyles = clsx(
                  'text-h5 flex w-full items-center gap-2 rounded-[5px] px-2.5 py-2.25 transition-colors',
                  isActive
                    ? 'bg-neutral-800 text-neutral-100'
                    : 'text-neutral-800 hover:bg-neutral-100'
                );

                return (
                  <li key={href}>
                    {isExternal ? (
                      <a
                        href={href}
                        onClick={onLinkClick}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={itemStyles}>
                        {Icon && <Icon />}
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        onClick={onLinkClick}
                        aria-current={isActive ? 'page' : undefined}
                        className={itemStyles}>
                        {DisplayIcon && <DisplayIcon />}
                        {label}
                      </Link>
                    )}
                  </li>
                );
              }
            )}
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
        onClick={onLogout}
        wrapperClassName={clsx(isAdmin ? 'mt-[97px]' : 'mt-[481px]')}
      />
    </nav>
  );
};
