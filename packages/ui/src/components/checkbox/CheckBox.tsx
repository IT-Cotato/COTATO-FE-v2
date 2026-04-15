import clsx from 'clsx';
import CheckIcon from '../../assets/checkbox/check.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  isRecruitment?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  disabled,
  className,
  isRecruitment = false,
}: CheckboxProps) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onChange(!checked);
      }}
      className={clsx(
        'flex h-4 w-4 shrink-0 items-center justify-center transition-colors select-none',
        !className && 'border',
        {
          'cursor-pointer': !disabled,
          'cursor-default opacity-50': disabled,
          'border-primary bg-primary': checked,
          'border-neutral-50 bg-neutral-50 lg:border-white lg:bg-white':
            !checked && !className && isRecruitment,
          'border-white bg-white': !checked && !className && !isRecruitment,
        },
        className
      )}>
      {checked && <CheckIcon className='h-[7.778px] w-[9.899px] text-white' />}
    </div>
  );
};
