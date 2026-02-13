import clsx from 'clsx';
import {ATTENDANCE_STATUS} from '@/constants/mypage-mem/mypage-activity';
import {MemberAttendResponse} from '@/schemas/mypage-mem/activity/attendance.schema';

export const AttendanceRows = ({data}: {data: MemberAttendResponse[]}) => (
  <>
    {data.map((item) => {
      const status = item.result ? ATTENDANCE_STATUS[item.result] : null;
      return (
        <tr key={item.sessionId} className='text-center'>
          <td>{item.sessionNumber}</td>
          <td>{item.placeName}</td>
          <td>
            {item.sessionType === 'OFFLINE' && '대면'}
            {item.sessionType === 'ONLINE' && '비대면'}
            {item.sessionType === 'ALL' && '대면/비대면 혼용 세션'}
            {item.sessionType === 'NO_ATTEND' && '출석을 진행하지 않는 세션'}
          </td>
          <td className='flex h-12.25 items-center justify-center py-[8.5px]'>
            <span
              className={clsx(
                'text-body-m-sb shadow-default flex h-full w-18.75 items-center justify-center rounded-[10px] text-white',
                status?.className || 'bg-neutral-400'
              )}>
              {status?.label || '기록없음'}
            </span>
          </td>
        </tr>
      );
    })}
  </>
);
