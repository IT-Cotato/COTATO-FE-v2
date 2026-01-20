'use client';

import {AdminApplicationsTableContainer} from '@/app/admin/applications/_containers/AdminApplicationsTableContainer';
import {AdminApplicationsTabContainer} from '@/app/admin/applications/_containers/AdminApplicationsTabContainer';

import {GetAdminApplicationsParamsSchema} from '@/schemas/admin/admin-applications.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAdminApplicationsQuery} from '@/hooks/queries/useAdminApplications.query';
import {useEffect} from 'react';
import {AdminApplicationsInformation} from '@/app/admin/applications/_components/info/AdminApplicationsInformation';

export const AdminApplicationsContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const {data, isLoading, isFetching, isError, error} =
    useAdminApplicationsQuery(filter);

  useEffect(() => {
    if (isError) {
      alert(error.message);
      router.back();
    }
  }, [isError, error, router]);

  const isInitialLoading = isLoading && !data;
  const isRefreshing = isFetching && !!data;

  return (
    <>
      <AdminApplicationsInformation
        recruitmentPeriod={data?.data.recruitmentPeriodResponse}
        isLoading={isInitialLoading}
      />
      <AdminApplicationsTabContainer
        summary={data?.data.summary}
        isLoading={isInitialLoading}
      />
      <AdminApplicationsTableContainer
        applicants={data?.data.applicants}
        isLoading={isRefreshing}
      />
    </>
  );
};
