import clsx from 'clsx';

interface StatusChipConfig {
  label: string;
  className: string;
}

interface StatusChipProps<T extends string> {
  value: T;
  config: Record<T, StatusChipConfig>;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const StatusChip = <T extends string>({
  value,
  config,
  isActive,
  disabled,
  onClick,
}: StatusChipProps<T>) => {
  const currentConfig = config[value];
  if (!currentConfig) return null;
  const {className, label} = currentConfig;

  return (
    <button
      type='button'
      aria-haspopup='false'
      aria-expanded='false'
      className={clsx(
        'inline-flex w-fit min-w-[64px] items-center justify-center rounded-[10px] py-0.75 shadow-[0_0_10px_0_rgba(0,0,0,0.15)] transition-opacity duration-300 lg:min-w-18.75 lg:py-1.5',
        isActive ? 'opacity-100' : 'opacity-25',
        disabled ? 'cursor-default' : 'cursor-pointer',
        className
      )}
      disabled={disabled}
      onClick={onClick}>
      <span className='text-body-m lg:text-body-m-sb text-white'>{label}</span>
    </button>
  );
};
