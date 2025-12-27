import clsx from 'clsx';

interface AdminApplicationFormPartProps {
  partName: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const AdminApplicationFormPart = ({
  partName,
  isActive,
  onClick,
}: AdminApplicationFormPartProps) => {
  return (
    <button type='button' onClick={onClick}>
      <p
        className={clsx(
          'text-h5 text-neutral-500',
          isActive ? 'text-neutral-800' : ''
        )}>
        {partName}
      </p>
    </button>
  );
};
