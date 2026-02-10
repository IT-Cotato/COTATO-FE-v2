'use client';

import {AdminUsersTableView} from '../_components/table/AdminUsersTableView';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {
  MEMBER_STATUS_OPTIONS,
  MemberStatusKey,
} from '@/constants/admin/admin-users';
import {MemberTabType} from '@/schemas/admin/admin-users.schema';
import {MOCK_MEMBERS} from '@/mocks/admin/mock-admin-users';
import {useRouter, useSearchParams} from 'next/navigation';

// TODO: API 연동 시 제거 또는 서버 요청 파라미터로 변경
const ITEMS_PER_PAGE = 10;

interface AdminUsersTableContainerProps {
  activeTab: MemberTabType;
}

export const AdminUsersTableContainer = ({
  activeTab,
}: AdminUsersTableContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 필터 상태 가져오기
  const statusParams = searchParams.getAll('status');
  const selectedStatuses: MemberStatusKey[] =
    statusParams.length === 0 || statusParams.includes('ALL')
      ? []
      : (statusParams.filter((s) =>
          MEMBER_STATUS_OPTIONS.includes(s as MemberStatusKey)
        ) as MemberStatusKey[]);

  // URL에서 페이지 상태 가져오기
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;
  const isLoading = false;

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (labels: MemberStatusKey[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('status');

    if (labels.length === 0 || labels.length === MEMBER_STATUS_OPTIONS.length) {
      params.append('status', 'ALL');
    } else {
      labels.forEach((label) => {
        params.append('status', label);
      });
    }
    params.set('page', '1'); // 필터 변경 시 1페이지로 초기화
    router.push(`?${params.toString()}`, {scroll: false});
  };

  // TODO: API 연동 시 서버 사이드 필터링으로 교체 필요
  const baseItems =
    activeTab === 'ACTIVE'
      ? MOCK_MEMBERS.filter((member) => member.status === 'APPROVED')
      : MOCK_MEMBERS;

  const filteredItems =
    selectedStatuses.length === 0
      ? baseItems
      : baseItems.filter((member) =>
          selectedStatuses.includes(member.status as MemberStatusKey)
        );

  // TODO: API 연동 시 응답 데이터의 totalPages 사용 및 slice 로직 제거
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <AdminUsersTableView
        items={paginatedItems}
        activeTab={activeTab}
        selectedStatuses={selectedStatuses}
        onFilterChange={handleFilterChange}
      />
      <div className='flex w-full justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleUpdatePage}
          disabled={isLoading}
          variant='admin'
        />
      </div>
    </>
  );
};
