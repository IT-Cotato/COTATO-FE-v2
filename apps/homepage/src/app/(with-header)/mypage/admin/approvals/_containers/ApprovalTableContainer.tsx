'use client';

import {ApprovalTableView} from '../_components/table/ApprovalTableView';
import {SearchBar} from '../../_components/SearchBar';
import {Pagination} from '@repo/ui/components/pagination/Pagination';
import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';
import {
  ApprovalMemberType,
  ApprovalTabType,
} from '@/schemas/admin/admin.schema';
import {MOCK_APPROVAL_MEMBERS} from '@/mocks/admin/mock-admin-approval';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

const ITEMS_PER_PAGE = 10;

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

  // TODO: API 연동 시 서버 데이터로 교체
  const [members, setMembers] = useState<ApprovalMemberType[]>(
    MOCK_APPROVAL_MEMBERS
  );

  // 체크박스 선택 상태
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 모달 상태
  const [modalConfig, setModalConfig] = useState<ModalConfig>(null);

  const filteredItems = members.filter((m) =>
    activeTab === 'REQUESTED'
      ? m.status === 'REQUESTED'
      : m.status === 'REJECTED'
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleUpdatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedItems.map((item) => item.memberId) : []);
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
      title: `${member.name}님의 가입을 승인하시겠습니까?`,
      description: '확인 버튼 클릭 시 가입 승인 메일이 전송됩니다.',
      onConfirm: () => {
        // TODO: API 연동
        setMembers((prev) =>
          prev.map((m) =>
            m.memberId === memberId ? {...m, status: 'APPROVED'} : m
          )
        );
        setModalConfig(null);
      },
    });
  };

  // 단일 거절
  const handleReject = (memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;
    setModalConfig({
      title: `${member.name}님의 가입을 거절하시겠습니까?`,
      description: '확인 버튼 클릭 시 가입 승인 메일이 전송됩니다.',
      onConfirm: () => {
        // TODO: API 연동
        setMembers((prev) =>
          prev.map((m) =>
            m.memberId === memberId ? {...m, status: 'REJECTED'} : m
          )
        );
        setModalConfig(null);
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
        // TODO: API 연동
        setMembers((prev) =>
          prev.map((m) =>
            selectedIds.includes(m.memberId) ? {...m, status: 'APPROVED'} : m
          )
        );
        setSelectedIds([]);
        setModalConfig(null);
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
      description: '확인 버튼 클릭 시 가입 승인 메일이 전송됩니다.',
      onConfirm: () => {
        // TODO: API 연동
        setMembers((prev) =>
          prev.map((m) =>
            selectedIds.includes(m.memberId) ? {...m, status: 'REJECTED'} : m
          )
        );
        setSelectedIds([]);
        setModalConfig(null);
      },
    });
  };

  // 거절 항목 삭제
  const handleDeleteRejected = () => {
    if (selectedIds.length === 0) return;
    setModalConfig({
      title: '거절 항목 기록을 삭제하시겠습니까?',
      description: '확인 버튼 클릭 시 영구 삭제됩니다.',
      onConfirm: () => {
        // TODO: API 연동
        setMembers((prev) =>
          prev.filter((m) => !selectedIds.includes(m.memberId))
        );
        setSelectedIds([]);
        setModalConfig(null);
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
              onClick={handleBatchApprove}
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
        items={paginatedItems}
        allItems={filteredItems}
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
