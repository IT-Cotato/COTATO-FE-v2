'use client';

import {AdminUsersTableView} from '@/app/(with-header)/mypage/admin/users/_components/table/AdminUsersTableView';
import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';
import {MemberDetailModal} from '@/app/(with-header)/mypage/admin/users/_components/table/MemberDetailModal';
import {getJosa} from '@/utils/getJosa';
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
    <div className='mt-2.5 flex flex-col gap-3.5 lg:-mt-13'>
      <div className='flex lg:items-end lg:gap-6'>
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={
          <span className='text-h4 text-neutral-700'>
            정말로{' '}
            <span className='text-primary font-semibold'>
              {memberToDelete?.name ?? ''}
            </span>
            {getJosa(memberToDelete?.name ?? '', '을/를')} 삭제하시겠습니까?
          </span>
        }

        confirmLabel='삭제'
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
