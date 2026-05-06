'use client';

import {
  PenaltyFullTableKey,
  SortDirection,
} from '@/types/admin/admin-penalties.type';
import MinusIcon from '@repo/ui/assets/icons/minus-round.svg';
import ArrowDownIcon from '@repo/ui/assets/icons/arrow-down.svg';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import {AdminPenaltiesEntireTableRowType} from '@/schemas/admin/admin-penalties.schema';
import {
  PENALTY_FULL_TABLE_HEADER,
  PENALTY_FULL_TABLE_HEADER_MOBILE,
} from '@/constants/admin/admin-penalties';

const renderHeaderLabel = (label: string) => {
  if (!label.includes('\n')) return label;

  const lines = label.split('\n');

  return (
    <span className='whitespace-nowrap'>
      {lines.map((line, idx) => (
        <span key={`${line}-${idx}`}>
          {idx > 0 && <br />}
          {line}
        </span>
      ))}
    </span>
  );
};

interface AdminPenaltiesEntireTableProps {
  items: AdminPenaltiesEntireTableRowType[];
  onSort: () => void;
  sortedDirection?: SortDirection;
}

export const AdminPenaltiesEntireTable = ({
  items,
  onSort,
  sortedDirection,
}: AdminPenaltiesEntireTableProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tableHeader = isMobile
    ? PENALTY_FULL_TABLE_HEADER_MOBILE
    : PENALTY_FULL_TABLE_HEADER;

  return (
    <table className='table-atuo h-fit w-full border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {tableHeader.map((col) => (
            <th
              key={col.key}
              className='text-body-m lg:text-body-l-sb min-w-13.75 py-1 font-bold text-neutral-600 lg:py-4'>
              <div className='flex flex-wrap items-center justify-center gap-2.5'>
                {renderHeaderLabel(col.label)}
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
              colSpan={tableHeader.length}
              className='py-15 text-center text-neutral-400'>
              상벌점 내역이 없습니다.
            </td>
          </tr>
        ) : (
          items.map((row) => (
            <tr key={row.memberId} className='text-body-l-sb'>
              <td className='min-w-max px-3 py-4 text-center whitespace-nowrap text-neutral-600'>
                {row.name}
              </td>
              <td className='text-alert min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.attendanceMinusPoint}
              </td>
              <td className='text-alert min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.sessionMinusPoint}
              </td>
              <td className='min-w-max px-3 py-4 text-center whitespace-nowrap text-neutral-800'>
                {row.beerNetworkingCount}
              </td>
              <td className='text-secondary min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.beerNetworkingBonusPoint}
              </td>
              <td className='min-w-max px-3 py-4 text-center whitespace-nowrap text-neutral-800'>
                {row.totalMinusPoint}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
