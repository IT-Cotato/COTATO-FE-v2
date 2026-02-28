'use client';

import {AdminUsersTableView} from '@/app/(with-header)/mypage/admin/users/_components/table/AdminUsersTableView';
import {ConfirmDeleteModal} from '@/app/(with-header)/mypage/admin/users/_components/table/ConfirmDeleteModal';
import {MemberDetailModal} from '@/app/(with-header)/mypage/admin/users/_components/table/MemberDetailModal';
import {ActiveMembersActionBar} from '@/app/(with-header)/mypage/admin/users/_components/ActiveMembersActionBar';
import {SearchBar} from '@/app/(with-header)/mypage/admin/_components/SearchBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {useActiveMembersTable} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersTable';

export const ActiveMembersTableContainer = () => {
  const {
    members,
    isLoading,
    keyword,
    setKeyword,
    handleSearch,
    currentPage,
    generations,
    selectedGeneration,
    setSelectedGeneration,
    handleAddGeneration,
    handleUpdatePage,
    totalPages,
    isDeleteModalOpen,
    memberToDelete,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    isDetailModalOpen,
    selectedMember,
    setIsDetailModalOpen,
    handleMenuAction,
    handleSaveMember,
    handleRoleChange,
  } = useActiveMembersTable();

  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex items-end gap-6'>
        <SearchBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
        />
      </div>

      <ActiveMembersActionBar
        generations={generations}
        selectedGeneration={selectedGeneration}
        onGenerationChange={setSelectedGeneration}
        onAddGeneration={handleAddGeneration}
      />

      {!isLoading && members.length === 0 ? (
        <div className='text-body-l flex min-h-60 items-center justify-center text-neutral-600'>
          현재 활동 회원이 없습니다.
        </div>
      ) : (
        <AdminUsersTableView
          items={members}
          allItems={members}
          activeTab='ACTIVE'
          selectedStatuses={[]}
          onFilterChange={() => {}}
          selectedIds={[]}
          onSelectAll={() => {}}
          onSelect={() => {}}
          onStatusChange={() => {}}
          onRoleChange={handleRoleChange}
          onMenuAction={handleMenuAction}
        />
      )}

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
        mode='edit'
      />
    </div>
  );
};
