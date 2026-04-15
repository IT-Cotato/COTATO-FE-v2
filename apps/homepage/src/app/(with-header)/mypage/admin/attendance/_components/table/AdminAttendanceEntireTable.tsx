import {
  MEMBER_POSITION_LABEL,
  type MemberPositionKey,
} from '@/constants/admin/admin';
import {ATTENDANCE_FULL_TABLE_HEADER} from '@/constants/admin/admin-attendance';
import {AdminAttendanceEntireTableRowType} from '@/schemas/admin/admin-attendance.schema';

interface AdminAttendanceEntireTableProps {
  items: AdminAttendanceEntireTableRowType[];
}

export const AdminAttendanceEntireTable = ({
  items,
}: AdminAttendanceEntireTableProps) => {
  return (
    <table className='h-fit w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {ATTENDANCE_FULL_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-m-sb lg:text-body-l-sb overflow-hidden px-3 py-4 text-neutral-600'>
              <div className='flex min-w-min items-center justify-center gap-2.5 whitespace-nowrap'>
                <span className='hidden lg:block'>
                  {col.icon && <col.icon />}
                </span>
                {col.label}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={6} className='py-15 text-center text-neutral-400'>
              출석 내역이 없습니다.
            </td>
          </tr>
        ) : (
          items.map((row) => (
            <tr
              key={row.memberInfo.memberId}
              className='text-body-m lg:text-body-l-sb text-neutral-600'>
              <td className='px-3 py-4 text-center'>{row.memberInfo.name}</td>
              <td className='truncate px-3 py-4 text-center'>
                {MEMBER_POSITION_LABEL[
                  row.memberInfo.position as MemberPositionKey
                ] ?? row.memberInfo.position}
              </td>
              <td className='text-primary px-3 py-4 text-center'>
                {row.statistic.present}
              </td>
              <td className='text-disabled px-3 py-4 text-center'>
                {row.statistic.late}
              </td>
              <td className='px-3 py-4 text-center text-neutral-500'>
                {row.statistic.absent}
              </td>
              <td className='text-alert px-3 py-4 text-center'>
                {row.statistic.unauthorizedAbsent}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
