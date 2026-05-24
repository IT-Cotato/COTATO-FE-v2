import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import ChevronDown from '../../assets/chevrons/chevron-down.svg';
import {useClickOutside} from '../../hooks/useClickOutside';

export interface StatusDropdownConfig {
  label: string;
  className: string;
  textColor?: string;
  chevronColor?: string;
}

export interface StatusDropdownProps<T extends string> {
  value: T;
  options: T[];
  config: Record<T, StatusDropdownConfig>;
  onChange: (value: T) => void;
  disabled?: boolean;
  ariaLabel?: string;
  wrapperClassName?: string;
}

export const StatusDropdown = <T extends string>({
  value,
  options,
  config,
  onChange,
  disabled,
  ariaLabel = '상태 선택',
  wrapperClassName = 'w-18.75',
}: StatusDropdownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const currentConfig = config[selectedValue];
  if (!currentConfig) return null;
  const {className, label, textColor, chevronColor} = currentConfig;

  return (
    <div className={clsx('relative', wrapperClassName)} ref={wrapperRef}>
      <button
        type='button'
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        className={clsx(
          'text-body-m-sb inline-flex w-full items-center justify-center gap-1 rounded-[10px] px-1.5 py-1.5 whitespace-nowrap',
          className
        )}
        style={textColor ? {color: textColor} : undefined}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span>{label}</span>
        <ChevronDown
          className={clsx(
            chevronColor ?? 'text-white',
            'transition-transform duration-200',
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
                  'cursor-pointer py-1.5 text-center lg:px-3',
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
