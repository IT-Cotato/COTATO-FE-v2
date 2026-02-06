'use client';

import {useRef, useState} from 'react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';
import clsx from 'clsx';

interface GenerationDropdownProps {
  generation: string;
  generations: string[];
  onSelect: (generation: string) => void;
  disabled?: boolean;
}

export const GenerationDropdown = ({
  generation,
  generations,
  onSelect,
  disabled,
}: GenerationDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    if (disabled) return;
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-row items-center gap-2.5'>
      <div className='relative' ref={dropdownRef}>
        <button
          type='button'
          onClick={handleToggle}
          disabled={disabled}
          className={clsx(
            'shadow-default text-body-l flex items-center gap-2 rounded-[30px] px-5 py-2',
            disabled
              ? 'cursor-not-allowed bg-neutral-100 text-neutral-400'
              : 'bg-white text-neutral-700'
          )}
          aria-expanded={isOpen}
          aria-haspopup='listbox'>
          <span>{generation}기</span>
          <ChevronDown
            className={`text-primary transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        {isOpen && (
          <ul
            role='listbox'
            className='absolute top-full left-0 z-10 mt-2 w-full rounded-sm bg-neutral-700 text-center'>
            {generations.map((gen) => (
              <li
                role='option'
                aria-selected={gen === generation}
                key={gen}
                onClick={() => handleSelect(gen)}
                className='text-body-m hover:text-primary cursor-pointer py-1.5 font-normal text-neutral-400'>
                {gen}기
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
