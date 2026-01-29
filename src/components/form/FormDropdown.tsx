'use client';

import {forwardRef, useRef, useState, type InputHTMLAttributes} from 'react';
import clsx from 'clsx';
import {formFieldStyles} from './form.styles';
import {useClickOutside} from '@/hooks/useClickOutside';
import ChevronDown from '@/assets/chevrons/chevron-down.svg';

interface FormDropdownProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
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

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleToggle = () => {
      if (readOnly) return;
      setIsOpen((prev) => !prev);
    };

    const handleSelect = (
      e: React.MouseEvent<HTMLLIElement>,
      optionValue: string
    ) => {
      e.preventDefault();
      e.stopPropagation();
      onChange?.(optionValue);
      setIsOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <label className={formFieldStyles.wrapper}>
        <span className={formFieldStyles.label}>{label}</span>

        <div ref={dropdownRef} className='relative'>
          <button
            type='button'
            onClick={handleToggle}
            disabled={readOnly}
            className={clsx(
              formFieldStyles.field,
              'flex w-full items-center justify-between',
              'disabled:cursor-default disabled:focus:ring-0',
              error ? formFieldStyles.error : 'border-neutral-200',
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
            <ul className='absolute z-dropdown mt-2 w-full rounded-[10px] border border-neutral-200 bg-neutral-100 shadow-lg'>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={(e) => handleSelect(e, option.value)}
                  className='cursor-pointer px-4 py-3 text-body-l text-neutral-800 transition-colors hover:rounded-lg hover:bg-neutral-200'>
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input ref={ref} type='hidden' id={id} value={value || ''} {...props} />

        {error && <span className={formFieldStyles.errorMessage}>{error}</span>}
      </label>
    );
  }
);
