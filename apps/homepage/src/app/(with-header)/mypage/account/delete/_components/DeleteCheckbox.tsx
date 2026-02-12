'use client';

import clsx from 'clsx';
import CheckIcon from '@/assets/check/check.svg';

interface DeleteCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const DeleteCheckbox = ({
  checked,
  onChange,
  disabled,
}: DeleteCheckboxProps) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={clsx(
        'flex aspect-square h-6 w-6 shrink-0 flex-col items-center justify-center rounded-[2px] transition-colors select-none',
        {
          'cursor-pointer': !disabled,
          'cursor-default opacity-50': disabled,
          'bg-neutral-400 text-neutral-300': !checked,
          'border-primary bg-primary border text-white': checked,
        }
      )}>
      <CheckIcon />
    </div>
  );
};
