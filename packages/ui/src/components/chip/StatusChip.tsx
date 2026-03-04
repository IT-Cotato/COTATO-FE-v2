import clsx from 'clsx';

interface StatusChipConfig {
  label: string;
  className: string;
}

interface StatusChipProps<T extends string> {
  value: T;
  config: Record<T, StatusChipConfig>;
  isActive?: boolean;
  onClick?: () => void;
}

export const StatusChip = <T extends string>({
  value,
  config,
  isActive,
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
        'inline-flex w-fit min-w-18.75 items-center justify-center rounded-[10px] py-1.5 shadow-[0_0_10px_0_rgba(0,0,0,0.15)] transition-opacity duration-300',
        isActive ? 'opacity-100' : 'opacity-25',
        className
      )}
      onClick={onClick}>
      <span className='text-body-m-sb text-white'>{label}</span>
    </button>
  );
};
