'use client';

import {AdminApplicationsTableContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationsTableContainer';
import {AdminApplicationsTabContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationsTabContainer';

import {GetAdminApplicationsParamsSchema} from '@/schemas/admin/admin-applications.schema';
import {useSearchParams} from 'next/navigation';
import {useAdminApplicationsQuery} from '@/hooks/queries/useAdminApplications.query';
import {useEffect} from 'react';
import {AdminApplicationsInformation} from '@/app/admin/(with-sidebar)/applications/_components/info/AdminApplicationsInformation';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useGenerationStore} from '@/store/useGenerationStore';
import {useAdminGenerationsQuery} from '@/hooks/queries/useAdminGeneration.query';

export const AdminApplicationsContainer = () => {
  const searchParams = useSearchParams();

  /** 기수 목록 조회 */
  const {data: generationsData} = useAdminGenerationsQuery();
  const {setGenerations, generations} = useGenerationStore();
  const generationList = generations.map((g) => String(g.generationId));
  const currentGeneration =
    searchParams.get('generationId') ?? generationList[0];

  /** Hook: generations store 업데이트 */
  useEffect(() => {
    if (!generationsData) return;
    setGenerations(generationsData.data);
  }, [generationsData, setGenerations]);

  /** 쿼리 파라미터를 기반으로 한 지원서 목록 데이터 조회 */
  const statusParams = searchParams.getAll('passViewStatuses');
  const sortParam = searchParams.get('sort');
  const sortDirection = sortParam?.split(',')[1] ?? 'desc';

  const rawParams = {
    generationId: Number(currentGeneration ?? 13),
    partViewType: searchParams.get('part') ?? 'ALL',
    passViewStatuses: statusParams.length > 0 ? statusParams : ['ALL'],
    searchKeyword: searchParams.get('keyword') ?? undefined,
    page: Number(searchParams.get('page') ?? 1) - 1,
    sort: `submittedAt,${sortDirection}`,
    size: 9,
  };

  const filter = GetAdminApplicationsParamsSchema.parse(rawParams);

  const {data, isLoading, isFetching} = useAdminApplicationsQuery(filter);

  if (!currentGeneration) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <p className='text-neutral-500'>등록된 기수 정보가 없습니다.</p>
      </div>
    );
  }

  const isInitialLoading = isLoading && !data;
  const isRefreshing = isFetching && !!data;

  if (isInitialLoading) {
    return (
      <div className='flex h-[calc(100vh-200px)] items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-7.25'>
      <AdminApplicationsInformation
        generation={currentGeneration}
        generations={generationList}
        recruitmentPeriod={data?.data.recruitmentPeriodResponse}
        isLoading={isInitialLoading}
      />
      <div className='flex flex-col gap-4'>
        <AdminApplicationsTabContainer
          summary={data?.data.summary}
          isLoading={isInitialLoading}
        />
        <AdminApplicationsTableContainer
          generationId={currentGeneration}
          applicants={data?.data.applicants}
          isLoading={isRefreshing}
        />
      </div>
    </div>
  );
};
