import {MemberType} from '@/schemas/admin/admin-members.schema';
import {formatPhoneNumber} from '@/utils/formatPhoneNumber';
import {
  MemberTabType,
  MEMBER_COLUMNS,
  MEMBER_ROLE_CONFIG,
  MEMBER_ROLE_OPTIONS,
  MEMBER_STATUS_CONFIG,
  MEMBER_STATUS_OPTIONS,
  MemberStatusKey,
  ALL_USERS_MENU_ITEMS,
  REGULAR_MEMBER_MENU_ITEMS,
  MEMBER_POSITION_LABEL,
  type MemberRoleKey,
  type MemberMenuAction,
  type MemberPositionKey,
} from '@/constants/admin/admin';
import {useRef, useState} from 'react';
import FinishFilterIcon from '@repo/ui/assets/icons/filter-finish.svg';
import DefaultFilterIcon from '@repo/ui/assets/icons/filter-default.svg';
import {CheckboxFilter} from '@repo/ui/components/filter/CheckboxFilter';
import {Checkbox} from '@repo/ui/components/checkbox/CheckBox';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';
import {StatusDropdown} from '@repo/ui/components/dropdown/StatusDropdown';
import {ActionMenu} from '@/app/(with-header)/mypage/admin/_components/ActionMenu';
import {SelectedMembersBar} from '@/app/(with-header)/mypage/admin/_components/SelectedMembersBar';
import clsx from 'clsx';

interface AdminUsersTableViewProps {
  items?: MemberType[];
  allItems: MemberType[];
  activeTab: MemberTabType;
  selectedStatuses: MemberStatusKey[];
  onFilterChange: (labels: MemberStatusKey[]) => void;
  selectedIds: number[];
  onSelectAll: (checked: boolean) => void;
  onSelect: (id: number, checked: boolean) => void;
  onStatusChange: (memberId: number, status: MemberStatusKey) => void;
  onRoleChange?: (memberId: number, role: MemberRoleKey) => void;
  onMenuAction: (action: MemberMenuAction, memberId: number) => void;
}

export const AdminUsersTableView = ({
  items = [],
  allItems,
  activeTab,
  selectedStatuses,
  onFilterChange,
  selectedIds,
  onSelectAll,
  onSelect,
  onStatusChange,
  onRoleChange,
  onMenuAction,
}: AdminUsersTableViewProps) => {
  const isAllTab = activeTab === 'ALL';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const isAllSelected =
    items.length > 0 &&
    items.every((item) => selectedIds.includes(item.memberId));

  return (
    <>
      <div className='w-full overflow-x-auto'>
        <table className='w-full table-fixed border-collapse [border-spacing:0] lg:min-w-277.5 lg:table-auto'>
          <thead className='bg-neutral-200'>
            <tr>
              {MEMBER_COLUMNS.map((col) => {
                const isStatusColumn = col.key === 'status';
                const isNameColumn = col.key === 'name';
                return (
                  <th
                    key={col.key}
                    className={clsx(
                      'text-body-m lg:text-body-l border-0 bg-neutral-200 py-3 text-center align-middle font-semibold text-neutral-600 lg:px-3 lg:py-4',
                      (col.key === 'school' || col.key === 'phone') &&
                        'hidden lg:table-cell'
                    )}>
                    {isNameColumn && isAllTab ? (
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
                      <div className='flex items-center justify-center gap-2.5'>
                        <div>
                          {isStatusColumn && !isAllTab ? '역할' : col.label}
                        </div>
                        {isStatusColumn && isAllTab && (
                          <div
                            ref={filterRef}
                            className='relative flex items-center'>
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
                                  getLabel={(key) =>
                                    MEMBER_STATUS_CONFIG[key].label
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((member) => (
              <tr
                key={member.memberId}
                className='text-body-m lg:text-body-l text-neutral-600'>
                <td className='truncate border-0 px-2.5 py-3 lg:px-3 lg:py-4'>
                  <div className='flex items-center gap-0.5 px-2'>
                    {isAllTab && (
                      <span className='shrink-0'>
                        <Checkbox
                          checked={selectedIds.includes(member.memberId)}
                          onChange={(checked) =>
                            onSelect(member.memberId, checked)
                          }
                          className='border-0 bg-neutral-50'
                        />
                      </span>
                    )}
                    <span className='flex-1 text-center'>{member.name}</span>
                  </div>
                </td>
                <td className='truncate border-0 py-3 text-center lg:px-3 lg:py-4'>
                  {member.passedGenerationNumber}기
                </td>
                <td className='truncate border-0 py-3 text-center lg:px-3 lg:py-4'>
                  {MEMBER_POSITION_LABEL[
                    member.position as MemberPositionKey
                  ] ?? member.position}
                </td>
                <td className='hidden truncate border-0 py-3 text-center lg:table-cell lg:px-3 lg:py-4'>
                  {member.university}
                </td>
                <td className='hidden truncate border-0 py-3 text-center lg:table-cell lg:px-3 lg:py-4'>
                  {formatPhoneNumber(member.phoneNumber)}
                </td>
                <td className='border-0 px-2.5 py-3 lg:px-3 lg:py-4'>
                  <div className='flex items-center justify-center lg:gap-2'>
                    {isAllTab ? (
                      <StatusDropdown
                        key={`${member.memberId}-status`}
                        value={member.status as MemberStatusKey}
                        options={MEMBER_STATUS_OPTIONS}
                        config={MEMBER_STATUS_CONFIG}
                        onChange={(value) =>
                          onStatusChange(member.memberId, value)
                        }
                        disabled={false}
                        ariaLabel='활동여부 선택'
                        wrapperClassName='w-[61px] lg:w-18.75'
                      />
                    ) : (
                      <StatusDropdown
                        key={`${member.memberId}-role`}
                        value={member.role as MemberRoleKey}
                        options={MEMBER_ROLE_OPTIONS}
                        config={MEMBER_ROLE_CONFIG}
                        onChange={(value) =>
                          onRoleChange?.(member.memberId, value)
                        }
                        disabled={false}
                        ariaLabel='역할 선택'
                        wrapperClassName='w-[61px] lg:w-18.75'
                      />
                    )}
                    <ActionMenu
                      items={
                        isAllTab
                          ? ALL_USERS_MENU_ITEMS
                          : REGULAR_MEMBER_MENU_ITEMS
                      }
                      onAction={(action) =>
                        onMenuAction(action, member.memberId)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAllTab && (
        <SelectedMembersBar
          selectedIds={selectedIds}
          allItems={allItems}
          onRemove={(id) => onSelect(id, false)}
        />
      )}
    </>
  );
};
