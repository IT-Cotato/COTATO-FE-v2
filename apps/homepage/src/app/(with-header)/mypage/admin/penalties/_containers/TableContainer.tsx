'use client';

import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAdminPenaltiesStore} from '@/store/useAdminPenaltiesStore';
import {FullSessionTable} from '@/app/(with-header)/mypage/admin/penalties/_components/table/FullSessionTable';
import {SpecificSessionTable} from '@/app/(with-header)/mypage/admin/penalties/_components/table/SpecificSessionTable';
import {
  useAllStatisticsQuery,
  useSessionDetailQuery,
} from '@/hooks/queries/usePenalties.query';
import {SortDirection} from '@/types/mypage/admin/penalties/penalties.type';
import {
  usePatchBeerNetworkingMutation,
  usePatchExtraMinusPointMutation,
} from '@/hooks/mutations/usePenalties.mutation';

export const TableContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawSort = searchParams.get('sort');
  const sortDirection: SortDirection | undefined =
    rawSort === 'ASC' || rawSort === 'DESC' ? rawSort : undefined;
  const search = searchParams.get('keyword') ?? undefined;

  const {selectedGenerationNumber, selectedSessionType, sessionId} =
    useAdminPenaltiesStore();

  const shouldFetchFull =
    selectedSessionType === 'FULL' && !!selectedGenerationNumber;
  const shouldFetchSpecific = selectedSessionType === 'SPECIFIC' && !!sessionId;

  const {data: allStatistics = [], isLoading: isAllStatisticsLoading} =
    useAllStatisticsQuery(
      shouldFetchFull ? (selectedGenerationNumber ?? 0) : 0,
      search,
      sortDirection
    );

  const {data: sessionDetail, isLoading: isSessionDetailLoading} =
    useSessionDetailQuery(shouldFetchSpecific ? (sessionId ?? 0) : 0, search);

  const {
    mutate: updateBeerNetworkingChip,
    isPending: isUpdatingBeerNetworkingChip,
  } = usePatchBeerNetworkingMutation();

  const {mutate: updateExtraMinusPoint} = usePatchExtraMinusPointMutation();

  const handleClickBeerNetworkingChip = (
    memberId: number,
    participated: boolean
  ) => {
    if (!sessionId) return;
    updateBeerNetworkingChip({
      sessionId,
      memberId,
      participated,
    });
  };

  const handleChangeExtraMinusPoint = (
    memberId: number,
    extraMinusPoint: number
  ) => {
    if (!sessionId) return;
    updateExtraMinusPoint({
      sessionId,
      memberId,
      extraMinusPoint,
    });
  };

  const isLoading =
    (selectedSessionType === 'FULL' && isAllStatisticsLoading) ||
    (selectedSessionType === 'SPECIFIC' && isSessionDetailLoading);

  if (isLoading) {
    return (
      <div
        className='flex min-h-100 items-center justify-center'
        role='status'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
        <span className='sr-only'>데이터를 불러오는 중입니다.</span>
      </div>
    );
  }

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSortParam = searchParams.get('sort');
    const currentSort: SortDirection | undefined =
      currentSortParam === 'ASC' || currentSortParam === 'DESC'
        ? currentSortParam
        : undefined;
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
          <SpecificSessionTable
            items={sessionDetail?.members ?? []}
            onClickBeerNetworkingChip={handleClickBeerNetworkingChip}
            isUpdatingBeerNetworkingChip={isUpdatingBeerNetworkingChip}
            onChangeExtraMinusPoint={handleChangeExtraMinusPoint}
          />
        </div>
      )}
    </>
  );
};
