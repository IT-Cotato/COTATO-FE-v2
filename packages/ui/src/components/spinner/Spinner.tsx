import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner = ({size = 'md', className}: SpinnerProps) => {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-neutral-300 border-t-neutral-600',
        SIZE_MAP[size],
        className
      )}
    />
  );
};

const SIZE_MAP = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3',
};
