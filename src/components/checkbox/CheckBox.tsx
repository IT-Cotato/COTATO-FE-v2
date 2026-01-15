import CheckTrueIcon from '@/assets/check/check-true.svg';
import CheckFalseIcon from '@/assets/check/check-false.svg';
import clsx from 'clsx';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({checked, onChange, disabled}: CheckboxProps) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={clsx(
        'flex h-4 w-4 shrink-0 items-center justify-center border transition-colors select-none',
        {
          'cursor-pointer': !disabled,
          'cursor-not-allowed opacity-50': disabled,
          'border-primary bg-primary': checked,
          'border-neutral-600 bg-neutral-600': !checked,
        }
      )}>
      {checked ? <CheckTrueIcon /> : <CheckFalseIcon />}
    </div>
  );
};
