import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import {AdminApplicationPagination} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationPagination';
import {mockApplications} from '@/mocks/mock-application';
import {AdminApplicationResultFilter} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationResultFilter';
import {ApplicationResultType} from '@/schemas/admin/admin-application-type';
import {AdminApplicationTableView} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationTableView';

const ITEMS_PER_PAGE = 9;

export const AdminApplicationTableContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [nameSortOrder, setNameSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedResults, setSelectedResults] = useState<
    ApplicationResultType[]
  >([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filteredApplications =
    selectedResults.length === 0
      ? mockApplications
      : mockApplications.filter((app) => selectedResults.includes(app.result));

  const pageParam = Number(searchParams.get('page'));

  const currentPage = pageParam > 0 ? pageParam : 1;

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleNameSortToggle = () => {
    setNameSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    // TODO: 이름 내림차순 / 오름차순으로 정렬 API 호출 혹은 정렬 로직 작성
  };

  // TODO: 합격, 예비합격, 불합격, 평가전 필터링 컴포넌트 및 로직 추가

  const hasApplications = mockApplications.length > 0;

  return (
    <>
      {hasApplications ? (
        <>
          <div className='relative'>
            <AdminApplicationTableView
              items={currentItems}
              nameSortOrder={nameSortOrder}
              isFilterActive={selectedResults.length > 0}
              onNameSortToggle={handleNameSortToggle}
              onFilterToggle={() => setIsFilterOpen((prev) => !prev)}
            />

            {isFilterOpen && (
              <aside className='absolute top-0 left-full mt-5.5 ml-2 w-33.25'>
                <AdminApplicationResultFilter
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
                onPageChange={updatePage}
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
