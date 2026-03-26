import {AdminDatePickerButtonContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminDatePickerButtonContainer';
import RightArrowIcon from '@/assets/icons/arrow-right.svg';
import clsx from 'clsx';

interface RecruitmentInfoEditRowProps {
  label: string;
  type: 'single' | 'range';
  start?: string | null;
  end?: string | null;
  onChange: (value: {start?: string | null; end?: string | null}) => void;
}
export const RecruitmentInfoEditRow = ({
  label,
  start,
  end,
  onChange,
  type,
}: RecruitmentInfoEditRowProps) => {
  const isRange = type === 'range';

  return (
    <div className='flex items-center gap-1.75 lg:gap-7.5'>
      <div className='text-body-l-b lg:text-h5 w-25.5 shrink-0 rounded-[10px] border-2 border-neutral-100 py-2 text-center lg:w-42.5'>
        {label}
      </div>

      <div className='flex flex-1 items-center gap-3'>
        <AdminDatePickerButtonContainer
          value={start}
          onChange={(nextStart) =>
            onChange({
              start: nextStart,
              end,
            })
          }
        />

        <RightArrowIcon
          className={clsx(
            'hidden text-neutral-400 transition-opacity lg:block',
            !isRange && 'opacity-0'
          )}
        />

        <div
          className={clsx(
            !isRange && 'pointer-events-none opacity-0',
            'flex flex-1'
          )}>
          <AdminDatePickerButtonContainer
            value={end}
            onChange={(nextEnd) =>
              onChange({
                start,
                end: nextEnd,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
