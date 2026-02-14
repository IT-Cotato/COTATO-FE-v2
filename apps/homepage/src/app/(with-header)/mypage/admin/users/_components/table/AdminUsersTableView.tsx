import {MemberTabType, MemberType} from '@/schemas/admin/admin-users.schema';
import {
  MEMBER_COLUMNS,
  MEMBER_ROLE_CONFIG,
  MEMBER_ROLE_OPTIONS,
  MEMBER_STATUS_CONFIG,
  MEMBER_STATUS_OPTIONS,
  MemberStatusKey,
  type MemberRoleKey,
} from '@/constants/admin/admin-users';
import {useRef, useState} from 'react';
import FinishFilterIcon from '@repo/ui/assets/icons/filter-finish.svg';
import DefaultFilterIcon from '@repo/ui/assets/icons/filter-default.svg';
import {CheckboxFilter} from '@repo/ui/components/filter/CheckboxFilter';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';
import {StatusDropdown} from '@repo/ui/components/dropdown/StatusDropdown';
import {MemberActionMenu} from './MemberActionMenu';
import {
  ALL_USERS_MENU_ITEMS,
  REGULAR_MEMBER_MENU_ITEMS,
  type MemberMenuAction,
} from '@/constants/admin/admin-users';

interface AdminUsersTableViewProps {
  items?: MemberType[];
  activeTab: MemberTabType;
  selectedStatuses: MemberStatusKey[];
  onFilterChange: (labels: MemberStatusKey[]) => void;
  selectedIds: number[];
  onSelectAll: (checked: boolean) => void;
  onSelect: (id: number, checked: boolean) => void;
  onStatusChange: (memberId: number, status: MemberStatusKey) => void;
  onMenuAction: (action: MemberMenuAction, memberId: number) => void;
}

export const AdminUsersTableView = ({
  items = [],
  activeTab,
  selectedStatuses,
  onFilterChange,
  selectedIds,
  onSelectAll,
  onSelect,
  onStatusChange,
  onMenuAction,
}: AdminUsersTableViewProps) => {
  const isAllTab = activeTab === 'ALL';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <table className='w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {isAllTab && (
            <th className='w-12 px-3 py-4 text-center'>
              <Checkbox
                checked={isAllSelected}
                onChange={onSelectAll}
                className='border-0 bg-neutral-50'
              />
            </th>
          )}
          {MEMBER_COLUMNS.map((col) => {
            const isStatusColumn = col.key === 'status';
            return (
              <th
                key={col.key}
                className='text-body-l px-3 py-4 text-center align-middle font-semibold text-neutral-600'>
                <div className='flex items-center justify-center gap-2.5'>
                  <div>{isStatusColumn && !isAllTab ? '역할' : col.label}</div>
                  {isStatusColumn && isAllTab && (
                    <div ref={filterRef} className='relative flex items-center'>
                      <button
                        type='button'
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        aria-label='활동여부 필터 토글'
                        className='cursor-pointer'>
                        {selectedStatuses.length > 0 ? (
                          <FinishFilterIcon />
                        ) : (
                          <DefaultFilterIcon />
                        )}
                      </button>
                      {isFilterOpen && (
                        <div className='absolute top-full left-0 z-50 mt-2 w-27 -translate-x-3/4'>
                          <CheckboxFilter
                            options={MEMBER_STATUS_OPTIONS}
                            selected={selectedStatuses}
                            onChange={onFilterChange}
                            onClose={() => setIsFilterOpen(false)}
                            getLabel={(key) => MEMBER_STATUS_CONFIG[key].label}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((member) => (
          <tr
            key={member.memberId}
            className='text-body-l font-semibold text-neutral-600'>
            {isAllTab && (
              <td className='px-3 py-4 text-center'>
                <Checkbox
                  checked={selectedIds.includes(member.memberId)}
                  onChange={(checked) => onSelect(member.memberId, checked)}
                  className='border-0 bg-neutral-50'
                />
              </td>
            )}
            <td className='truncate px-3 py-4 text-center'>{member.name}</td>
            <td className='truncate px-3 py-4 text-center'>
              {member.generationMemberId}
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {member.position}
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {member.university}
            </td>
            <td className='truncate px-3 py-4 text-center'>
              {member.phoneNumber}
            </td>
            <td className='px-3 py-4'>
              <div className='flex items-center justify-center gap-2'>
                {isAllTab ? (
                  <StatusDropdown
                    key={`${member.memberId}-status`}
                    value={member.status as MemberStatusKey}
                    options={MEMBER_STATUS_OPTIONS}
                    config={MEMBER_STATUS_CONFIG}
                    onChange={(value) => onStatusChange(member.memberId, value)}
                    disabled={false}
                    ariaLabel='활동여부 선택'
                  />
                ) : (
                  <StatusDropdown
                    key={`${member.memberId}-role`}
                    value={member.role as MemberRoleKey}
                    options={MEMBER_ROLE_OPTIONS}
                    config={MEMBER_ROLE_CONFIG}
                    onChange={() => {
                      /** 역할 변경 핸들러 추후 구현 필요 */
                    }}
                    disabled={false}
                    ariaLabel='역할 선택'
                  />
                )}
                <MemberActionMenu
                  items={
                    isAllTab ? ALL_USERS_MENU_ITEMS : REGULAR_MEMBER_MENU_ITEMS
                  }
                  onAction={(action) => onMenuAction(action, member.memberId)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
