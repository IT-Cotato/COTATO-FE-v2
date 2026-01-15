import clsx from 'clsx';
import CheckIcon from '@/assets/check/check.svg';

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
      <div
        className={clsx(
          'h-[7.778px] w-[9.899px]',
          checked ? 'text-white' : 'text-text-muted'
        )}>
        <CheckIcon width='100%' height='100%' />
      </div>
    </div>
  );
};
