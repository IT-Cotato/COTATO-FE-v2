interface GenerationFieldProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const GenerationField = ({
  value,
  onChange,
  disabled,
}: GenerationFieldProps) => {
  return (
    <div className='flex w-23.75 flex-col gap-2'>
      <label className='text-body-l text-neutral-600'>기수 정보</label>
      <div className='flex items-center gap-2'>
        <input
          value={value}
          readOnly
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className='w-19 rounded-[10px] bg-neutral-50 py-1.75 text-center text-body-l text-neutral-800'
          aria-label='기수 입력'
        />
        <span className='text-body-m font-semibold text-neutral-800'>기</span>
      </div>
    </div>
  );
};
