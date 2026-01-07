'use client';

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from './form.styles';
import {useClickOutside} from '@/hooks/useClickOutside';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';

interface FormDropdownProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  options: {value: string; label: string}[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export const FormDropdown = forwardRef<HTMLInputElement, FormDropdownProps>(
  function FormDropdown(
    {
      label,
      options,
      value,
      onChange,
      error,
      placeholder,
      id,
      className,
      readOnly,
      ...props
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();
    const inputId = id ?? generatedId;

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleToggle = () => {
      if (readOnly) return;
      setIsOpen((prev) => !prev);
    };

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div className={formFieldStyles.wrapper}>
        <label htmlFor={inputId} className={formFieldStyles.label}>
          {label}
        </label>

        <div ref={dropdownRef} className='relative'>
          <button
            type='button'
            onClick={handleToggle}
            readOnly={readOnly}
            className={clsx(
              formFieldStyles.field,
              'flex w-full items-center justify-between',
              'read-only:cursor-default read-only:focus:ring-0',
              error && formFieldStyles.error,
              className
            )}>
            <span
              className={
                !selectedOption ? 'text-neutral-300' : 'text-neutral-800'
              }>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown
              className={clsx(
                'transition-transform duration-200',
                isOpen ? 'rotate-180' : 'rotate-0'
              )}
            />
          </button>

          {isOpen && !readOnly && (
            <ul className='absolute z-10 w-full rounded-[10px] bg-neutral-100'>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className='cursor-pointer px-4 py-3 text-body-l text-neutral-800'>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          ref={ref}
          type='hidden'
          id={inputId}
          value={value || ''}
          {...props}
        />

        {error && <span className={formFieldStyles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
