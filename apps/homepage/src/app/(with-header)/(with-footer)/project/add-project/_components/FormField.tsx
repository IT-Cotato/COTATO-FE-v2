interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField = ({label, children}: FormFieldProps) => (
  <div className='flex h-12.5 w-full items-center gap-2.5'>
    <span className='text-h4 w-24 text-neutral-600'>{label}</span>
    <div className='w-128.5'>{children}</div>
  </div>
);
