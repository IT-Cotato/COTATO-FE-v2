import clsx from 'clsx';

interface AdminApplicationPartProps {
  partName: string;
  applyNumber: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const AdminApplicationPart = ({
  partName,
  applyNumber,
  isActive = false,
  onClick,
}: AdminApplicationPartProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={clsx(
        'flex flex-row items-center gap-2 pb-1',
        'border-b-2 transition-colors',
        isActive ? 'border-primary' : 'border-transparent'
      )}>
      <p className='text-body-m text-neutral-800'>{partName}</p>

      <div
        className={clsx(
          'rounded-xl bg-[#697077] px-2 text-xs font-normal text-white'
        )}>
        {applyNumber}
      </div>
    </button>
  );
};
