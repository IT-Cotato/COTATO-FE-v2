'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';
import {CustomInput} from '@/app/admin/recruitment/_components/calendar/CustomInput';
import {CustomHeader} from '@/app/admin/recruitment/_components/calendar/CustomHeader';

interface PeriodFieldProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  disabled?: boolean;
}

export const PeriodField = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  disabled,
}: PeriodFieldProps) => {
  return (
    <div className='flex w-full flex-col gap-2.5'>
      <legend className='text-body-l text-neutral-600'>지원기간</legend>
      <div className='flex items-center gap-2.5'>
        <div className='relative'>
          <DatePicker
            selected={startDate}
            disabled={disabled}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat='yyyy-MM-dd'
            customInput={<CustomInput disabled={disabled} />}
            popperPlacement='bottom-start'
            formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
            disabledKeyboardNavigation
          />
        </div>
        <div className='relative'>
          <DatePicker
            selected={endDate}
            disabled={disabled}
            onChange={(date: Date | null) => setEndDate(date)}
            minDate={startDate ?? undefined}
            dateFormat='yyyy-MM-dd'
            customInput={<CustomInput disabled={disabled} />}
            popperPlacement='bottom-start'
            formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
            disabledKeyboardNavigation
          />
        </div>
      </div>
    </div>
  );
};
