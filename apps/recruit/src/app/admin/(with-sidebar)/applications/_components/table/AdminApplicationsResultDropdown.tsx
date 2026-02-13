import ChevronDown from '@/assets/chevrons/chevron-down.svg';
import {useRef, useState} from 'react';
import clsx from 'clsx';

import {useClickOutside} from '@repo/ui/hooks/useClickOutside';
import {
  APPLICATION_RESULT_CONFIG,
  APPLICATION_RESULT_OPTIONS,
  ApplicationResultStatus,
} from '@/constants/admin/admin-applications';

interface AdminApplicationsResultDropdownProps {
  result?: ApplicationResultStatus;
  onChange?: (value: ApplicationResultStatus) => void;
  disabled?: boolean;
}

export const AdminApplicationsResultDropdown = ({
  result = 'PENDING',
  onChange,
  disabled,
}: AdminApplicationsResultDropdownProps) => {
  const [selectedResult, setSelectedResult] =
    useState<ApplicationResultStatus>(result);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const {bg, label} = APPLICATION_RESULT_CONFIG[selectedResult];

  const handleSelect = (value: ApplicationResultStatus) => {
    if (disabled) return;
    if (value === selectedResult) {
      setIsOpen(false);
      return;
    }

    setSelectedResult(value);
    setIsOpen(false);
    onChange?.(value);
  };
  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div className='relative w-18.75' ref={wrapperRef}>
      <button
        type='button'
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        className={clsx(
          'text-body-m inline-flex w-full items-center justify-center gap-1 rounded-[10px] py-1.5 text-white',
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
        <ul
          role='listbox'
          aria-label='지원 결과 선택'
          className='text-body-m absolute top-full z-10 mt-1 w-full rounded-sm bg-neutral-700 text-neutral-300 shadow-lg'>
          {APPLICATION_RESULT_OPTIONS.map((option) => {
            const isSelected = option === selectedResult;

            return (
              <li
                key={option}
                role='option'
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={clsx(
                  'cursor-pointer px-3 py-1.5 text-center',
                  isSelected ? 'text-primary' : 'hover:text-primary',
                  disabled && 'pointer-events-none opacity-60'
                )}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}>
                {APPLICATION_RESULT_CONFIG[option].label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
