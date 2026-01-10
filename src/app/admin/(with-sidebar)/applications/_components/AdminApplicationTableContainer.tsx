import {useRouter, useSearchParams} from 'next/navigation';
import {useRef, useState} from 'react';
import {AdminApplicationPagination} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationPagination';
import {mockApplications} from '@/mocks/mock-application';
import {AdminApplicationResultFilter} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationResultFilter';
import {ApplicationResultType} from '@/schemas/admin/admin-application-type';
import {AdminApplicationTableView} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationTableView';

const ITEMS_PER_PAGE = 9;

export const AdminApplicationTableContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedResults, setSelectedResults] = useState<
    ApplicationResultType[]
  >([]);
  const [submitDateSortOrder, setSubmitDateSortOrder] = useState<
    'asc' | 'desc'
  >('desc');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const filterAreaRef = useRef<HTMLDivElement>(null);

  /**
   * 테이블 합격 여부 필터링, 최종 제출일자 기준 정렬 로직
   */

  const filteredApplications =
    selectedResults.length === 0
      ? mockApplications
      : mockApplications.filter((app) => selectedResults.includes(app.result));

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const aTime = new Date(a.submitDate).getTime();
    const bTime = new Date(b.submitDate).getTime();

    if (submitDateSortOrder === 'asc') {
      return aTime - bTime;
    }

    return bTime - aTime;
  });

  /**
   * 테이블 페이지네이션 컨트롤 로직
   */

  const pageParam = Number(searchParams.get('page'));

  const currentPage = pageParam > 0 ? pageParam : 1;

  const totalPages = Math.ceil(sortedApplications.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = sortedApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /**
   * 테이블 핸들러
   */

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    router.push(`?${params.toString()}`);
  };

  const handleSubmitDateSortToggle = () => {
    setSubmitDateSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const hasApplications = mockApplications.length > 0;

  return (
    <>
      {hasApplications ? (
        <>
          <div className='relative' ref={filterAreaRef}>
            <AdminApplicationTableView
              items={currentItems}
              submitDateSortOrder={submitDateSortOrder}
              isFilterActive={selectedResults.length > 0}
              onSubmitDateSortToggle={handleSubmitDateSortToggle}
              onFilterToggle={() => setIsFilterOpen((prev) => !prev)}
            />

            {isFilterOpen && (
              <aside className='absolute top-0 left-full mt-5.5 ml-2 w-33.25'>
                <AdminApplicationResultFilter
                  filterAreaRef={filterAreaRef}
                  selected={selectedResults}
                  onChange={setSelectedResults}
                  onClose={() => setIsFilterOpen(false)}
                />
              </aside>
            )}
          </div>

          <div className='flex w-full justify-center'>
            <div className='-ml-86'>
              <AdminApplicationPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handleUpdatePage}
              />
            </div>
          </div>
        </>
      ) : (
        <div className='flex w-full justify-center pt-56.5 text-body-l font-normal'>
          아직 지원자가 없습니다.
        </div>
      )}
    </>
  );
};
