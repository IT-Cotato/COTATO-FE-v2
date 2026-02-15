export const fieldClass =
  'w-full rounded-[10px] bg-neutral-50 px-4 py-2.5 text-body-l text-neutral-600 outline-none';

export const TextField = ({
  label,
  value,
  readonly,
  onChange,
  className,
}: {
  label: string;
  value: string;
  readonly: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2.5 ${className ?? ''}`}>
    <label className='text-h5 text-neutral-600'>{label}</label>
    <input
      value={value}
      readOnly={readonly}
      className={fieldClass}
      onChange={onChange}
    />
  </div>
);
