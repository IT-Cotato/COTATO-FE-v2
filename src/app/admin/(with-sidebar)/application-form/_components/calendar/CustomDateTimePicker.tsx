import {CustomHeader} from '@/app/admin/(with-sidebar)/application-form/_components/calendar/CustomHeader';
import {TimePanel} from '@/app/admin/(with-sidebar)/application-form/_components/calendar/TimePanel';
import '@/app/admin/(with-sidebar)/application-form/_components/calendar/style/application-form-datepicker.css';
import {CustomInput} from '@/app/admin/(with-sidebar)/recruitment/_components/calendar/CustomInput';
import {useState} from 'react';
import DatePicker, {CalendarContainer} from 'react-datepicker';

interface CustomDateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date) => void;
}

export const CustomDateTimePicker = ({
  selected,
  onChange,
}: CustomDateTimePickerProps) => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
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

  const to24Hour = (hour: number, period: '오전' | '오후') => {
    if (period === '오전') {
      return hour === 12 ? 0 : hour;
    }
    return hour === 12 ? 12 : hour + 12;
  };

  const applyTimeToDate = (date: Date) => {
    const h24 = to24Hour(hour, period);

    const next = new Date(date);
    next.setHours(h24);
    next.setMinutes(minute);
    next.setSeconds(0);
    next.setMilliseconds(0);

    return next;
  };

  return (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => {
        if (!date) return;
        onChange(applyTimeToDate(date));
      }}
      dateFormat='yyyy-MM-dd'
      formatWeekDay={(nameOfDay) => nameOfDay.toLowerCase().slice(0, 3)}
      customInput={<CustomInput />}
      calendarContainer={(props) => (
        <CalendarContainer>
          <div className='custom-datetime-picker shadow-card rounded-2xl bg-white p-6'>
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
                onHourChange={(h) => {
                  setHour(h);
                  if (selected) onChange(applyTimeToDate(selected));
                }}
                onMinuteChange={(m) => {
                  setMinute(m);
                  if (selected) onChange(applyTimeToDate(selected));
                }}
                onPeriodChange={(p) => {
                  setPeriod(p);
                  if (selected) onChange(applyTimeToDate(selected));
                }}
              />
            </div>
          </div>
        </CalendarContainer>
      )}
      inline
    />
  );
};
