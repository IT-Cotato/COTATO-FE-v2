import {AdminDatePicker} from '@/app/admin/(with-sidebar)/application-edit/_components/calendar/AdminDatePicker';
import RightArrowIcon from '@/assets/icons/arrow-right.svg';

interface RecruitmentInfoEditRowProps {
  label: string;
  type: 'single' | 'range';
  start?: string;
  end?: string;
  onChange: (value: {start?: string; end?: string}) => void;
}

export const RecruitmentInfoEditRow = ({
  label,
  start,
  end,
  onChange,
  type,
}: RecruitmentInfoEditRowProps) => {
  return (
    <div className='flex items-center gap-5.5'>
      <div className='min-w-46.25 shrink-0 rounded-[10px] border-2 border-neutral-100 py-1 text-center text-h5'>
        {label}
      </div>

      <AdminDatePicker
        value={start}
        placeholder={type === 'range' ? '시작 일자' : '날짜 선택'}
        onChange={(nextStart) =>
          onChange({
            start: nextStart,
            end,
          })
        }
      />

      {type === 'range' && (
        <>
          <RightArrowIcon className='text-neutral-400' />
          <AdminDatePicker
            value={end}
            placeholder='종료 일자'
            onChange={(nextEnd) =>
              onChange({
                start,
                end: nextEnd,
              })
            }
          />
        </>
      )}
    </div>
  );
};
