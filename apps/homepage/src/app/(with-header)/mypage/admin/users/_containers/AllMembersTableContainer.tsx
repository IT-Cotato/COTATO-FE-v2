'use client';

import {AdminUsersTableView} from '@/app/(with-header)/mypage/admin/users/_components/table/AdminUsersTableView';
import {ConfirmModal} from '@/app/(with-header)/mypage/admin/_components/ConfirmModal';
import {MemberDetailModal} from '@/app/(with-header)/mypage/admin/users/_components/table/MemberDetailModal';
import {getJosa} from '@/utils/getJosa';
import {AllMembersActionBar} from '@/app/(with-header)/mypage/admin/users/_components/AllMembersActionBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {useAllMembersTable} from '@/app/(with-header)/mypage/admin/users/_hooks/useAllMembersTable';

export const AllMembersTableContainer = () => {
  const {
    members,
    totalPages,
    isLoading,
    keyword,
    setKeyword,
    handleSearch,
    currentPage,
    selectedStatuses,
    selectedIds,
    handleBatchStatusChange,
    handleStatusChange,
    handleSelectAll,
    handleSelect,
    handleUpdatePage,
    handleFilterChange,
    isDeleteModalOpen,
    memberToDelete,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    isDetailModalOpen,
    selectedMember,
    setIsDetailModalOpen,
    handleMenuAction,
  } = useAllMembersTable();

  return (
    <div className='flex flex-col gap-3.5'>
      <AllMembersActionBar
        hasSelection={selectedIds.length > 0}
        onBatchStatusChange={handleBatchStatusChange}
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <AdminUsersTableView
        items={members}
        allItems={members}
        activeTab='ALL'
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
        member={selectedMember}
        mode='read'
      />
    </div>
  );
};
