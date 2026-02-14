import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import ChevronDown from '@repo/ui/assets/chevrons/chevron-down.svg';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface StatusDropdownConfig {
  label: string;
  bg: string;
}

interface StatusDropdownProps<T extends string> {
  value: T;
  options: T[];
  config: Record<T, StatusDropdownConfig>;
  onChange: (value: T) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export const StatusDropdown = <T extends string>({
  value,
  options,
  config,
  onChange,
  disabled,
  ariaLabel = '상태 선택',
}: StatusDropdownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const {bg, label} = config[selectedValue];

  const handleSelect = (next: T) => {
    if (disabled) return;
    if (next === selectedValue) {
      setIsOpen(false);
      return;
    }

    setSelectedValue(next);
    setIsOpen(false);
    onChange?.(next);
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
          aria-label={ariaLabel}
          className='text-body-m absolute top-full z-10 mt-1 w-full rounded-sm bg-neutral-700 text-neutral-300 shadow-lg'>
          {options.map((option) => {
            const isSelected = option === selectedValue;

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
                {config[option].label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
