'use client';

import {ATTENDANCE_STATUS_CONFIG} from '@/constants/admin/admin-attendance';
import {BEER_NETWORKING_ATTENDANCE_CONFIG} from '@/constants/admin/admin-penalties';
import {AdminPenaltiesSpecificTableRowType} from '@/schemas/admin/admin-penalties.schema';
import {StatusChip} from '@repo/ui/components/chip/StatusChip';
import {useDebounce} from '@repo/ui/hooks/useDebounce';
import {useEffect, useState} from 'react';

interface AdminPenaltiesSpecificRowProps {
  row: AdminPenaltiesSpecificTableRowType;
  onClickBeerNetworkingChip: (memberId: number, participated: boolean) => void;
  isUpdatingBeerNetworkingChip: boolean;
  onChangeExtraMinusPoint: (memberId: number, extraMinusPoint: number) => void;
}

export const AdminPenaltiesSpecificTableRow = ({
  row,
  onClickBeerNetworkingChip,
  isUpdatingBeerNetworkingChip,
  onChangeExtraMinusPoint,
}: AdminPenaltiesSpecificRowProps) => {
  const [value, setValue] = useState(String(Math.abs(row.extraMinusPoint)));

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setValue(String(Math.abs(row.extraMinusPoint)));
  }, [row.extraMinusPoint]);

  useEffect(() => {
    const num = Number(debouncedValue);
    if (!Number.isNaN(num) && -num !== row.extraMinusPoint) {
      onChangeExtraMinusPoint(row.memberId, -num);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <tr className='text-body-l-sb text-center text-neutral-600'>
      <td className='px-3 py-4'>{row.name}</td>

      <td className='overflow-hidden px-3 py-4'>
        <StatusChip
          value={row.attendanceResult}
          config={ATTENDANCE_STATUS_CONFIG}
          isActive
          disabled
        />
      </td>

      <td className='overflow-hidden px-3 py-4'>
        <StatusChip
          value={row.beerNetworkingParticipated ? 'PRESENT' : 'ABSENT'}
          config={BEER_NETWORKING_ATTENDANCE_CONFIG}
          isActive
          disabled={isUpdatingBeerNetworkingChip}
          onClick={() =>
            onClickBeerNetworkingChip(
              row.memberId,
              !row.beerNetworkingParticipated
            )
          }
        />
      </td>

      <td className='px-3 py-4'>
        <input
          type='text'
          placeholder='0'
          aria-label='기타 벌점'
          value={value}
          onChange={(e) => {
            const num = parseInt(e.target.value, 10);
            setValue(isNaN(num) ? String(0) : String(num));
          }}
          className='text-body-l-sb placeholder:text-body-l-sb w-full bg-transparent text-center text-neutral-600 outline-none placeholder:text-neutral-600'
        />
      </td>
    </tr>
  );
};
