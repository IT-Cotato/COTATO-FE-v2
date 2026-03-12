import {POINT_STATUS} from '@/constants/mypage-mem/mypage-activity';
import {PenaltyRecord} from '@/schemas/mypage-mem/activity/penalty.schema';
import clsx from 'clsx';

export const PenaltyRows = ({data}: {data: PenaltyRecord[]}) => {
  const sortedData = [...data].sort((a, b) => b.week - a.week);
  return (
    <>
      {sortedData.map((record, index) => {
        const status = POINT_STATUS[
          record.pointType as keyof typeof POINT_STATUS
        ] ?? {
          label: record.pointType,
          className: 'bg-neutral-400',
        };

        // 세션 <- 단어 제거 (모바일용)
        const mobileLabel = status.label.replace(/^세션\s*/, '');
        const mobileContent = record.content.replace(/^세션\s*/, '');

        return (
          <tr
            key={`${record.sessionId}-${index}`}
            className='h-8 text-center md:h-12.25'>
            <td>{record.week + 1}</td>
            <td className='h-8 px-px md:h-12.25 md:px-0'>
              <div className='mx-auto w-full max-w-15 truncate md:max-w-none'>
                {/* 모바일에서는 '세션'이 제거된 텍스트로 렌더링, 웹은 그대로 렌더링 */}
                <span className='md:hidden'>{mobileContent}</span>
                <span className='hidden md:inline'>{record.content}</span>
              </div>
            </td>
            <td className='my-0.5 flex h-7 items-center justify-center md:my-0 md:h-12.25 md:py-[8.5px]'>
              <span
                className={clsx(
                  'md:text-body-m-sb text-body-m flex h-7 w-14.5 items-center justify-center rounded-[10px] text-white md:h-full md:w-18.75',
                  status?.className
                )}>
                <span className='md:hidden'>{mobileLabel}</span>
                <span className='hidden md:inline'>{status.label}</span>
              </span>
            </td>
            <td className='h-8 md:h-12.25'>
              {record.point}
              <span className='hidden md:inline'>점</span>
            </td>
            <td className='md:text-body-l h-8 text-[14px] text-neutral-800'>
              {record.cumulativePoint}
            </td>
          </tr>
        );
      })}
    </>
  );
};
