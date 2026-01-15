import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {useRef, useState} from 'react';
import clsx from 'clsx';

import {useClickOutside} from '@/hooks/useClickOutside';
import {
  APPLICATION_RESULT_CONFIG,
  APPLICATION_RESULT_OPTIONS,
  ApplicationResultStatus,
} from '@/constants/admin/admin-applications';

interface AdminApplicationResultDropdownProps {
  result?: ApplicationResultStatus;
  onChange?: (value: ApplicationResultStatus) => void;
}

export const AdminApplicationResultDropdown = ({
  result = 'PENDING',
  onChange,
}: AdminApplicationResultDropdownProps) => {
  const [selectedResult, setSelectedResult] =
    useState<ApplicationResultStatus>(result);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const {bg, label} = APPLICATION_RESULT_CONFIG[selectedResult];

  const handleSelect = (value: ApplicationResultStatus) => {
    setSelectedResult(value);
    setIsOpen(false);
    onChange?.(value);
  };

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div className='relative w-18.75' ref={wrapperRef}>
      <button
        type='button'
        className={clsx(
          'inline-flex w-full items-center justify-center gap-1 rounded-[10px] py-1.5 text-body-s text-white',
          bg
        )}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span>{label}</span>
        <ChevronDown
          className={clsx(
            'text-white transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul className='absolute top-full z-10 mt-1 w-full rounded-sm bg-neutral-700 text-body-s text-neutral-300 shadow-lg'>
          {APPLICATION_RESULT_OPTIONS.map((option) => {
            const isSelected = option === selectedResult;

            return (
              <li
                key={option}
                className={clsx(
                  'cursor-pointer px-3 py-1.5 text-center',
                  isSelected ? 'text-primary' : 'hover:text-primary'
                )}
                onClick={() => handleSelect(option)}>
                {APPLICATION_RESULT_CONFIG[option].label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
