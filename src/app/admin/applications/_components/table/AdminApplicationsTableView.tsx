import {
  APPLICATION_COLUMNS,
  PART_TABS,
} from '@/constants/admin/admin-applications';
import {ROUTES} from '@/constants/routes';
import DefaultFilterIcon from '@/assets/icons/filter-default.svg';
import FinishFilterIcon from '@/assets/icons/filter-finish.svg';
import DownArrowIcon from '@/assets/arrow/down-arrow.svg';

import clsx from 'clsx';
import {ApplicantType} from '@/schemas/admin/admin-applications.schema';
import {AdminApplicationsResultDropdown} from '@/app/admin/applications/_components/table/AdminApplicationsResultDropdown';
import {formatKoreanDate} from '@/utils/formatDate';

interface AdminApplicationsTableViewProps {
  items?: ApplicantType[];
  submitDateSortOrder: 'asc' | 'desc';
  isFilterActive: boolean;
  onSubmitDateSortToggle: () => void;
  onFilterToggle: () => void;
}

export const AdminApplicationsTableView = ({
  items,
  submitDateSortOrder,
  isFilterActive,
  onSubmitDateSortToggle,
  onFilterToggle,
}: AdminApplicationsTableViewProps) => {
  return (
    <table className='w-full table-fixed border-collapse'>
      <thead className='bg-neutral-200'>
        <tr>
          {APPLICATION_COLUMNS.map((col) => {
            const isSubmitDateColumn = col.key === 'submitDate';

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

                  {isSubmitDateColumn && (
                    <button
                      type='button'
                      onClick={onSubmitDateSortToggle}
                      className='cursor-pointer'>
                      <DownArrowIcon
                        className={clsx(
                          'transition-transform duration-200 ease-in-out',
                          {
                            'rotate-180': submitDateSortOrder === 'asc',
                            'rotate-0': submitDateSortOrder === 'desc',
                          }
                        )}
                      />
                    </button>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {items?.map((app) => (
          <tr
            key={app.applicationId}
            className='bg-white text-body-l text-neutral-600'>
            <td className='px-3 py-4'>
              <a
                href={`${ROUTES.ADMIN_APPLICATIONS}/${app.applicationId}`}
                target='_blank'
                rel='noopener noreferrer'
                className='cursor-pointer hover:border-b'>
                {app.name}
              </a>
            </td>
            <td className='truncate px-3 py-4'>
              {PART_TABS.find((tab) => tab.value === app.applicationPartType)
                ?.label ?? '-'}
            </td>
            <td className='truncate px-3 py-4'>{app.university}</td>
            <td className='truncate px-3 py-4'>{app.phoneNumber}</td>
            <td className='truncate px-3 py-4'>
              {formatKoreanDate(app.submittedAt)}
            </td>
            <td className='px-3 py-4'>
              <AdminApplicationsResultDropdown result={app.passStatus} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
