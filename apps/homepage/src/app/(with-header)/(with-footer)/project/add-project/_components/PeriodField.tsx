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
      className='flex w-full flex-row items-center gap-1 lg:gap-0'
      role='group'
      aria-label='프로젝트 진행 기간 선택'>
      <div className='relative flex-1 lg:w-auto'>
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
          formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
          renderCustomHeader={(props) => <CustomHeader {...props} />}
          disabledKeyboardNavigation
        />
      </div>
      <div
        className='flex shrink-0 items-center justify-center px-1 lg:h-12 lg:w-17.5'
        aria-hidden='true'>
        <RightArrow className='h-6 w-6' />
      </div>
      <div className='relative flex-1 lg:w-auto'>
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
          popperPlacement='bottom-end'
          formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
          renderCustomHeader={(props) => <CustomHeader {...props} />}
          disabledKeyboardNavigation
        />
      </div>
    </div>
  );
};
