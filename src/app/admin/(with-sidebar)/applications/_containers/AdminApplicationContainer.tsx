'use client';

import {AdminApplicationInformation} from '@/app/admin/(with-sidebar)/applications/_components/info/AdminApplicationInformation';
import {AdminApplicationTableContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationTableContainer';
import {AdminApplicationTabContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationTabContainer';
import {useAdminApplications} from '@/hooks/queries/useAdminApplications';
import {GetAdminApplicationsParamsSchema} from '@/schemas/admin/admin-applications-schema';
import {useSearchParams} from 'next/navigation';

export const AdminApplicationContainer = () => {
  const searchParams = useSearchParams();

  const statusParams = searchParams.getAll('passViewStatuses');

  const rawParams = {
    generationId: Number(searchParams.get('generationId') ?? 13),
    partViewType: searchParams.get('part') ?? 'ALL',
    passViewStatuses: statusParams.length > 0 ? statusParams : ['ALL'],
    searchKeyword: searchParams.get('keyword') ?? undefined,
    page: Number(searchParams.get('page') ?? 1) - 1,
    sort: searchParams.getAll('sort') ?? 'asc',
    size: 9,
  };

  const filter = GetAdminApplicationsParamsSchema.parse(rawParams);

  const {data, isLoading, isFetching} = useAdminApplications(filter);

  const isInitialLoading = isLoading && !data;
  const isRefreshing = isFetching && !!data;

  return (
    <>
      <AdminApplicationInformation
        recruitmentPeriod={data?.data.recruitmentPeriodResponse}
        isLoading={isInitialLoading}
      />
      <AdminApplicationTabContainer
        summary={data?.data.summary}
        isLoading={isInitialLoading}
      />
      <AdminApplicationTableContainer
        applicants={data?.data.applicants}
        isLoading={isRefreshing}
      />
    </>
  );
};
