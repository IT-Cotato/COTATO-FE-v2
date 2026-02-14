'use client';

import {AdminUsersTableView} from '../_components/table/AdminUsersTableView';
import {ConfirmDeleteModal} from '../_components/table/ConfirmDeleteModal';
import {AllMembersActionBar} from '../_components/AllMembersActionBar';
import {ActiveMembersActionBar} from '../_components/ActiveMembersActionBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {
  MEMBER_STATUS_OPTIONS,
  MemberMenuAction,
  MemberStatusKey,
} from '@/constants/admin/admin-users';
import {MemberTabType, MemberType} from '@/schemas/admin/admin-users.schema';
import {MOCK_MEMBERS} from '@/mocks/admin/mock-admin-users';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

// TODO: API 연동 시 제거 또는 서버 요청 파라미터로 변경
const ITEMS_PER_PAGE = 10;

interface AdminUsersTableContainerProps {
  activeTab: MemberTabType;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
}

export const AdminUsersTableContainer = ({
  activeTab,
  keyword,
  onKeywordChange,
  onSearch,
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

  // TODO: API 연동 시 서버 데이터로 교체
  const [members, setMembers] = useState<MemberType[]>(MOCK_MEMBERS);

  const handleBatchStatusChange = (status: MemberStatusKey) => {
    setMembers((prev) =>
      prev.map((member) =>
        selectedIds.includes(member.memberId) ? {...member, status} : member
      )
    );
    setSelectedIds([]);
  };

  const handleStatusChange = (memberId: number, status: MemberStatusKey) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.memberId === memberId ? {...member, status} : member
      )
    );
  };

  /**
   * 페이지 변경 핸들러
   * @param page - 이동할 페이지 번호
   */
  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  /**
   * 멤버 상태 필터 변경 핸들러
   * @param labels - 선택된 상태 라벨 배열
   */
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
      ? members.filter((member) => member.status === 'APPROVED')
      : members;

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

  // 체크박스 선택 상태
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedItems.map((item) => item.memberId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  const hasSelection = selectedIds.length > 0;

  // 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberType | null>(null);

  /**
   * 메뉴 액션 핸들러
   * @param action - 수행할 액션
   * @param memberId - 대상 멤버 ID
   */
  const handleMenuAction = (action: MemberMenuAction, memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;

    if (action === 'delete') {
      setMemberToDelete(member);
      setIsDeleteModalOpen(true);
    }
  };

  /**
   * 삭제 확정 핸들러
   */
  const handleConfirmDelete = () => {
    if (!memberToDelete) return;

    // TODO: API 연동 시 서버 요청으로 변경
    setMembers((prev) =>
      prev.filter((m) => m.memberId !== memberToDelete.memberId)
    );
    setSelectedIds((prev) =>
      prev.filter((id) => id !== memberToDelete.memberId)
    );
    setIsDeleteModalOpen(false);
    setMemberToDelete(null);
  };

  // TODO: API 연동 시 서버 데이터로 교체
  const [generations, setGenerations] = useState<number[]>([10, 11, 12]);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    generations[0] ?? null
  );
  const handleAddGeneration = () => {
    const nextGen = generations.length > 0 ? Math.max(...generations) + 1 : 1;
    setGenerations((prev) => [...prev, nextGen]);
    setSelectedGeneration(nextGen);
  };

  return (
    <div className='flex flex-col gap-3.5'>
      {activeTab === 'ALL' && (
        <AllMembersActionBar
          hasSelection={hasSelection}
          onBatchStatusChange={handleBatchStatusChange}
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onSearch={onSearch}
          isLoading={isLoading}
        />
      )}
      {activeTab === 'ACTIVE' && (
        <ActiveMembersActionBar
          generations={generations}
          selectedGeneration={selectedGeneration}
          onGenerationChange={setSelectedGeneration}
          onAddGeneration={handleAddGeneration}
        />
      )}
      <AdminUsersTableView
        items={paginatedItems}
        allItems={filteredItems}
        activeTab={activeTab}
        selectedStatuses={selectedStatuses}
        onFilterChange={handleFilterChange}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
        onStatusChange={handleStatusChange}
        onMenuAction={handleMenuAction}
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

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={memberToDelete?.name ?? ''}
      />
    </div>
  );
};
