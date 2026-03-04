import {PENALTY_SPECIFIC_TABLE_HEADER} from '@/constants/admin/admin';
import {SpecificSessionTableRowType} from '@/schemas/admin/admin-penalties.schema';
import {SpecificSessionRow} from '@/app/(with-header)/mypage/admin/penalties/_components//row/SpecificSessionRow';

interface SpecificSessionTableProps {
  items: SpecificSessionTableRowType[];
  onClickBeerNetworkingChip: (memberId: number, participated: boolean) => void;
  isUpdatingBeerNetworkingChip: boolean;
  onChangeExtraMinusPoint: (memberId: number, extraMinusPoint: number) => void;
}

export const SpecificSessionTable = ({
  items,
  onClickBeerNetworkingChip,
  isUpdatingBeerNetworkingChip,
  onChangeExtraMinusPoint,
}: SpecificSessionTableProps) => {
  return (
    <table className='h-fit w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {PENALTY_SPECIFIC_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-l-sb px-3 py-4 text-neutral-600'>
              <div className='flex items-center justify-center gap-2.5'>
                {col.label}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td
              colSpan={PENALTY_SPECIFIC_TABLE_HEADER.length}
              className='py-15 text-center text-neutral-400'>
              상벌점 내역이 없습니다.
            </td>
          </tr>
        ) : (
          items.map((row) => (
            <SpecificSessionRow
              key={row.memberId}
              row={row}
              onClickBeerNetworkingChip={onClickBeerNetworkingChip}
              isUpdatingBeerNetworkingChip={isUpdatingBeerNetworkingChip}
              onChangeExtraMinusPoint={onChangeExtraMinusPoint}
            />
          ))
        )}
      </tbody>
    </table>
  );
};
