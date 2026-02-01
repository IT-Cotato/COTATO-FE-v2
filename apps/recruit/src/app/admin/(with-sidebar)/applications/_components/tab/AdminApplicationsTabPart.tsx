import clsx from 'clsx';

interface AdminApplicationsTabPartProps {
  partName?: string;
  applyNumber?: number;
  isActive?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}

export const AdminApplicationsTabPart = ({
  partName,
  applyNumber,
  isActive = false,
  onClick,
  onKeyDown,
  tabIndex,
}: AdminApplicationsTabPartProps) => {
  const ariaLabel =
    partName && applyNumber !== undefined
      ? `${partName} (${applyNumber}명)`
      : (partName ?? '파트 탭');

  return (
    <button
      type='button'
      onClick={onClick}
      role='tab'
      aria-selected={isActive}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      className={clsx(
        'flex flex-row items-center gap-2 pb-1',
        'border-b-2 transition-colors',
        isActive ? 'border-primary' : 'border-transparent'
      )}>
      <span className='text-body-m font-bold text-neutral-800'>{partName}</span>

      <span
        aria-hidden='true'
        className='rounded-xl bg-neutral-500 px-2 text-xs font-normal text-white'>
        {applyNumber}
      </span>
    </button>
  );
};
