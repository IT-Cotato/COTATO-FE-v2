import {
  ATTENDANCE_SPECIFIC_TABLE_HEADER,
  ATTENDANCE_STATUS_CONFIG,
  ATTENDANCE_STATUS_OPTION,
} from '@/constants/admin/admin-attendance';
import {
  AdminAttendanceSpecificTableRowType,
  AttendanceStatusType,
} from '@/schemas/admin/admin-attendance.schema';
import {StatusDropdown} from '@repo/ui/components/dropdown/StatusDropdown';

interface AdminAttendanceSpecificTableProps {
  items: AdminAttendanceSpecificTableRowType[];
  onChangeAttendanceStatus: (
    memberId: number,
    result: AttendanceStatusType
  ) => void;
  isUpdating: boolean;
}

export const AdminAttendanceSpecificTable = ({
  items,
  onChangeAttendanceStatus,
  isUpdating,
}: AdminAttendanceSpecificTableProps) => {
  return (
    <table className='h-fit w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {ATTENDANCE_SPECIFIC_TABLE_HEADER.map((col) => (
            <th
              key={col.key}
              className='text-body-m-sb lg:text-body-l-sb w-max overflow-hidden px-3 py-4 whitespace-nowrap text-neutral-600'>
              <div>{col.label}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={3} className='py-15 text-center text-neutral-400'>
              출석 내역이 없습니다.
            </td>
          </tr>
        ) : (
          items.map((row) => (
            <tr
              key={row.memberInfo.memberId}
              className='text-body-m lg:text-body-l-sb text-center text-neutral-600'>
              <td className='truncate px-3 py-4'>{row.memberInfo.name}</td>
              <td className='truncate px-3 py-4'>
                {row.memberInfo.generationId}기
              </td>
              <td className='px-3 py-4'>
                <div className='flex items-center justify-center'>
                  <StatusDropdown
                    value={row.result ?? 'NOT_YET'}
                    options={ATTENDANCE_STATUS_OPTION}
                    config={ATTENDANCE_STATUS_CONFIG}
                    onChange={(value) =>
                      onChangeAttendanceStatus(row.memberInfo.memberId, value)
                    }
                    disabled={isUpdating}
                    ariaLabel='출석 상태 선택'
                  />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
