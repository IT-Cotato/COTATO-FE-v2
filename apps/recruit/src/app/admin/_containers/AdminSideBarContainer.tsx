'use client';

import {AdminDesktopSideBar} from '@/app/admin/_components/_desktop/AdminDesktopSideBar';
import {AdminMobileNavBar} from '@/app/admin/_components/_mobile/AdminMobileNavBar';
import {ADMIN_NAV_ITEMS} from '@/constants/admin/admin-sidebar';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';
import {usePathname} from 'next/navigation';
import {useRef, useState} from 'react';

export const AdminSideBarContainer = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useClickOutside(mobileNavRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const currentItem =
    ADMIN_NAV_ITEMS.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    ) || ADMIN_NAV_ITEMS[0];

  return (
    <>
      <aside className='z-sidebar sticky top-0 left-0 hidden h-screen self-start bg-neutral-50 lg:block'>
        <AdminDesktopSideBar pathName={pathname} />
      </aside>

      <div ref={mobileNavRef} className='block w-full px-4 py-3 lg:hidden'>
        <AdminMobileNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          currentItem={currentItem}
          pathName={pathname}
        />
      </div>
    </>
  );
};
