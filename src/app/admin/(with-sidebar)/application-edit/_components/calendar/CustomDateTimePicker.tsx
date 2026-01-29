import {CustomHeader} from '@/app/admin/(with-sidebar)/application-edit/_components/calendar/CustomHeader';
import {TimePanel} from '@/app/admin/(with-sidebar)/application-edit/_components/calendar/TimePanel';
import '@/app/admin/(with-sidebar)/application-edit/_components/calendar/style/application-edit-datepicker.css';
import {CustomInput} from '@/app/admin/(with-sidebar)/recruitment/_components/calendar/CustomInput';
import DatePicker, {CalendarContainer} from 'react-datepicker';

interface CustomDateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date) => void;
}
export const CustomDateTimePicker = ({
  selected,
  onChange,
}: CustomDateTimePickerProps) => {
  if (!selected) return null;

  const getHour12 = () => {
    const h = selected.getHours();
    if (h === 0) return 12;
    if (h > 12) return h - 12;
    return h;
  };

  const getPeriod = () => (selected.getHours() < 12 ? '오전' : '오후');

  const updateTime = (
    baseDate: Date,
    {
      hour,
      minute,
      period,
    }: {
      hour?: number;
      minute?: number;
      period?: '오전' | '오후';
    }
  ) => {
    const next = new Date(baseDate);

    const getHour12From = (d: Date) => {
      const h = d.getHours();
      if (h === 0) return 12;
      if (h > 12) return h - 12;
      return h;
    };

    const getPeriodFrom = (d: Date) => (d.getHours() < 12 ? '오전' : '오후');

    const currentHour12 = hour ?? getHour12From(baseDate);
    const currentMinute = minute ?? baseDate.getMinutes();
    const currentPeriod = period ?? getPeriodFrom(baseDate);

    const h24 =
      currentPeriod === '오전'
        ? currentHour12 === 12
          ? 0
          : currentHour12
        : currentHour12 === 12
          ? 12
          : currentHour12 + 12;

    next.setHours(h24);
    next.setMinutes(currentMinute);
    next.setSeconds(0);
    next.setMilliseconds(0);

    onChange(next);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => {
        if (!date) return;
        updateTime(date, {});
      }}
      inline
      customInput={<CustomInput />}
      calendarContainer={(props) => (
        <CalendarContainer>
          <div className='custom-datetime-picker shadow-card rounded-2xl bg-white p-6'>
            <CustomHeader
              date={selected}
              onPrevMonth={() =>
                onChange(
                  new Date(
                    selected.getFullYear(),
                    selected.getMonth() - 1,
                    selected.getDate(),
                    selected.getHours(),
                    selected.getMinutes()
                  )
                )
              }
              onNextMonth={() =>
                onChange(
                  new Date(
                    selected.getFullYear(),
                    selected.getMonth() + 1,
                    selected.getDate(),
                    selected.getHours(),
                    selected.getMinutes()
                  )
                )
              }
            />

            <div className='flex'>
              <div>{props.children}</div>
              <TimePanel
                hour={getHour12()}
                minute={selected.getMinutes()}
                period={getPeriod()}
                onHourChange={(h) => updateTime(selected, {hour: h})}
                onMinuteChange={(m) => updateTime(selected, {minute: m})}
                onPeriodChange={(p) => updateTime(selected, {period: p})}
              />
            </div>
          </div>
        </CalendarContainer>
      )}
    />
  );
};
