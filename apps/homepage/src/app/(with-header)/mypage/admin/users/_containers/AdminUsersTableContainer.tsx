'use client';

import {AdminUsersTableView} from '@/app/(with-header)/mypage/admin/users/_components/table/AdminUsersTableView';
import {ConfirmDeleteModal} from '@/app/(with-header)/mypage/admin/users/_components/table/ConfirmDeleteModal';
import {MemberDetailModal} from '@/app/(with-header)/mypage/admin/users/_components/table/MemberDetailModal';
import {AllMembersActionBar} from '@/app/(with-header)/mypage/admin/users/_components/AllMembersActionBar';
import {ActiveMembersActionBar} from '@/app/(with-header)/mypage/admin/users/_components/ActiveMembersActionBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {
  MEMBER_STATUS_OPTIONS,
  MemberMenuAction,
  MemberStatusKey,
} from '@/constants/admin/admin';
import {MemberTabType} from '@/schemas/admin/admin.type';
import {AdminMemberType} from '@/schemas/admin/admin-members.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useMemo, useState} from 'react';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {useAdminMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {
  useDeleteAdminMembers,
  usePatchAdminMembersStatus,
} from '@/hooks/mutations/useAdminMembers.mutation';

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

  // URL에서 필터/페이지/검색어 상태 가져오기
  const statusParams = searchParams.getAll('status');
  const selectedStatuses: MemberStatusKey[] =
    statusParams.length === 0 || statusParams.includes('ALL')
      ? []
      : (statusParams.filter((s) =>
          MEMBER_STATUS_OPTIONS.includes(s as MemberStatusKey)
        ) as MemberStatusKey[]);

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;
  const searchParam = searchParams.get('search') ?? undefined;

  // 체크박스 선택 상태
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {data, isLoading} = useAdminMembersQuery({
    search: searchParam,
    statuses:
      activeTab === 'ACTIVE'
        ? ['APPROVED']
        : selectedStatuses.length > 0
          ? selectedStatuses
          : undefined,
    page: currentPage - 1,
    size: 10,
  });

  const members = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const {mutate: patchStatus} = usePatchAdminMembersStatus();
  const {mutate: deleteMember} = useDeleteAdminMembers();

  const handleBatchStatusChange = (status: MemberStatusKey) => {
    patchStatus({memberIds: selectedIds, status});
    setSelectedIds([]);
  };

  const handleStatusChange = (memberId: number, status: MemberStatusKey) => {
    patchStatus({memberIds: [memberId], status});
  };

  /**
   * 페이지 변경 핸들러
   */
  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  /**
   * 멤버 상태 필터 변경 핸들러
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
    params.set('page', '1');
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(members.map((item) => item.memberId));
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
  const [memberToDelete, setMemberToDelete] = useState<AdminMemberType | null>(
    null
  );

  // 상세/수정 모달 상태
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDetailReadonly, setIsDetailReadonly] = useState(true);
  const [selectedMember, setSelectedMember] = useState<AdminMemberType | null>(
    null
  );

  /**
   * 메뉴 액션 핸들러
   */
  const handleMenuAction = (action: MemberMenuAction, memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;

    if (action === 'delete') {
      setMemberToDelete(member);
      setIsDeleteModalOpen(true);
    } else if (action === 'detail') {
      setSelectedMember(member);
      setIsDetailReadonly(true);
      setIsDetailModalOpen(true);
    } else if (action === 'edit') {
      setSelectedMember(member);
      setIsDetailReadonly(false);
      setIsDetailModalOpen(true);
    }
  };

  const handleSaveMember = () => {
    // TODO: 회원 정보 수정 API 연동 시 구현
    setIsDetailModalOpen(false);
  };

  /**
   * 삭제 확정 핸들러
   */
  const handleConfirmDelete = () => {
    if (!memberToDelete) return;

    deleteMember(
      {memberIds: [memberToDelete.memberId]},
      {
        onSuccess: () => {
          setSelectedIds((prev) =>
            prev.filter((id) => id !== memberToDelete.memberId)
          );
          setIsDeleteModalOpen(false);
          setMemberToDelete(null);
        },
      }
    );
  };

  const {data: generationList} = useGenerationQuery();
  const generations = useMemo(
    () => generationList?.map((g) => g.generationId) ?? [],
    [generationList]
  );
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (generations.length > 0 && selectedGeneration === null) {
      setSelectedGeneration(generations[0]);
    }
  }, [generations, selectedGeneration]);

  const handleAddGeneration = (generationId: number) => {
    setSelectedGeneration(generationId);
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
        items={members}
        allItems={members}
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

      <MemberDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSave={handleSaveMember}
        member={selectedMember}
        readonly={isDetailReadonly}
      />
    </div>
  );
};
