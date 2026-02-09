import clsx from 'clsx';
import CheckIcon from '@repo/ui/assets/checkbox/check.svg';

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
          'cursor-default opacity-50': disabled,
          'border-primary bg-primary': checked,
          'border-white bg-white': !checked,
        }
      )}>
      <CheckIcon className='h-[7.778px] w-[9.899px] text-white' />
    </div>
  );
};
