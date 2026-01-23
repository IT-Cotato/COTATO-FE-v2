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
    <div className='flex w-24.5 flex-col gap-2'>
      <label>기수 정보</label>
      <div className='flex items-center gap-2'>
        <input
          value={value}
          readOnly
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className='w-19 rounded-[10px] bg-neutral-50 pt-1.5 pb-2.5 text-center text-body-m'
          aria-label='기수 입력'
        />
        <span>기</span>
      </div>
    </div>
  );
};
