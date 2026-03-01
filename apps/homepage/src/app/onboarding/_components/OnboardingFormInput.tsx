import clsx from 'clsx';

interface OnboardingFormInputProps {
  label: string;
  value: string;
  placeholder: string;
  type: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

export const OnboardingFormInput = ({
  label,
  value,
  placeholder,
  type,
  onChange,
  className,
  error,
}: OnboardingFormInputProps) => {
  return (
    <div className={clsx('flex flex-col gap-1.25 sm:gap-3', className)}>
      <label className='sm:text-h5 text-body-l text-neutral-100'>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'w-full rounded-[9px] bg-neutral-800 px-4 py-3 text-neutral-100 transition-shadow outline-none sm:px-6.25 sm:py-4.75',
          'placeholder:text-h5 sm:placeholder:text-body-l placeholder:text-neutral-500',
          'focus:ring-1',
          error ? 'focus:ring-alert' : 'focus:ring-primary'
        )}
      />
      {error && <span className='text-body-l text-alert'>{error}</span>}
    </div>
  );
};
