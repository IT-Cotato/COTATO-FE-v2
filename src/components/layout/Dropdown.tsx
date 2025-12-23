'use client';

import {useState, useRef, useEffect} from 'react';
import clsx from 'clsx';

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Dropdown({trigger, children, className}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block' ref={ref}>
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      {open && (
        <div
          className={clsx(
            'absolute top-full left-0 z-50 mt-[-20px]',
            className
          )}>
          {children}
        </div>
      )}
    </div>
  );
}
