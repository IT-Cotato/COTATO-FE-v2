import {
  APPLICATION_COLUMNS,
  ApplicationResultLabel,
  APPLICATIONS_PART_TABS,
} from '@/constants/admin/admin-applications';
import {ROUTES} from '@/constants/routes';
import DefaultFilterIcon from '@/assets/icons/filter-default.svg';
import FinishFilterIcon from '@/assets/icons/filter-finish.svg';
import DownArrowIcon from '@/assets/arrow/down-arrow.svg';

import clsx from 'clsx';
import {
  ApplicantType,
  ApplicationPassStatus,
} from '@/schemas/admin/admin-applications.schema';
import {AdminApplicationsResultDropdown} from '@/app/admin/(with-sidebar)/applications/_components/table/AdminApplicationsResultDropdown';
import {formatKoreanDate} from '@/utils/formatDate';
import {AdminApplicationsResultFilter} from '@/app/admin/(with-sidebar)/applications/_components/table/AdminApplicationsResultFilter';
import {useRef} from 'react';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface AdminApplicationsTableViewProps {
  items?: ApplicantType[];
  generationId: string;
  submitDateSortOrder: 'asc' | 'desc';
  isFilterActive: boolean;
  isFilterOpen: boolean;
  selectedResults: ApplicationResultLabel[];
  onSubmitDateSortToggle: () => void;
  onFilterToggle: () => void;
  onFilterChange: (labels: ApplicationResultLabel[]) => void;
  onFilterClose: () => void;
  onChangePassStatus: (
    applicationId: number,
    passStatus: ApplicationPassStatus
  ) => void;
  isUpdating?: boolean;
}

export const AdminApplicationsTableView = ({
  items,
  generationId,
  submitDateSortOrder,
  isFilterActive,
  isFilterOpen,
  selectedResults,
  onSubmitDateSortToggle,
  onFilterToggle,
  onFilterChange,
  onFilterClose,
  onChangePassStatus,
  isUpdating,
}: AdminApplicationsTableViewProps) => {
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => {
    if (isFilterOpen) onFilterClose();
  });

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
                className='text-body-l px-3 py-4 text-center align-middle font-semibold text-neutral-600'>
                <div className='flex items-center justify-center gap-2.5'>
                  <span>{col.label}</span>

                  {isResultColumn && (
                    <div ref={filterRef} className='relative'>
                      <button
                        type='button'
                        onClick={onFilterToggle}
                        aria-label='합격 여부 필터 열기'
                        aria-expanded={isFilterOpen}
                        className='cursor-pointer'>
                        {isFilterActive ? (
                          <FinishFilterIcon />
                        ) : (
                          <DefaultFilterIcon />
                        )}
                      </button>

                      {isFilterOpen && (
                        <div className='absolute top-full left-0 z-50 mt-2 w-27 -translate-x-3/4'>
                          <AdminApplicationsResultFilter
                            selected={selectedResults}
                            onChange={onFilterChange}
                            onClose={onFilterClose}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {isSubmitDateColumn && (
                    <button
                      type='button'
                      onClick={onSubmitDateSortToggle}
                      className='cursor-pointer'
                      aria-label='제출일자 정렬 변경'
                      aria-pressed={submitDateSortOrder === 'asc'}>
                      <DownArrowIcon
                        className={clsx(
                          'transition-transform duration-200 ease-in-out',
                          submitDateSortOrder === 'asc' && 'rotate-180'
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
            className='text-body-l font-semibold text-neutral-600'>
            <td className='flex items-center justify-center px-3 py-4'>
              <a
                href={`${ROUTES.ADMIN_APPLICATIONS}/${app.applicationId}?generationId=${generationId}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${app.name} 지원서 상세 보기`}
                className='cursor-pointer hover:border-b'>
                {app.name}
              </a>
            </td>
            <td className='truncate px-3 py-4'>
              <p className='text-center'>
                {APPLICATIONS_PART_TABS.find(
                  (tab) => tab.value === app.applicationPartType
                )?.label ?? '-'}
              </p>
            </td>
            <td className='truncate px-3 py-4'>
              <p className='text-center'>{app.university}</p>
            </td>
            <td className='truncate px-3 py-4'>
              <p className='text-center'>{app.phoneNumber}</p>
            </td>
            <td className='truncate px-3 py-4'>
              <p className='text-center'>{formatKoreanDate(app.submittedAt)}</p>
            </td>
            <td className='px-3 py-4'>
              <div className='flex items-center justify-center'>
                <AdminApplicationsResultDropdown
                  result={app.passStatus}
                  disabled={isUpdating}
                  onChange={(nextStatus) =>
                    onChangePassStatus(app.applicationId, nextStatus)
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
