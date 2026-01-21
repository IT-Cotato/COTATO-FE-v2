import {useRouter, useSearchParams} from 'next/navigation';
import {useRef, useState} from 'react';
import {AdminApplicationsPagination} from '@/app/admin/applications/_components/table/AdminApplicationsPagination';
import {AdminApplicationsResultFilter} from '@/app/admin/applications/_components/table/AdminApplicationsResultFilter';
import {AdminApplicationsTableView} from '@/app/admin/applications/_components/table/AdminApplicationsTableView';
import {
  ApplicationResultLabel,
  RESULT_LABEL_MAP,
  RESULT_OPTIONS,
  RESULT_VALUE_MAP,
} from '@/constants/admin/admin-applications';
import {ApplicantsPageType} from '@/schemas/admin/admin-applications.schema';
import {Spinner} from '@/components/ui/Spinner';
import {useUpdateApplicationPassStatus} from '@/hooks/mutations/useAdminApplications.mutation';

interface AdminApplicationsTableContainerProps {
  applicants?: ApplicantsPageType;
  isLoading: boolean;
}

export const AdminApplicationsTableContainer = ({
  applicants,
  isLoading,
}: AdminApplicationsTableContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const passViewStatuses = searchParams.getAll('passViewStatuses');
  const sortParam = searchParams.get('sort');
  const submitDateSortOrder =
    sortParam === 'asc' || sortParam?.endsWith(',asc') ? 'asc' : 'desc';
  const {mutate: updatePassStatus, isPending: isUpdatingPassStatus} =
    useUpdateApplicationPassStatus();

  const selectedResults: ApplicationResultLabel[] =
    passViewStatuses.length === 0 || passViewStatuses.includes('ALL')
      ? []
      : passViewStatuses
          .map(
            (status) =>
              RESULT_LABEL_MAP[status as keyof typeof RESULT_LABEL_MAP]
          )
          .filter(Boolean);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const filterAreaRef = useRef<HTMLDivElement>(null);

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    router.push(`?${params.toString()}`);
  };

  const handleSubmitDateSortToggle = () => {
    const params = new URLSearchParams(searchParams.toString());

    const currentSort = searchParams.get('sort');

    const currentOrder: 'asc' | 'desc' =
      currentSort === 'asc' || currentSort?.endsWith(',asc') ? 'asc' : 'desc';

    const next: 'asc' | 'desc' = currentOrder === 'desc' ? 'asc' : 'desc';

    params.set('sort', `submittedAt,${next}`);
    params.set('page', '1');

    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleResultFilterChange = (labels: ApplicationResultLabel[]) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('passViewStatuses');

    if (labels.length === 0 || labels.length === RESULT_OPTIONS.length) {
      params.append('passViewStatuses', 'ALL');
    } else {
      labels.forEach((label) => {
        params.append('passViewStatuses', RESULT_VALUE_MAP[label]);
      });
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const isFilterActive =
    passViewStatuses.length > 0 && !passViewStatuses.includes('ALL');
  const hasData = applicants && applicants.content.length > 0;
  const isEmpty = !isLoading && applicants && applicants.content.length === 0;

  return (
    <>
      {hasData && (
        <>
          <div className='relative' ref={filterAreaRef}>
            {/* 쿼리 갱신 로딩 */}
            {isLoading && (
              <div className='absolute inset-0 z-10 flex items-center justify-center'>
                <Spinner size='lg' />
              </div>
            )}

            <AdminApplicationsTableView
              items={applicants.content}
              submitDateSortOrder={submitDateSortOrder}
              isFilterActive={isFilterActive}
              onSubmitDateSortToggle={handleSubmitDateSortToggle}
              onFilterToggle={() => setIsFilterOpen((prev) => !prev)}
              onChangePassStatus={(applicationId, passStatus) =>
                updatePassStatus({
                  applicationId,
                  body: {passStatus},
                })
              }
              isUpdating={isUpdatingPassStatus}
            />

            {isFilterOpen && !isLoading && (
              <aside className='absolute top-0 left-full mt-5.5 ml-2 w-33.25'>
                <AdminApplicationsResultFilter
                  filterAreaRef={filterAreaRef}
                  selected={selectedResults}
                  onChange={handleResultFilterChange}
                  onClose={() => setIsFilterOpen(false)}
                />
              </aside>
            )}
          </div>

          <div className='flex w-full justify-center'>
            <div className='-ml-86'>
              <AdminApplicationsPagination
                currentPage={applicants.pageInfo.currentPage}
                totalPages={applicants.pageInfo.totalPages}
                onPageChange={handleUpdatePage}
                disabled={isLoading}
              />
            </div>
          </div>
        </>
      )}

      {/* 로딩 끝 + 데이터 없음 */}
      {isEmpty && (
        <div className='flex w-full justify-center pt-56.5 text-body-l font-normal'>
          아직 지원자가 없습니다.
        </div>
      )}
    </>
  );
};
