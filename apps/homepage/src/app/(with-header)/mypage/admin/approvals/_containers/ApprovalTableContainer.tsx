'use client';

import {ApprovalTableView} from '../_components/table/ApprovalTableView';
import {SearchBar} from '../../_components/SearchBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';
import {ApprovalTabType} from '@/schemas/admin/admin.schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import {useApplicantsQuery} from '@/hooks/queries/useAdminApprovals.query';
import {
  useApproveMembers,
  useRejectMembers,
  useRestoreMembers,
  useDeleteRejectedMembers,
} from '@/hooks/mutations/useAdminApprovals.mutation';

interface ApprovalTableContainerProps {
  activeTab: ApprovalTabType;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
}

type ModalConfig = {
  title: string;
  description: string;
  onConfirm: () => void;
} | null;

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

  const {mutate: approve} = useApproveMembers();
  const {mutate: reject} = useRejectMembers();
  const {mutate: restore} = useRestoreMembers();
  const {mutate: deleteRejected} = useDeleteRejectedMembers();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modalConfig, setModalConfig] = useState<ModalConfig>(null);

  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab, currentPage]);

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? members.map((item) => item.memberId) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  // 단일 승인
  const handleApprove = (memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;
    setModalConfig({
      title:
        activeTab === 'REQUESTED'
          ? `${member.name}님의 가입을 승인하시겠습니까?`
          : `${member.name}님을 복원하시겠습니까?`,
      description:
        activeTab === 'REQUESTED'
          ? '확인 버튼 클릭 시 가입 승인 메일이 전송됩니다.'
          : '확인 버튼 클릭 시 가입 요청 상태로 복원됩니다.',
      onConfirm: () => {
        const mutate = activeTab === 'REQUESTED' ? approve : restore;
        mutate([memberId], {onSuccess: () => setModalConfig(null)});
      },
    });
  };

  // 단일 거절
  const handleReject = (memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;
    setModalConfig({
      title:
        activeTab === 'REQUESTED'
          ? `${member.name}님의 가입을 거절하시겠습니까?`
          : `${member.name}님을 영구 삭제하시겠습니까?`,
      description:
        activeTab === 'REQUESTED'
          ? '확인 버튼 클릭 시 가입 거절 메일이 전송됩니다.'
          : '확인 버튼 클릭 시 영구 삭제됩니다.',
      onConfirm: () => {
        const mutate = activeTab === 'REQUESTED' ? reject : deleteRejected;
        mutate([memberId], {onSuccess: () => setModalConfig(null)});
      },
    });
  };

  // 배치 승인
  const handleBatchApprove = () => {
    if (selectedIds.length === 0) return;
    const firstName =
      members.find((m) => m.memberId === selectedIds[0])?.name ?? '';
    const title =
      selectedIds.length === 1
        ? `${firstName}님의 가입을 승인하시겠습니까?`
        : `${firstName}님 외 ${selectedIds.length - 1}명의 가입을 승인하시겠습니까?`;
    setModalConfig({
      title,
      description: '확인 버튼 클릭 시 가입 승인 메일이 전송됩니다.',
      onConfirm: () => {
        approve(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  // 배치 거절
  const handleBatchReject = () => {
    if (selectedIds.length === 0) return;
    const firstName =
      members.find((m) => m.memberId === selectedIds[0])?.name ?? '';
    const title =
      selectedIds.length === 1
        ? `${firstName}님의 가입을 거절하시겠습니까?`
        : `${firstName}님 외 ${selectedIds.length - 1}명의 가입을 거절하시겠습니까?`;
    setModalConfig({
      title,
      description: '확인 버튼 클릭 시 가입 거절 메일이 전송됩니다.',
      onConfirm: () => {
        reject(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  // 배치 복원 (REJECTED -> REQUESTED)
  const handleBatchRestore = () => {
    if (selectedIds.length === 0) return;
    const firstName =
      members.find((m) => m.memberId === selectedIds[0])?.name ?? '';
    const title =
      selectedIds.length === 1
        ? `${firstName}님을 복원하시겠습니까?`
        : `${firstName}님 외 ${selectedIds.length - 1}명을 복원하시겠습니까?`;
    setModalConfig({
      title,
      description: '확인 버튼 클릭 시 가입 요청 상태로 복원됩니다.',
      onConfirm: () => {
        restore(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  // 영구 삭제
  const handleDeleteRejected = () => {
    if (selectedIds.length === 0) return;
    setModalConfig({
      title: '거절 항목 기록을 삭제하시겠습니까?',
      description: '확인 버튼 클릭 시 영구 삭제됩니다.',
      onConfirm: () => {
        deleteRejected(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex items-end gap-5 pt-7.5'>
        {activeTab === 'REQUESTED' ? (
          <>
            <button
              type='button'
              onClick={handleBatchApprove}
              className='text-primary text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold disabled:cursor-not-allowed disabled:opacity-50'>
              가입 승인
            </button>
            <button
              type='button'
              onClick={handleBatchReject}
              className='text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50'>
              가입 거절
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              disabled={selectedIds.length === 0}
              onClick={handleBatchRestore}
              className='text-body-m h-8 w-23.25 cursor-pointer rounded-lg bg-neutral-50 font-semibold text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50'>
              복원하기
            </button>
            <button
              type='button'
              disabled={selectedIds.length === 0}
              onClick={handleDeleteRejected}
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
                label='확인'
              />
            </div>
          }
        />
      )}
    </div>
  );
};
