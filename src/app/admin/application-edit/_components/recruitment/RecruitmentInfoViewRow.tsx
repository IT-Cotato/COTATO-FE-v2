interface RecruitmentInfoViewRowProps {
  label: string;
  value: string;
}

export const RecruitmentInfoViewRow = ({
  label,
  value,
}: RecruitmentInfoViewRowProps) => {
  return (
    <div className='flex items-center gap-7.5'>
      <div className='w-42.5 rounded-[10px] border-2 border-neutral-100 py-2 text-center text-h5 text-neutral-800'>
        {label}
      </div>
      <p className='text-h5 text-neutral-600'>{value || '-'}</p>
    </div>
  );
};
