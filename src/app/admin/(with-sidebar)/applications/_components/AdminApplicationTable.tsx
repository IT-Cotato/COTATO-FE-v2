import {AdminApplicationResultBadge} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationResultBadge';
import {APPLICATION_COLUMNS} from '@/constants/admin/admin-applications';

import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import {AdminApplicationPagination} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationPagination';
import {mockApplications} from '@/mocks/mock-application';

const ITEMS_PER_PAGE = 9;

export const AdminApplicationTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [nameSortOrder, setNameSortOrder] = useState<'asc' | 'desc'>('asc');

  const pageParam = Number(searchParams.get('page'));

  const currentPage = pageParam > 0 ? pageParam : 1;

  const totalPages = Math.ceil(mockApplications.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = mockApplications.slice(
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
  };

  const hasApplications = mockApplications.length > 0;
  return (
    <>
      {hasApplications ? (
        <>
          <div className='w-244 overflow-hidden'>
            <table className='border-collapse'>
              <thead className='bg-neutral-100'>
                <tr>
                  {APPLICATION_COLUMNS.map((col) => {
                    const isNameColumn = col.key === 'name';

                    return (
                      <th
                        key={col.key}
                        className='w-44 px-3 py-4 text-left text-body-l font-semibold text-neutral-600'>
                        <div
                          className={`flex items-center gap-2.5 ${
                            isNameColumn ? 'cursor-pointer select-none' : ''
                          }`}
                          onClick={
                            isNameColumn ? handleNameSortToggle : undefined
                          }>
                          {col.label}

                          {isNameColumn && (
                            <span className='text-body-s font-bold'>
                              {nameSortOrder === 'asc' && '↑'}
                              {nameSortOrder === 'desc' && '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {currentItems.map((app) => (
                  <tr key={app.id} className='text-body-l text-neutral-600'>
                    <td className='px-3 py-4'>{app.name}</td>
                    <td className='px-3 py-4'>{app.gender}</td>
                    <td className='px-3 py-4'>{app.part}</td>
                    <td className='px-3 py-4'>{app.school}</td>
                    <td className='px-3 py-4'>{app.phone}</td>
                    <td className='px-3 py-4'>
                      <AdminApplicationResultBadge result={app.result} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex w-244 justify-center'>
            <AdminApplicationPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={updatePage}
            />
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
