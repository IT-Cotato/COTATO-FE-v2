import {TimeButton} from '@/app/admin/(with-sidebar)/application-edit/_components/calendar/TimeButton';
import {TimeList} from '@/app/admin/(with-sidebar)/application-edit/_components/calendar/TimeList';

interface TimePanelProps {
  hour: number;
  minute: number;
  onHourChange: (v: number) => void;
  onMinuteChange: (v: number) => void;
}

export const TimePanel = ({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
}: TimePanelProps) => {
  return (
    <div className='mt-2 ml-2 flex border-l border-neutral-200 px-4 py-3'>
      <div className='flex gap-4'>
        <div className='flex flex-col items-center gap-3'>
          <TimeButton value={hour} />
          <TimeList
            values={Array.from({length: 24}, (_, i) => i)}
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
    </div>
  );
};
