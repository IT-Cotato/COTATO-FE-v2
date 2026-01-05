import {AdminApplicationResultDropdown} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationResultDropdown';
import {APPLICATION_COLUMNS} from '@/constants/admin/admin-applications';
import {ROUTES} from '@/constants/routes';
import DefaultFilterIcon from '@/assets/icons/filter-default.svg';
import FinishFilterIcon from '@/assets/icons/filter-finish.svg';
import DownArrowIcon from '@/assets/arrow/down-arrow.svg';
import MinusArrowIcon from '@/assets/arrow/minus-arrow.svg';
import {mockApplications} from '@/mocks/mock-application';
import {PART_TABS} from '@/constants/admin/admin-application-form';

interface AdminApplicationTableViewProps {
  items: typeof mockApplications;
  nameSortOrder: 'asc' | 'desc' | 'default';
  isFilterActive: boolean;
  onNameSortToggle: () => void;
  onFilterToggle: () => void;
}

export const AdminApplicationTableView = ({
  items,
  nameSortOrder,
  isFilterActive,
  onNameSortToggle,
  onFilterToggle,
}: AdminApplicationTableViewProps) => {
  return (
    <table className='w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {APPLICATION_COLUMNS.map((col) => {
            const isNameColumn = col.key === 'name';
            const isResultColumn = col.key === 'result';

            return (
              <th
                key={col.key}
                className='px-3 py-4 text-left text-body-l font-semibold text-neutral-600'>
                <div className='flex items-center gap-2.5'>
                  <span>{col.label}</span>

                  {isResultColumn && (
                    <button
                      type='button'
                      onClick={onFilterToggle}
                      className='cursor-pointer'>
                      {isFilterActive ? (
                        <FinishFilterIcon />
                      ) : (
                        <DefaultFilterIcon />
                      )}
                    </button>
                  )}

                  {isNameColumn && (
                    <button
                      type='button'
                      onClick={onNameSortToggle}
                      className='cursor-pointer'>
                      {nameSortOrder === 'default' && <MinusArrowIcon />}
                      {nameSortOrder === 'asc' && (
                        <DownArrowIcon className='rotate-180' />
                      )}
                      {nameSortOrder === 'desc' && <DownArrowIcon />}
                    </button>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {items.map((app) => (
          <tr key={app.id} className='bg-white text-body-l text-neutral-600'>
            <td className='px-3 py-4'>
              <a
                href={`${ROUTES.ADMIN_APPLICATION}/${app.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='cursor-pointer hover:border-b'>
                {app.name}
              </a>
            </td>
            <td className='truncate px-3 py-4'>{app.gender}</td>
            <td className='truncate px-3 py-4'>
              {PART_TABS.find((tab) => tab.value === app.part)?.label ?? '-'}
            </td>
            <td className='truncate px-3 py-4'>{app.school}</td>
            <td className='truncate px-3 py-4'>{app.phone}</td>
            <td className='px-3 py-4'>
              <AdminApplicationResultDropdown result={app.result} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
