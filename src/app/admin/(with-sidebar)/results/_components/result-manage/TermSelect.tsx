'use client';

import {useState} from 'react';
import DropdownChevronDown from '@/assets/chevrons/dropdown-chevron-down.svg';
import DropdownChevronUp from '@/assets/chevrons/dropdown-chevron-up.svg';

interface TermSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const TermSelect = ({value, onChange, options}: TermSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className='flex items-center gap-2.5 text-body-m font-semibold text-neutral-800'>
      <div className='relative inline-block'>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='flex w-[69px] cursor-pointer items-center gap-[5px] rounded-[4px] bg-primary px-3.75 py-1.5 text-black'>
          <span>{value}</span>
          {isOpen ? <DropdownChevronUp /> : <DropdownChevronDown />}
        </div>
        {isOpen && (
          <div className='absolute right-0 left-0 z-dropdown mt-[3px] flex flex-col items-center gap-[10px] rounded-[4px] bg-neutral-700 p-[6px_2px]'>
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`flex w-full cursor-pointer items-center justify-center rounded-[4px] px-2 py-[6px] transition-colors ${
                  value === option ? 'text-primary' : 'text-neutral-400'
                }`}>
                {option}기
              </div>
            ))}
          </div>
        )}
      </div>
      기
      {isOpen && (
        <div
          className='fixed inset-0 z-modal opacity-0'
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* 바깥 클릭 시 닫히게 하는 투명 오버레이*/}
    </div>
  );
};
