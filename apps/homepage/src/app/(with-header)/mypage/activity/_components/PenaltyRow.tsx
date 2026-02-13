import {POINT_STATUS} from '@/constants/mypage-mem/mypage-activity';
import {PenaltyRecord} from '@/schemas/mypage-mem/activity/penalty.schema';
import clsx from 'clsx';

export const PenaltyRows = ({data}: {data: PenaltyRecord[]}) => (
  <>
    {data.map((record) => {
      const status = POINT_STATUS[
        record.pointType as keyof typeof POINT_STATUS
      ] ?? {
        label: record.pointType,
        className: 'bg-neutral-400',
      };
      return (
        <tr key={record.sessionId} className='h-12.25 text-center'>
          <td>{record.week}</td>
          <td>{record.content}</td>
          <td className='flex h-12.25 items-center justify-center py-[8.5px]'>
            <span
              className={clsx(
                'text-body-m-sb flex h-full w-18.75 items-center justify-center rounded-[10px] text-white',
                status?.className
              )}>
              {status?.label}
            </span>
          </td>
          <td>{record.point}점</td>
          <td className='text-body-l text-neutral-800'>
            {record.cumulativePoint}
          </td>
        </tr>
      );
    })}
  </>
);
