import {PENALTY_FULL_TABLE_HEADER} from '@/constants/admin/admin';
import {FullSessionTableRowType} from '@/schemas/admin/admin-penalties.schema';
import {
  PenaltyFullTableKey,
  SortDirection,
} from '@/types/mypage/admin/penalties/penalties.type';
import MinusIcon from '@repo/ui/assets/icons/minus-round.svg';
import ArrowDownIcon from '@repo/ui/assets/icons/arrow-down.svg';
import clsx from 'clsx';

interface AdminPenaltiesEntireTableProps {
  items: FullSessionTableRowType[];
  onSort: () => void;
  sortedDirection?: SortDirection;
}

export const AdminPenaltiesEntireTable = ({
  items,
  onSort,
  sortedDirection,
}: AdminPenaltiesEntireTableProps) => {
  return (
    <table className='h-fit w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {PENALTY_FULL_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-l-sb px-3 py-4 text-neutral-600'>
              <div className='flex items-center justify-center gap-2.5'>
                {col.label}
                {col.key === ('total-minus-point' as PenaltyFullTableKey) &&
                  (sortedDirection ? (
                    <button
                      type='button'
                      onClick={onSort}
                      aria-label='누계 정렬 변경'
                      className='inline-flex'>
                      <ArrowDownIcon
                        width={16}
                        height={16}
                        className={clsx(
                          'stroke-neutral-600',
                          sortedDirection === 'DESC' && 'rotate-180'
                        )}
                      />
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={onSort}
                      aria-label='누계 정렬 변경'
                      className='inline-flex'>
                      <MinusIcon
                        width={16}
                        height={16}
                        className='fill-neutral-600'
                      />
                    </button>
                  ))}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td
              colSpan={PENALTY_FULL_TABLE_HEADER.length}
              className='py-15 text-center text-neutral-400'>
              상벌점 내역이 없습니다.
            </td>
          </tr>
        ) : (
          items.map((row) => (
            <tr key={row.memberId} className='text-body-l-sb'>
              <td className='truncate px-3 py-4 text-center text-neutral-600'>
                {row.name}
              </td>
              <td className='text-alert truncate px-3 py-4 text-center'>
                {row.attendanceMinusPoint}
              </td>
              <td className='text-alert truncate px-3 py-4 text-center'>
                {row.sessionMinusPoint}
              </td>
              <td className='truncate px-3 py-4 text-center text-neutral-800'>
                {row.beerNetworkingCount}
              </td>
              <td className='text-secondary truncate px-3 py-4 text-center'>
                {row.beerNetworkingBonusPoint}
              </td>
              <td className='truncate px-3 py-4 text-center text-neutral-800'>
                {row.totalMinusPoint}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
