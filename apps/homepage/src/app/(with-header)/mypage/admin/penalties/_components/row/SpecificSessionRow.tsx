'use client';

import {
  ATTENDANCE_STATUS_CONFIG,
  BEER_NETWORKING_ATTENDANCE_CONFIG,
} from '@/constants/admin/admin';
import {SpecificSessionTableRowType} from '@/schemas/admin/admin-penalties.schema';
import {StatusChip} from '@repo/ui/components/chip/StatusChip';
import {useDebounce} from '@repo/ui/hooks/useDebounce';
import {useEffect, useState} from 'react';

interface SpecificSessionRowProps {
  row: SpecificSessionTableRowType;
  onClickBeerNetworkingChip: (memberId: number, participated: boolean) => void;
  isUpdatingBeerNetworkingChip: boolean;
  onChangeExtraMinusPoint: (memberId: number, extraMinusPoint: number) => void;
}

export const SpecificSessionRow = ({
  row,
  onClickBeerNetworkingChip,
  isUpdatingBeerNetworkingChip,
  onChangeExtraMinusPoint,
}: SpecificSessionRowProps) => {
  const [value, setValue] = useState(row.extraMinusPoint);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setValue(row.extraMinusPoint);
  }, [row.extraMinusPoint]);

  useEffect(() => {
    if (debouncedValue !== row.extraMinusPoint) {
      onChangeExtraMinusPoint(row.memberId, debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <tr className='text-body-l-sb text-center text-neutral-600'>
      <td className='truncate px-3 py-4'>{row.name}</td>

      <td className='truncate px-3 py-4'>
        <StatusChip
          value={row.attendanceResult}
          config={ATTENDANCE_STATUS_CONFIG}
          isActive
          disabled
        />
      </td>

      <td className='px-3 py-4'>
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
          onChange={(e) => setValue(Number(e.target.value))}
          className='text-body-l-sb placeholder:text-body-l-sb w-full bg-transparent text-center font-normal outline-none placeholder:text-neutral-600'
        />
      </td>
    </tr>
  );
};
