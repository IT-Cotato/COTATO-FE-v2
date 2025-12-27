import {AdminApplicationFormCalendar} from '@/app/admin/(with-sidebar)/application-form/_components/calendar/AdminApplicationFormCalendar';
import RightArrowIcon from '@/assets/icons/arrow-right.svg';

interface RecruitmentInfoEditRowProps {
  label: string;
  type: 'single' | 'range';
  value: {
    start?: string;
    end?: string;
  };
  onChange: (value: {start?: string; end?: string}) => void;
}

export const RecruitmentInfoEditRow = ({
  label,
  value,
  onChange,
  type,
}: RecruitmentInfoEditRowProps) => {
  return (
    <div className='flex items-center gap-5.5'>
      <div className='w-46.25 rounded-[10px] border-2 border-neutral-100 py-1 text-center text-h5'>
        {label}
      </div>

      <AdminApplicationFormCalendar
        value={value.start}
        placeholder={type === 'range' ? '시작 일자' : '날짜 선택'}
        onChange={(start) =>
          onChange({
            ...value,
            start,
          })
        }
      />

      {type === 'range' && (
        <>
          <RightArrowIcon className='text-neutral-400' />
          <AdminApplicationFormCalendar
            value={value.end}
            placeholder='종료 일자'
            onChange={(end) =>
              onChange({
                ...value,
                end,
              })
            }
          />
        </>
      )}
    </div>
  );
};
