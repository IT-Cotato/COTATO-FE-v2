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

  const updateTime = (
    baseDate: Date,
    {
      hour,
      minute,
    }: {
      hour?: number;
      minute?: number;
    }
  ) => {
    const next = new Date(baseDate);

    const currentHour = hour ?? baseDate.getHours();
    const currentMinute = minute ?? baseDate.getMinutes();

    next.setHours(currentHour);
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
                hour={selected.getHours()}
                minute={selected.getMinutes()}
                onHourChange={(h) => updateTime(selected, {hour: h})}
                onMinuteChange={(m) => updateTime(selected, {minute: m})}
              />
            </div>
          </div>
        </CalendarContainer>
      )}
    />
  );
};
