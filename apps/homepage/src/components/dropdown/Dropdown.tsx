'use client';

import {useRef, useState} from 'react';
import clsx from 'clsx';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface DropdownProps<T extends string> {
  value: T; // 현재 선택된 값
  options: T[]; // 드롭다운 리스트에 표시될 옵션들
  onSelect: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  width?: number;
}

export const Dropdown = <T extends string>({
  value,
  options,
  onSelect,
  placeholder = '선택해주세요',
  disabled,
  className,
  width,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (selectedValue: T) => {
    if (disabled) return;
    onSelect(selectedValue);
    setIsOpen(false);
  };

  const dropdownWidth = width ? `${width}px` : undefined;

  return (
    <div
      className={clsx('relative inline-block', className)}
      ref={dropdownRef}
      style={{width: dropdownWidth}}>
      <button
        type='button'
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          'flex h-10 items-center justify-center gap-2.5 self-stretch px-2.5 py-2.5',
          'rounded-[20px] border border-neutral-200 bg-white',
          'text-body-l w-full shrink-0 transition-all',
          disabled
            ? 'cursor-not-allowed bg-neutral-100 text-neutral-400'
            : 'bg-white text-neutral-600',
          !width && 'min-w-27.5'
        )}
        style={{width: dropdownWidth}}
        aria-expanded={isOpen}
        aria-haspopup='listbox'>
        <span>{value || placeholder}</span>
        <ChevronDown
          className={clsx(
            'text-primary transition-transform duration-200',
            'h-5 w-5',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
      {isOpen && (
        <ul
          role='listbox'
          className={clsx(
            'z-dropdown absolute left-0 mt-1 flex w-full flex-col gap-2.5 rounded-sm bg-neutral-700 px-3.25 py-1.5',
            !width && 'min-w-27.5'
          )}
          style={{width: dropdownWidth}}>
          {options.map((option) => (
            <li
              role='option'
              aria-selected={option === value}
              key={option}
              onClick={() => handleSelect(option)}
              className={clsx(
                'text-body-l hover:text-primary cursor-pointer text-center transition-colors',
                option === value ? 'text-primary' : 'text-neutral-400'
              )}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
