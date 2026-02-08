'use client';

import {useState} from 'react';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import clsx from 'clsx';

interface OnboardingFormDropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const OnboardingFormDropdown = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
}: OnboardingFormDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={clsx('relative flex flex-col gap-3', className)}>
      <label className='text-h5 text-neutral-100'>{label}</label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:ring-primary flex cursor-pointer items-center justify-between rounded-[9px] bg-neutral-800 px-6.25 py-4.75 text-neutral-100 focus:ring-1 ${
          isOpen ? 'ring-primary ring-1' : ''
        }`}>
        <span
          className={
            value ? 'text-neutral-100' : 'text-body-l text-neutral-400'
          }>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <ul className='absolute top-[calc(100%+2px)] z-10 w-full overflow-hidden rounded-[10px] border border-neutral-700 bg-neutral-600 shadow-xl'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className='cursor-pointer px-6.25 py-4.75 text-neutral-100 transition-colors hover:bg-neutral-500'>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
