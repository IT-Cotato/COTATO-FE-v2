interface RecruitmentInfoViewRowProps {
  label: string;
  value: string;
}

export const RecruitmentInfoViewRow = ({
  label,
  value,
}: RecruitmentInfoViewRowProps) => {
  // '~' 기준 문자열 분리 (모바일용)
  const formattedValue = value ? value.split('~') : ['-'];

  return (
    <div className='flex items-center gap-6 lg:gap-7.5'>
      <div className='text-body-l-b lg:text-h5 w-25.5 rounded-[10px] border-2 border-neutral-100 py-2 text-center text-neutral-800 lg:w-42.5'>
        {label}
      </div>
      <div className='text-body-l lg:text-h5 flex-1 text-neutral-600'>
        {formattedValue.map((text, index) => (
          <div key={index} className='block lg:hidden'>
            {text.trim()}
            {index < formattedValue.length - 1 && ' ~'}
          </div>
        ))}
        <p className='hidden lg:block'>{value}</p>
      </div>
    </div>
  );
};
