interface OnboardingFormCodeProps {
  label: string;
  onChange: (value: string) => void;
  buttonLabel: string;
  value: string;
  placeholder: string;
  type: string;
}

export const OnboardingFormCode = ({
  label,
  onChange,
  buttonLabel,
  value,
  placeholder,
  type,
}: OnboardingFormCodeProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <label className='text-h5 text-neutral-100'>{label}</label>
      <div className='focus:ring-primary relative rounded-[9px] bg-neutral-800 px-6.25 py-4.75 text-neutral-100 focus:ring-1'>
        <input
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className='placeholder:text-neutral-100'></input>
        <button className='bg-primary text-body-m absolute top-3.5 right-6.25 h-7.75 w-23.25 rounded-[10px]'>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};
