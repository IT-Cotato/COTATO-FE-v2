import {ADMIN_NAV_ITEMS} from '@/constants/admin/admin-sidebar';
import ChevronIcon from '@/assets/chevrons/chevron-right.svg';
import clsx from 'clsx';
import Link from 'next/link';

interface AdminMobileNavBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentItem: {label: string; href: string};
  pathName: string;
}

export const AdminMobileNavBar = ({
  isOpen,
  setIsOpen,
  currentItem,
  pathName,
}: AdminMobileNavBarProps) => {
  return (
    <nav className='flex w-full flex-col lg:hidden'>
      <div className='relative w-full'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-h3 flex w-full items-center gap-2.5 rounded-[10px] border border-neutral-200 bg-white p-2.5 font-semibold'>
          <span>{currentItem?.label}</span>
          <div
            className={clsx(
              'transition-transform duration-300 ease-in-out',
              isOpen ? 'rotate-270' : 'rotate-90'
            )}>
            <ChevronIcon className='h-6 w-6' />
          </div>
        </button>

        {isOpen && (
          <ul className='shadow-mobile-dropdown z-dropdown absolute top-full left-0 mt-2.5 flex w-full flex-col gap-2 rounded-[5px] border-b border-neutral-200 bg-white px-2 py-2.5'>
            {ADMIN_NAV_ITEMS.map(({label, href}) => {
              const isActive =
                pathName === href || pathName.startsWith(`${href}/`);

              return (
                <li key={href} onClick={() => setIsOpen(false)}>
                  <Link
                    href={href}
                    className={clsx(
                      'text-h5 block w-full rounded-[5px] p-2 font-semibold transition-colors',
                      isActive
                        ? 'bg-neutral-800 text-neutral-50'
                        : 'text-neutral-800 hover:bg-neutral-100'
                    )}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};
