import CheckTrueIcon from '@/assets/check/check-true.svg';
import CheckFalseIcon from '@/assets/check/check-false.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({checked, onChange, disabled}: CheckboxProps) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center border transition-colors select-none ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${
        checked
          ? 'border-primary bg-primary' // true일 때
          : 'border-neutral-600 bg-neutral-600' // false일 때
      }`}>
      {checked ? <CheckTrueIcon /> : <CheckFalseIcon />}
    </div>
  );
};
