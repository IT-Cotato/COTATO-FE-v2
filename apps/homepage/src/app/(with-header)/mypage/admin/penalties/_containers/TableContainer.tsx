'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useAdminPenaltiesStore} from '@/store/useAdminPenaltiesStore';
import {FullSessionTable} from '@/app/(with-header)/mypage/admin/penalties/_components/table/FullSessionTable';
import {SpecificSessionTable} from '@/app/(with-header)/mypage/admin/penalties/_components/table/SpecificSessionTable';
import {useAllStatisticsQuery} from '@/hooks/queries/usePenalties.query';
import {SortDirection} from '@/types/mypage/admin/penalties/penalties.type';

export const TableContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortDirection =
    (searchParams.get('sort') as SortDirection) ?? undefined;
  const search = searchParams.get('keyword') ?? undefined;

  const {selectedGenerationNumber, selectedSessionType} =
    useAdminPenaltiesStore();

  const shouldFetchFull =
    selectedSessionType === 'FULL' && !!selectedGenerationNumber;

  const specificAttendanceList: {
    memberId: number;
    name: string;
    attendanceResult:
      | 'PRESENT'
      | 'LATE'
      | 'ABSENT'
      | 'UNAUTHORIZED_ABSENT'
      | 'NOT_YET';
    beerNetworkingParticipated: boolean;
    extraMinusPoint: number;
  }[] = [];

  const {data: allStatistics = [], isLoading: isAllStatisticsLoading} =
    useAllStatisticsQuery(
      shouldFetchFull ? (selectedGenerationNumber ?? 0) : 0,
      search,
      sortDirection
    );

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSort =
      (searchParams.get('sort') as SortDirection) ?? undefined;
    if (!currentSort) {
      params.set('sort', 'ASC');
    } else if (currentSort === 'ASC') {
      params.set('sort', 'DESC');
    } else if (currentSort === 'DESC') {
      params.delete('sort');
    }
    router.replace(`?${params.toString()}`, {scroll: false});
  };

  return (
    <>
      {selectedSessionType === 'FULL' ? (
        <FullSessionTable
          items={allStatistics}
          onSort={handleSort}
          sortedDirection={sortDirection}
        />
      ) : (
        <div className='flex gap-5'>
          <SpecificSessionTable items={specificAttendanceList} />
        </div>
      )}
    </>
  );
};
