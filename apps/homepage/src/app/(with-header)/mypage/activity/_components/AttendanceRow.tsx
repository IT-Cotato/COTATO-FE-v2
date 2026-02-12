import clsx from 'clsx';

import {ATTENDANCE_STATUS} from '@/constants/mypage-mem/mypage-activity';
import {AttendanceRecord} from '@/schemas/mypage-mem/activity/attendance.schema';

export const AttendanceRows = ({data}: {data: AttendanceRecord[]}) => (
  <>
    {data.map((item) => {
      const status =
        ATTENDANCE_STATUS[item.result as keyof typeof ATTENDANCE_STATUS];
      return (
        <tr key={item.attendanceId} className='text-center'>
          <td>{item.sessionNumber}</td>
          <td>{item.placeName}</td>
          <td>{item.sessionType === 'OFFLINE' ? '대면' : '비대면'}</td>
          <td className='flex h-12.25 items-center justify-center py-[8.5px]'>
            <span
              className={clsx(
                'text-body-m-sb shadow-default flex h-full w-18.75 items-center justify-center rounded-[10px] text-white',
                status?.className
              )}>
              {status?.label}
            </span>
          </td>
        </tr>
      );
    })}
  </>
);
