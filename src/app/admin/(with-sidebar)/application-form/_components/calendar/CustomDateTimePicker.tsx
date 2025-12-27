import {CustomHeader} from '@/app/admin/(with-sidebar)/application-form/_components/calendar/CustomHeader';
import {TimePanel} from '@/app/admin/(with-sidebar)/application-form/_components/calendar/TimePanel';
import '@/app/admin/(with-sidebar)/application-form/_components/calendar/style/application-form-datepicker.css';
import {CustomInput} from '@/app/admin/(with-sidebar)/recruitment/_components/calendar/CustomInput';
import {getInitialTime} from '@/utils/getInitialTime';
import {useState} from 'react';
import DatePicker, {CalendarContainer} from 'react-datepicker';

interface CusotomDateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date) => void;
}

export const CustomDateTimePicker = ({
  selected,
  onChange,
}: CusotomDateTimePickerProps) => {
  const initialTime = getInitialTime();
  const [hour, setHour] = useState(initialTime.hour);
  const [minute, setMinute] = useState(initialTime.minute);
  const [period, setPeriod] = useState<'오전' | '오후'>('오전');

  const handlePrevMonth = () => {
    if (!selected) return;
    const newDate = new Date(
      selected.getFullYear(),
      selected.getMonth() - 1,
      selected.getDate()
    );
    onChange(newDate);
  };

  const handleNextMonth = () => {
    if (!selected) return;
    const newDate = new Date(
      selected.getFullYear(),
      selected.getMonth() + 1,
      selected.getDate()
    );
    onChange(newDate);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => {
        if (!date) return;
        onChange(date);
      }}
      dateFormat='yyyy-MM-dd'
      formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
      customInput={<CustomInput />}
      calendarContainer={(props) => (
        <CalendarContainer>
          <div className='custom-datetime-picker rounded-2xl bg-white p-6 shadow-xl'>
            <CustomHeader
              date={selected ?? new Date()}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />

            <div className='flex'>
              <div>{props.children}</div>
              <TimePanel
                hour={hour}
                minute={minute}
                period={period}
                onHourChange={setHour}
                onMinuteChange={setMinute}
                onPeriodChange={setPeriod}
              />
            </div>
          </div>
        </CalendarContainer>
      )}
      inline
    />
  );
};
