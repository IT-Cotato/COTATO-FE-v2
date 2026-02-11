import PasswordIcon from '@/assets/onboarding/password-icon.svg';
import PasswordOpenIcon from '@/assets/onboarding/password-open-icon.svg';
import clsx from 'clsx';

interface OnboardingFormPasswordProps {
  label: string;
  showPassword: boolean;
  value: string;
  onChange: (value: string) => void;
  onTogglePasswordVisibility: () => void;
  error?: string;
}

export const OnboardingFormPassword = ({
  label,
  showPassword,
  value,
  onChange,
  onTogglePasswordVisibility,
  error,
}: OnboardingFormPasswordProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <label className='text-h5 text-neutral-100'>{label}</label>
      <div className='relative w-full'>
        <input
          placeholder='Password'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          className={clsx(
            'w-full rounded-[9px] bg-neutral-800 px-6.25 py-4.75 pr-15 text-neutral-100 transition-shadow outline-none focus:ring-1',
            'placeholder:text-body-l placeholder:text-neutral-400',
            error ? 'focus:ring-alert' : 'focus:ring-primary'
          )}
        />
        <button
          type='button'
          onClick={onTogglePasswordVisibility}
          className='absolute top-1/2 right-5 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-100'>
          {showPassword ? <PasswordOpenIcon /> : <PasswordIcon />}
        </button>
      </div>
      {error && <span className='text-body-l text-alert'>{error}</span>}
    </div>
  );
};
