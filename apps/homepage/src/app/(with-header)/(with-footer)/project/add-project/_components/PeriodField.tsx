import {CustomHeader} from '@/app/(with-header)/(with-footer)/project/add-project/_components/calendar/CustomHeader';
import {CustomInput} from '@/app/(with-header)/(with-footer)/project/add-project/_components/calendar/CustomInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RightArrow from '@/assets/arrows/arrow-right.svg';

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
    <div
      className='flex items-center'
      role='group'
      aria-label='프로젝트 진행 기간 선택'>
      <div className='relative'>
        <DatePicker
          selected={startDate}
          disabled={disabled}
          onChange={(date: Date | null) => {
            setStartDate(date);
            if (date && endDate && date > endDate) {
              setEndDate(null);
            }
          }}
          dateFormat='yyyy-MM-dd'
          placeholderText='시작 일자'
          customInput={
            <CustomInput disabled={disabled} placeholder='시작 일자' />
          }
          popperPlacement='bottom-start'
          formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
          renderCustomHeader={(props) => <CustomHeader {...props} />}
          disabledKeyboardNavigation
        />
      </div>
      <div
        className='flex h-12 w-17.5 items-center justify-center'
        aria-hidden='true'>
        <RightArrow className='h-6 w-6' />
      </div>
      <div className='relative'>
        <DatePicker
          selected={endDate}
          disabled={disabled}
          onChange={(date: Date | null) => setEndDate(date)}
          minDate={startDate ?? undefined}
          dateFormat='yyyy-MM-dd'
          placeholderText='발표 날짜'
          customInput={
            <CustomInput disabled={disabled} placeholder='발표 날짜' />
          }
          popperPlacement='bottom-start'
          formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
          renderCustomHeader={(props) => <CustomHeader {...props} />}
          disabledKeyboardNavigation
        />
      </div>
    </div>
  );
};
