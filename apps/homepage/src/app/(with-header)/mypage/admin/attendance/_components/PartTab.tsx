import clsx from 'clsx';

interface PartTabProps {
  partName: string;
  isActive?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export const PartTab = ({
  partName,
  isActive = false,
  onClick,
  onKeyDown,
  tabIndex,
}: PartTabProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      role='tab'
      aria-selected={isActive}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-label={partName}
      className={clsx(
        'flex flex-row items-center gap-2 border-b-3 py-2.75 transition-colors duration-300',
        isActive
          ? 'border-primary text-neutral-800'
          : 'border-transparent text-neutral-500'
      )}>
      <span className='text-h5'>{partName}</span>
    </button>
  );
};
