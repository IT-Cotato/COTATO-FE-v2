'use client';

import {ApprovalTableView} from '../_components/table/ApprovalTableView';
import {SearchBar} from '../../_components/SearchBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';
import {ApprovalMemberType} from '@/schemas/admin/admin-members.schema';
import {ApprovalTabType} from '@/constants/admin/admin';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import {useApplicantsQuery} from '@/hooks/queries/useAdminApprovals.query';
import {useApprovalModals} from '@/app/(with-header)/mypage/admin/approvals/_hooks/useApprovalModals';
import {useApprovalActions} from '@/app/(with-header)/mypage/admin/approvals/_hooks/useApprovalActions';

interface ApprovalTableContainerProps {
  activeTab: ApprovalTabType;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
}

export const ApprovalTableContainer = ({
  activeTab,
  keyword,
  onKeywordChange,
  onSearch,
}: ApprovalTableContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;
  const searchParam = searchParams.get('search') ?? '';

  const {data} = useApplicantsQuery({
    status: activeTab,
    name: searchParam || undefined,
    page: currentPage - 1,
    size: 11,
  });

  const members = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const {isLoading, ...actions} = useApprovalActions();

  const {
    selectedIds,
    setSelectedIds,
    modalConfig,
    setModalConfig,
    handleSelectAll,
    handleSelect,
    handleApprove,
    handleReject,
    handleApproveSelected,
    handleRejectSelected,
    handleRestoreSelected,
    handleDeleteSelected,
  } = useApprovalModals({activeTab, members, actions});

  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab, currentPage, setSelectedIds]);

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex items-end gap-5 pt-7.5'>
        {activeTab === 'REQUESTED' ? (
          <>
            <button
              type='button'
              disabled={isLoading}
              onClick={handleApproveSelected}
              className='text-primary text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold disabled:cursor-not-allowed disabled:opacity-50'>
              가입 승인
            </button>
            <button
              type='button'
              disabled={isLoading}
              onClick={handleRejectSelected}
              className='text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50'>
              가입 거절
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              disabled={selectedIds.length === 0 || isLoading}
              onClick={handleRestoreSelected}
              className='text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50'>
              복원하기
            </button>
            <button
              type='button'
              disabled={selectedIds.length === 0 || isLoading}
              onClick={handleDeleteSelected}
              className='text-primary text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold disabled:cursor-not-allowed disabled:opacity-50'>
              영구 삭제
            </button>
          </>
        )}
        <SearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onSearch={onSearch}
        />
      </div>

      <ApprovalTableView
        items={members}
        allItems={members}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelect={handleSelect}
        onApprove={handleApprove}
        onReject={handleReject}
        isLoading={isLoading}
      />

      <div className='flex w-full justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handleUpdatePage}
          variant='admin'
        />
      </div>

      {modalConfig && (
        <Modal
          isOpen
          onClose={() => setModalConfig(null)}
          containerStyle={{width: 510, height: 300}}
          contentWrapperClassName='justify-around'
          title={modalConfig.title}
          content={modalConfig.description}
          actions={
            <div className='flex w-full justify-center'>
              <Button
                variant='primary'
                onClick={modalConfig.onConfirm}
                label={isLoading ? '처리 중...' : '확인'}
                disabled={isLoading}
              />
            </div>
          }
        />
      )}
    </div>
  );
};
