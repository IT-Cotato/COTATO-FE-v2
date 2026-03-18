'use client';

import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import MoreHorizontalIcon from '@/assets/more-horizontal/more-horizontal.svg';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface MenuItem<T extends string> {
  key: T;
  label: string;
}

interface ActionMenuProps<T extends string> {
  items: readonly MenuItem<T>[];
  onAction: (action: T) => void;
  iconClassName?: string;
  align?: 'left' | 'right';
}

export const ActionMenu = <T extends string>({
  items,
  onAction,
  iconClassName,
  align = 'left',
}: ActionMenuProps<T>) => {
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
        className='cursor-pointer p-2'
        onClick={() => setIsOpen((prev) => !prev)}>
        <MoreHorizontalIcon className={iconClassName} />
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'text-body-m absolute top-full z-10 w-20 rounded-sm bg-neutral-700 text-neutral-300 shadow-lg lg:mt-1 lg:w-25 lg:py-1',
            align === 'right' ? 'right-0' : 'right-0 lg:-right-21.5'
          )}>
          {items.map((item, index) => (
            <React.Fragment key={item.key}>
              {index > 0 && (
                <li aria-hidden='true' className='h-px bg-neutral-600' />
              )}
              <li>
                <button
                  type='button'
                  className='hover:text-primary focus-visible:text-primary w-full cursor-pointer px-3 py-1.5 text-center'
                  onClick={() => handleAction(item.key)}>
                  {item.label}
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};
