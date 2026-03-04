import {PENALTY_SPECIFIC_TABLE_HEADER} from '@/constants/admin/admin';
import {SpecificSessionTableRowType} from '@/schemas/admin/admin-penalties.schema';

interface SpecificSessionTableProps {
  items: SpecificSessionTableRowType[];
}

export const SpecificSessionTable = ({items}: SpecificSessionTableProps) => {
  return (
    <table className='h-fit flex-1 border-collapse'>
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
            <tr
              key={row.memberId}
              className='text-body-l-sb text-center text-neutral-600'>
              <td className='truncate px-3 py-4'>{row.name}</td>
              <td className='truncate px-3 py-4'>{row.attendanceResult}</td>
              <td className='px-3 py-4'>{row.beerNetworkingParticipated}</td>
              <td className='px-3 py-4'>{row.extraMinusPoint}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
