import {
  ATTENDANCE_FULL_TABLE_HEADER,
  MEMBER_POSITION_LABEL,
  type MemberPositionKey,
} from '@/constants/admin/admin';
import {FullSessionTableRowType} from '@/schemas/admin/attendance.schema';

interface FullSessionTableProps {
  items: FullSessionTableRowType[];
}

export const FullSessionTable = ({items}: FullSessionTableProps) => {
  return (
    <table className='min-w-275 border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {ATTENDANCE_FULL_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-l-sb px-3 py-4 text-neutral-600'>
              <div className='flex items-center justify-center gap-2.5'>
                {col.icon && <col.icon />}
                {col.label}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr
            key={row.memberInfo.memberId}
            className='text-body-l-sb text-neutral-600'>
            <td className='truncate px-3 py-4 text-center'>
              {row.memberInfo.name}
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {MEMBER_POSITION_LABEL[
                row.memberInfo.position as MemberPositionKey
              ] ?? row.memberInfo.position}
            </td>
            <td className='text-primary truncate px-3 py-4 text-center'>
              {row.statistic.present}
            </td>
            <td className='text-disabled truncate px-3 py-4 text-center'>
              {row.statistic.late}
            </td>
            <td className='truncate px-3 py-4 text-center text-neutral-500'>
              {row.statistic.absent}
            </td>
            <td className='text-alert truncate px-3 py-4 text-center'>
              {row.statistic.unauthorizedAbsent}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
