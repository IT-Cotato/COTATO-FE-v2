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

      <div className='flex min-w-0 flex-row items-stretch gap-2'>
        <div
          className={clsx(
            'flex flex-1 flex-row items-center justify-between rounded-[9px] bg-neutral-800 px-4 py-3 transition-shadow lg:px-6.25 lg:py-4.75',
            'focus-within:ring-1',
            error ? 'focus-within:ring-alert' : 'focus-within:ring-primary'
          )}>
          <input
            value={value}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={clsx(
              'min-w-0 flex-1 bg-transparent text-white outline-none',
              'placeholder:text-h5 lg:placeholder:text-body-l placeholder:text-neutral-500',
              'placeholder:truncate',
              'w-full'
            )}
          />
        </div>

        <button
          onClick={onButtonClick}
          disabled={disabled}
          className={clsx(
            'text-body-l flex min-w-21.5 shrink-0 items-center justify-center rounded-[10px] text-white transition-colors',
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
