import {AdminPenaltiesSpecificTableRowType} from '@/schemas/admin/admin-penalties.schema';
import {AdminPenaltiesSpecificTableRow} from '@/app/(with-header)/mypage/admin/penalties/_components/row/AdminPenaltiesSpecificTableRow';
import {PENALTY_SPECIFIC_TABLE_HEADER} from '@/constants/admin/admin-penalties';

interface AdminPenaltiesSpecificTableProps {
  items: AdminPenaltiesSpecificTableRowType[];
  onClickBeerNetworkingChip: (memberId: number, participated: boolean) => void;
  isUpdatingBeerNetworkingChip: boolean;
  onChangeExtraMinusPoint: (memberId: number, extraMinusPoint: number) => void;
}

export const AdminPenaltiesSpecificTable = ({
  items,
  onClickBeerNetworkingChip,
  isUpdatingBeerNetworkingChip,
  onChangeExtraMinusPoint,
}: AdminPenaltiesSpecificTableProps) => {
  return (
    <table className='h-fit w-full table-auto border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {PENALTY_SPECIFIC_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-m lg:text-body-l-sb min-w-max py-2.5 font-bold whitespace-nowrap text-neutral-600 lg:py-4'>
              {col.label}
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
            <AdminPenaltiesSpecificTableRow
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
