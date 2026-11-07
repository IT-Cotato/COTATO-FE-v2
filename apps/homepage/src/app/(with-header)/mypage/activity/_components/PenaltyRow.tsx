import {POINT_STATUS} from '@/constants/mypage-mem/mypage-activity';
import {PointTimelineRecord} from '@/schemas/mypage-mem/activity/penalty.schema';
import clsx from 'clsx';

/** 서버가 확정한 시간순 누계를 유지하며 수동 상점을 가짜 세션으로 표시하지 않는다. */
export const PenaltyRows = ({data}: {data: PointTimelineRecord[]}) => {
  // 서버의 날짜순 누계는 재계산하지 않고 표시 순서만 최신순으로 뒤집는다.
  const sortedData = [...data].reverse();
  return (
    <>
      {sortedData.map((record) => {
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
          <tr key={record.recordId} className='h-8 text-center lg:h-12.25'>
            <td>
              {record.week === null ? '세션 외' : record.week + 1}
              {record.source === 'MANUAL' && record.occurredAt && (
                <span className='text-body-m block'>
                  {record.occurredAt.slice(5, 10).replace('-', '/')}
                </span>
              )}
            </td>
            <td className='h-8 px-px lg:h-12.25 lg:px-0'>
              <div
                className='mx-auto w-full max-w-15 truncate lg:max-w-none'
                title={record.content}>
                {/* 모바일에서는 '세션'이 제거된 텍스트로 렌더링, 웹은 그대로 렌더링 */}
                <span className='lg:hidden'>{mobileContent}</span>
                <span className='hidden lg:inline'>{record.content}</span>
              </div>
            </td>
            <td className='my-0.5 flex h-7 items-center justify-center lg:my-0 lg:h-12.25 lg:py-[8.5px]'>
              <span
                className={clsx(
                  'lg:text-body-m-sb text-body-m flex h-7 w-14.5 items-center justify-center rounded-[10px] text-white lg:h-full lg:w-18.75',
                  status?.className
                )}>
                <span className='lg:hidden'>{mobileLabel}</span>
                <span className='hidden lg:inline'>{status.label}</span>
              </span>
            </td>
            <td className='h-8 lg:h-12.25'>
              {record.point}
              <span className='hidden lg:inline'>점</span>
            </td>
            <td className='lg:text-body-l h-8 text-[14px] text-neutral-800'>
              {record.cumulativePoint}
            </td>
          </tr>
        );
      })}
    </>
  );
};
