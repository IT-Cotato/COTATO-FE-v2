import {TimeButton} from '@/app/admin/application-edit/_components/calendar/TimeButton';
import {TimeList} from '@/app/admin/application-edit/_components/calendar/TimeList';

interface TimePanelProps {
  hour: number;
  minute: number;
  period: '오전' | '오후';
  onHourChange: (v: number) => void;
  onMinuteChange: (v: number) => void;
  onPeriodChange: (v: '오전' | '오후') => void;
}
export const TimePanel = ({
  hour,
  minute,
  period,
  onHourChange,
  onMinuteChange,
  onPeriodChange,
}: TimePanelProps) => {
  return (
    <div className='mt-2 ml-2 flex border-l border-neutral-200 px-4 py-3'>
      <div className='flex gap-4'>
        <div className='flex flex-col items-center gap-3'>
          <TimeButton value={hour} />
          <TimeList
            values={Array.from({length: 12}, (_, i) => i + 1)}
            onSelect={onHourChange}
          />
        </div>

        <div className='flex flex-col items-center gap-3'>
          <TimeButton value={minute} />
          <TimeList
            values={Array.from({length: 60}, (_, i) => i)}
            onSelect={onMinuteChange}
          />
        </div>
      </div>

      <div className='ml-4 flex flex-col gap-4'>
        {(['오전', '오후'] as const).map((p) => {
          const selected = p === period;

          return (
            <button
              key={p}
              type='button'
              onClick={() => onPeriodChange(p)}
              className={`flex h-6 w-14.25 items-center justify-center rounded-sm text-body-s font-medium ${
                selected ? 'bg-primary text-white' : 'text-black'
              }`}>
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
};
