import clsx from 'clsx';

interface OnboardingFormCodeProps {
  label: string;
  onChange: (value: string) => void;
  buttonLabel: string;
  value: string;
  placeholder: string;
  type: string;
  error?: string;
  onButtonClick: () => void;
  buttonColor?: string;
  disabled?: boolean;
}

export const OnboardingFormCode = ({
  label,
  onChange,
  buttonLabel,
  value,
  placeholder,
  type,
  error,
  buttonColor,
  disabled,
  onButtonClick,
}: OnboardingFormCodeProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <label className='text-h5 text-neutral-100'>{label}</label>
      <div className='focus:ring-primary relative rounded-[9px] bg-neutral-800 px-6.25 py-4.75 text-neutral-100 focus:ring-1'>
        <input
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='placeholder:text-neutral-100'></input>
        <button
          onClick={onButtonClick}
          className={clsx(
            'text-body-m absolute right-6.25 h-7.75 w-23.25 rounded-[10px] transition-colors',
            buttonColor,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}>
          {buttonLabel}
        </button>
      </div>
      {error && <span className='text-body-l text-alert'>{error}</span>}
    </div>
  );
};
