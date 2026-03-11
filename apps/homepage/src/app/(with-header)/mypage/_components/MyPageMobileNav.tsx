'use client';

import {useState, useMemo, useEffect} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {ADMIN_NAV_GROUP, SIDEBAR_NAV_GROUPS} from '@/constants/sidebar';

export const MobileMyPageNav = ({isAdmin}: {isAdmin?: boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const allGroups = useMemo(() => {
    return isAdmin
      ? [...SIDEBAR_NAV_GROUPS, ADMIN_NAV_GROUP]
      : SIDEBAR_NAV_GROUPS;
  }, [isAdmin]);

  const currentItem = useMemo(() => {
    return (
      allGroups
        .flatMap((group) => group.items)
        .find((item) => item.href === pathname) ||
      SIDEBAR_NAV_GROUPS[0].items[0]
    );
  }, [allGroups, pathname]);

  const activeGroup = useMemo(() => {
    return (
      allGroups.find((group) =>
        group.items.some((item) => item.href === pathname)
      ) || SIDEBAR_NAV_GROUPS[0]
    );
  }, [allGroups, pathname]);

  const handleMove = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };

  return (
    <div className='relative w-full px-6 py-10 md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center gap-2.5 rounded-[10px] border border-neutral-100 bg-white p-2.5 text-left'>
        <span className='text-h3 text-neutral-800'>{currentItem.label}</span>
        <ChevronDown
          className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-30 bg-transparent'
            onClick={() => setIsOpen(false)}
          />
          <div className='shadow-mobile-dropdown absolute right-6 left-6 z-40 mt-2.5 overflow-hidden rounded-[5px] border border-neutral-200 bg-white'>
            <div className='flex flex-col gap-2 px-2 py-2.5'>
              {activeGroup.items.map((item) => {
                const isSelected = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleMove(item.href, item.isExternal)}
                    className={`text-h5 h-11.25 rounded-[5px] p-2 text-left ${
                      isSelected
                        ? 'bg-neutral-800 text-neutral-50'
                        : 'text-neutral-800'
                    }`}>
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
