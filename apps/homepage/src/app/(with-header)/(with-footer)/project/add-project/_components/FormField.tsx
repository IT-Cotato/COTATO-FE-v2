interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  variant?: 'row' | 'column';
  id?: string;
}

export const FormField = ({
  label,
  children,
  variant = 'row',
  id,
}: FormFieldProps) => {
  const containerStyle =
    variant === 'row'
      ? 'flex h-12.5 w-full items-center gap-2.5'
      : 'flex flex-col items-start gap-2 self-stretch';

  const labelStyle =
    variant === 'row'
      ? 'text-h4 w-24 text-neutral-600'
      : 'text-h4 text-neutral-600 cursor-pointer';

  const childrenStyle = variant === 'row' ? 'w-128.5' : 'w-full';

  return (
    <div className={containerStyle}>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <div className={childrenStyle}>{children}</div>
    </div>
  );
};
