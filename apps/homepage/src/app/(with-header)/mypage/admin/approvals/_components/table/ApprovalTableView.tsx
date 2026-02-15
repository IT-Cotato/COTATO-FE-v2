import {ApprovalMemberType} from '@/schemas/admin/admin.schema';
import {
  APPROVAL_COLUMNS,
  MEMBER_POSITION_LABEL,
  type MemberPositionKey,
} from '@/constants/admin/admin';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';
import {SelectedMemberChip} from '../../../_components/SelectedMemberChip';

interface ApprovalTableViewProps {
  items: ApprovalMemberType[];
  allItems: ApprovalMemberType[];
  selectedIds: number[];
  onSelectAll: (checked: boolean) => void;
  onSelect: (id: number, checked: boolean) => void;
  onApprove: (memberId: number) => void;
  onReject: (memberId: number) => void;
}

export const ApprovalTableView = ({
  items,
  allItems,
  selectedIds,
  onSelectAll,
  onSelect,
  onApprove,
  onReject,
}: ApprovalTableViewProps) => {
  const isAllSelected =
    items.length > 0 &&
    items.every((item) => selectedIds.includes(item.memberId));

  return (
    <table className='min-w-[1110px] border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          <th className='w-12 px-3 py-4 text-center'>
            <Checkbox
              checked={isAllSelected}
              onChange={onSelectAll}
              className='border-0 bg-neutral-50'
            />
          </th>
          {APPROVAL_COLUMNS.map((col) => (
            <th
              key={col.key}
              className='text-body-l-sb px-3 py-4 text-center align-middle text-neutral-600'>
              {col.label}
            </th>
          ))}
          <th className='text-body-l-sb px-3 py-4 text-center align-middle text-neutral-600' />
        </tr>
      </thead>
      <tbody>
        {items.map((member) => (
          <tr key={member.memberId} className='text-body-l text-neutral-600'>
            <td className='px-3 py-4 text-center'>
              <Checkbox
                checked={selectedIds.includes(member.memberId)}
                onChange={(checked) => onSelect(member.memberId, checked)}
                className='border-0 bg-neutral-50'
              />
            </td>
            <td className='truncate px-3 py-4 text-center'>{member.name}</td>
            <td className='truncate px-3 py-4 text-center'>
              {new Date(member.appliedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {member.passedGenerationNumber}기
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {MEMBER_POSITION_LABEL[member.position as MemberPositionKey] ??
                member.position}
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {member.phoneNumber}
            </td>
            <td className='px-3 py-4'>
              <div className='flex items-center justify-center gap-2.5'>
                <button
                  type='button'
                  onClick={() => onApprove(member.memberId)}
                  className='text-primary text-body-m cursor-pointer rounded-lg bg-neutral-50 px-4.5 py-0.75'>
                  승인
                </button>
                <button
                  type='button'
                  onClick={() => onReject(member.memberId)}
                  className='text-body-m cursor-pointer rounded-lg bg-neutral-50 px-4.5 py-0.75 text-neutral-600'>
                  거절
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {selectedIds.length > 0 && (
        <tfoot>
          <tr>
            <td
              colSpan={APPROVAL_COLUMNS.length + 2}
              className='border border-neutral-200 bg-white py-2.75'>
              <div className='flex flex-wrap items-center gap-5.5'>
                <span className='text-body-l pl-8 text-neutral-600'>
                  선택 {selectedIds.length}
                </span>
                {allItems
                  .filter((m) => selectedIds.includes(m.memberId))
                  .map((m) => (
                    <SelectedMemberChip
                      key={m.memberId}
                      name={m.name}
                      onRemove={() => onSelect(m.memberId, false)}
                    />
                  ))}
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};
