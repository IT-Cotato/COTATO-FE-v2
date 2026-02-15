'use client';

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
  placeholder?: string;
  helperText?: string;
  variant?: 'onboarding' | 'mypage';
}

export const OnboardingFormPassword = ({
  label,
  showPassword,
  value,
  onChange,
  onTogglePasswordVisibility,
  error,
  placeholder,
  helperText,
  variant = 'onboarding',
}: OnboardingFormPasswordProps) => {
  const isMypage = variant === 'mypage';

  return (
    <div className={clsx('flex flex-col', isMypage ? 'gap-1.75' : 'gap-3')}>
      <label
        className={clsx(
          'text-h5 flex items-center gap-1',
          isMypage ? 'text-neutral-700' : 'text-neutral-100'
        )}>
        {label} <span className='text-alert'>*</span>
      </label>
      <div className='relative w-full'>
        <input
          placeholder={placeholder || 'Password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          className={clsx(
            'w-full rounded-[9px] px-6.25 py-4.75 pr-15 transition-shadow outline-none focus:ring-1',
            'placeholder:text-body-l placeholder:text-neutral-400',
            isMypage
              ? 'bg-neutral-50 text-neutral-800'
              : 'bg-neutral-800 text-neutral-100',
            error ? 'focus:ring-alert' : 'focus:ring-primary'
          )}
        />
        <button
          type='button'
          onClick={onTogglePasswordVisibility}
          className={clsx(
            'absolute top-1/2 right-5 -translate-y-1/2 transition-colors',
            isMypage
              ? 'text-neutral-600'
              : 'text-neutral-400 hover:text-neutral-600'
          )}>
          {showPassword ? <PasswordOpenIcon /> : <PasswordIcon />}
        </button>
      </div>
      {error ? (
        <span className='text-body-l text-alert'>{error}</span>
      ) : (
        helperText && (
          <span className='text-body-l text-neutral-600'>{helperText}</span>
        )
      )}
    </div>
  );
};
