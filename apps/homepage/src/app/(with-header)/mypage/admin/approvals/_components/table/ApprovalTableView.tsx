import {ApprovalMemberType} from '@/schemas/admin/admin-members.schema';
import {
  APPROVAL_COLUMNS,
  MEMBER_POSITION_LABEL,
  type MemberPositionKey,
  type ApprovalTabType,
} from '@/constants/admin/admin';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';
import {SelectedMembersBar} from '@/app/(with-header)/mypage/admin/_components/SelectedMembersBar';
import clsx from 'clsx';

interface ApprovalTableViewProps {
  items: ApprovalMemberType[];
  allItems: ApprovalMemberType[];
  selectedIds: number[];
  activeTab: ApprovalTabType;
  onSelectAll: (checked: boolean) => void;
  onSelect: (id: number, checked: boolean) => void;
  onApprove: (memberId: number) => void;
  onReject: (memberId: number) => void;
  isLoading?: boolean;
}

export const ApprovalTableView = ({
  items,
  allItems,
  selectedIds,
  activeTab,
  onSelectAll,
  onSelect,
  onApprove,
  onReject,
  isLoading = false,
}: ApprovalTableViewProps) => {
  const approveLabel = activeTab === 'REQUESTED' ? '승인' : '복원';
  const rejectLabel = activeTab === 'REQUESTED' ? '거절' : '삭제';
  const isAllSelected =
    items.length > 0 &&
    items.every((item) => selectedIds.includes(item.memberId));

  return (
    <>
      <div className='w-full overflow-x-auto'>
        <table className='w-full border-collapse table-fixed [border-spacing:0]'>
          <thead className='bg-neutral-200'>
            <tr>
              {APPROVAL_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    'text-body-l-sb bg-neutral-200 px-2.5 py-3 text-center align-middle text-neutral-600 lg:px-3 lg:py-4',
                    (col.key === 'phone' || col.key === 'applicationDate') &&
                      'hidden lg:table-cell'
                  )}>
                  {col.key === 'name' ? (
                    <div className='flex items-center gap-0.5 px-2'>
                      <span className='shrink-0'>
                        <Checkbox
                          checked={isAllSelected}
                          onChange={onSelectAll}
                          className='border-0 bg-neutral-50'
                        />
                      </span>
                      <span className='flex-1 text-center'>이름</span>
                    </div>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              <th className='text-body-l-sb px-2.5 py-3 text-center align-middle text-neutral-600 lg:px-3 lg:py-4' />
            </tr>
          </thead>
          <tbody>
            {items.map((member) => (
              <tr key={member.memberId} className='text-body-l text-neutral-600'>
                <td className='truncate px-2.5 py-3 lg:px-3 lg:py-4'>
                  <div className='flex items-center gap-0.5 px-2'>
                    <span className='shrink-0'>
                      <Checkbox
                        checked={selectedIds.includes(member.memberId)}
                        onChange={(checked) =>
                          onSelect(member.memberId, checked)
                        }
                        className='border-0 bg-neutral-50'
                      />
                    </span>
                    <span className='flex-1 text-center'>{member.name}</span>
                  </div>
                </td>
                <td className='truncate px-2.5 py-3 text-center lg:px-3 lg:py-4'>
                  {member.passedGenerationNumber}기
                </td>
                <td className='truncate px-2.5 py-3 text-center lg:px-3 lg:py-4'>
                  {MEMBER_POSITION_LABEL[
                    member.position as MemberPositionKey
                  ] ?? member.position}
                </td>
                <td className='hidden truncate px-2.5 py-3 text-center lg:table-cell lg:px-3 lg:py-4'>
                  {member.phoneNumber}
                </td>
                <td className='hidden truncate px-2.5 py-3 text-center lg:table-cell lg:px-3 lg:py-4'>
                  {new Date(member.appliedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </td>
                <td className='px-2.5 py-3 lg:px-3 lg:py-4'>
                  <div className='flex items-center justify-center gap-0.5 lg:gap-2.5'>
                    <button
                      type='button'
                      disabled={isLoading}
                      onClick={() => onApprove(member.memberId)}
                      className='text-primary text-body-m-sb cursor-pointer rounded-lg bg-neutral-50 px-1.5 py-px whitespace-nowrap lg:px-4.5 lg:py-0.75'>
                      {approveLabel}
                    </button>
                    <button
                      type='button'
                      disabled={isLoading}
                      onClick={() => onReject(member.memberId)}
                      className='text-body-m-sb cursor-pointer rounded-lg bg-neutral-50 px-1.5 py-px whitespace-nowrap text-neutral-600 lg:px-4.5 lg:py-0.75'>
                      {rejectLabel}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SelectedMembersBar
        selectedIds={selectedIds}
        allItems={allItems}
        onRemove={(id) => onSelect(id, false)}
      />
    </>
  );
};
