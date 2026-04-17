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
    <table className='h-fit w-full table-auto border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {ATTENDANCE_FULL_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-m-sb lg:text-body-l-sb min-w-12.5 overflow-hidden py-2.5 text-neutral-600 lg:py-4'>
              <div className='flex items-center justify-center gap-2.5 whitespace-nowrap'>
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
            <td
              colSpan={6}
              className='min-w-max py-15 text-center text-neutral-400'>
              출석 내역이 없습니다.
            </td>
          </tr>
        ) : (
          items.map((row) => (
            <tr
              key={row.memberInfo.memberId}
              className='text-body-m lg:text-body-l-sb text-neutral-600'>
              <td className='min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.memberInfo.name}
              </td>
              <td className='min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {MEMBER_POSITION_LABEL[
                  row.memberInfo.position as MemberPositionKey
                ] ?? row.memberInfo.position}
              </td>
              <td className='text-primary min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.statistic.present}
              </td>
              <td className='text-disabled min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.statistic.late}
              </td>
              <td className='min-w-max px-3 py-4 text-center whitespace-nowrap text-neutral-500'>
                {row.statistic.absent}
              </td>
              <td className='text-alert min-w-max px-3 py-4 text-center whitespace-nowrap'>
                {row.statistic.unauthorizedAbsent}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
