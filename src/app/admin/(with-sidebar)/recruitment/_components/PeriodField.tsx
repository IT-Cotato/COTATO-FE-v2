'use client';

import {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepicker-custom.css';
import {CustomInput} from './calendar/CustomInput';
import {CustomHeader} from './calendar/CustomHeader';

export const PeriodField = () => {
  const today = new Date();

  const [startDate, setStartDate] = useState<Date | null>(today);
  const [endDate, setEndDate] = useState<Date | null>(today);

  return (
    <div className='flex w-full flex-col gap-4'>
      <label>지원기간</label>
      <div className='flex items-center gap-2.5'>
        <div className='relative'>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat='yyyy-MM-dd'
            customInput={<CustomInput />}
            popperPlacement='bottom-start'
            formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
          />
        </div>
        <div className='relative'>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            minDate={startDate ?? undefined}
            dateFormat='yyyy-MM-dd'
            customInput={<CustomInput />}
            popperPlacement='bottom-start'
            formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
            renderCustomHeader={(props) => <CustomHeader {...props} />}
          />
        </div>
      </div>
    </div>
  );
};
