'use client';

import {useRef, useState} from 'react';
import MoreHorizontalIcon from '@/assets/more-horizontal/more-horizontal.svg';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface MenuItem<T extends string> {
  key: T;
  label: string;
}

interface MemberActionMenuProps<T extends string> {
  items: readonly MenuItem<T>[];
  onAction: (action: T) => void;
}

export const MemberActionMenu = <T extends string>({
  items,
  onAction,
}: MemberActionMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const handleAction = (action: T) => {
    setIsOpen(false);
    onAction(action);
  };

  return (
    <div className='relative' ref={menuRef}>
      <button
        type='button'
        aria-label='더보기'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        className='cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}>
        <MoreHorizontalIcon />
      </button>

      {isOpen && (
        <ul
          role='menu'
          className='text-body-s absolute top-full -right-21.5 z-10 mt-1 w-25 rounded-sm bg-neutral-700 py-1 text-neutral-300 shadow-lg'>
          {items.map((item) => (
            <li
              key={item.key}
              role='menuitem'
              className='hover:text-primary cursor-pointer px-3 py-1.5 text-center'
              onClick={() => handleAction(item.key)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
