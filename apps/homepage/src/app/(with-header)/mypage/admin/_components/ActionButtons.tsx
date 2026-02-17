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
  <div className='flex gap-2.5'>
    <button
      type='button'
      onClick={onCancel}
      className={`text-body-m w-18.75 rounded-[10px] px-5 py-2 font-semibold ${CANCEL_VARIANTS[cancelVariant]}`}>
      {cancelLabel}
    </button>
    <button
      type='button'
      onClick={onConfirm}
      className='bg-primary text-body-m w-18.75 rounded-[10px] px-5 py-2 font-semibold text-white'>
      {confirmLabel}
    </button>
  </div>
);
