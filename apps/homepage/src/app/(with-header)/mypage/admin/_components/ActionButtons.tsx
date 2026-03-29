const CANCEL_VARIANTS = {
  light: 'bg-white text-neutral-600',
  dark: 'bg-text-disabled text-white',
} as const;

interface ActionButtonsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  cancelVariant?: keyof typeof CANCEL_VARIANTS;
}

export const ActionButtons = ({
  onCancel,
  onConfirm,
  cancelLabel = '취소',
  confirmLabel = '저장',
  cancelVariant = 'light',
}: ActionButtonsProps) => (
  <div className='flex gap-4 md:gap-2.5'>
    <button
      type='button'
      onClick={onCancel}
      className={`text-body-m w-full rounded-[10px] py-2.5 font-semibold md:w-18.75 md:px-5 md:py-2 ${CANCEL_VARIANTS[cancelVariant]}`}>
      {cancelLabel}
    </button>
    <button
      type='button'
      onClick={onConfirm}
      className='bg-primary text-body-m w-full rounded-[10px] py-2.5 font-semibold text-white md:w-18.75 md:px-5 md:py-2'>
      {confirmLabel}
    </button>
  </div>
);
