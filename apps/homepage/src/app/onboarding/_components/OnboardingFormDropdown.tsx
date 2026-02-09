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
  error?: string;
}

export const OnboardingFormDropdown = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  error,
}: OnboardingFormDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <label className='text-h5 text-neutral-100'>{label}</label>

      <div className='relative'>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'focus:ring-primary flex cursor-pointer items-center justify-between rounded-[9px] bg-neutral-800 px-6.25 py-4.75 text-neutral-100 transition-all focus:ring-1',
            isOpen || error ? 'ring-1' : 'ring-0',
            isOpen ? 'ring-primary' : error ? 'ring-alert' : ''
          )}>
          <span
            className={clsx(
              value ? 'text-neutral-100' : 'text-body-l text-neutral-400'
            )}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={clsx(
              'h-6 w-6 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>

        {isOpen && (
          <ul className='absolute top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-[10px] border border-neutral-700 bg-neutral-600 shadow-2xl'>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className='cursor-pointer px-6.25 py-3.5 text-neutral-100 transition-colors hover:bg-neutral-500'>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <span className='text-body-l text-alert px-1'>{error}</span>}
    </div>
  );
};
