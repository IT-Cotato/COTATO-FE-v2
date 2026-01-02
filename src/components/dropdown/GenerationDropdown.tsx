'use client';

import {useRef, useState} from 'react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {useClickOutside} from '@/hooks/useClickOutside';

interface GenerationDropdownProps {
  generation: string;
  generations: string[];
  onSelect: (generation: string) => void;
}

export const GenerationDropdown = ({
  generation,
  generations,
  onSelect,
}: GenerationDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div
      className='relative flex flex-row items-center gap-2.5'
      ref={dropdownRef}>
      <button
        type='button'
        onClick={handleToggle}
        className='shadow-default flex items-center gap-1.5 rounded-[30px] bg-white px-3.75 py-2 text-body-m text-neutral-800'>
        <span>{generation}기</span>

        <ChevronDown
          className={`text-primary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {isOpen && (
        <ul className='absolute top-full left-0 z-10 mt-2 rounded-sm bg-neutral-700 text-center'>
          {generations.map((gen) => (
            <li
              key={gen}
              onClick={() => handleSelect(gen)}
              className='cursor-pointer px-6 py-1.5 text-body-m font-normal text-neutral-400 hover:text-primary'>
              {gen}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
