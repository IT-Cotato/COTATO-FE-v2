'use client';

import {ReactNode, useState} from 'react';
import {ApprovalTabType} from '@/constants/admin/admin';
import {ApprovalMemberType} from '@/schemas/admin/admin-members.schema';

type ModalConfig = {
  title: string;
  description: ReactNode;
  onConfirm: () => void;
} | null;

interface UseApprovalModalsProps {
  activeTab: ApprovalTabType;
  members: ApprovalMemberType[];
  actions: {
    approve: (memberIds: number[], options?: {onSuccess?: () => void}) => void;
    reject: (memberIds: number[], options?: {onSuccess?: () => void}) => void;
    restore: (memberIds: number[], options?: {onSuccess?: () => void}) => void;
    deleteRejected: (
      memberIds: number[],
      options?: {onSuccess?: () => void}
    ) => void;
  };
}

export const useApprovalModals = ({
  activeTab,
  members,
  actions,
}: UseApprovalModalsProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modalConfig, setModalConfig] = useState<ModalConfig>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? members.map((item) => item.memberId) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  // 단일 승인 / 복원
  const handleApprove = (memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;
    setModalConfig({
      title:
        activeTab === 'REQUESTED'
          ? `${member.name}님의 가입을 승인하시겠습니까?`
          : `${member.name}님을 복원하시겠습니까?`,
      description:
        activeTab === 'REQUESTED' ? (
          <>
            확인 버튼 클릭 시<br className='lg:hidden' /> 가입 승인 메일이
            전송됩니다.
          </>
        ) : (
          <>
            확인 버튼 클릭 시<br className='lg:hidden' /> 가입 요청 상태로
            복원됩니다.
          </>
        ),
      onConfirm: () => {
        const action =
          activeTab === 'REQUESTED' ? actions.approve : actions.restore;
        action([memberId], {onSuccess: () => setModalConfig(null)});
      },
    });
  };

  // 단일 거절 / 영구 삭제
  const handleReject = (memberId: number) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;
    setModalConfig({
      title:
        activeTab === 'REQUESTED'
          ? `${member.name}님의 가입을 거절하시겠습니까?`
          : `${member.name}님을 영구 삭제하시겠습니까?`,
      description:
        activeTab === 'REQUESTED' ? (
          <>
            확인 버튼 클릭 시<br className='lg:hidden' /> 가입 거절 메일이
            전송됩니다.
          </>
        ) : (
          '확인 버튼 클릭 시 영구 삭제됩니다.'
        ),
      onConfirm: () => {
        const action =
          activeTab === 'REQUESTED' ? actions.reject : actions.deleteRejected;
        action([memberId], {onSuccess: () => setModalConfig(null)});
      },
    });
  };

  // 선택 일괄 승인
  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;
    const firstName =
      members.find((m) => m.memberId === selectedIds[0])?.name ?? '';
    const title =
      selectedIds.length === 1
        ? `${firstName}님의 가입을 승인하시겠습니까?`
        : `${firstName}님 외 ${selectedIds.length - 1}명의 가입을 승인하시겠습니까?`;
    setModalConfig({
      title,
      description: (
        <>
          확인 버튼 클릭 시<br className='lg:hidden' /> 가입 승인 메일이
          전송됩니다.
        </>
      ),
      onConfirm: () => {
        actions.approve(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  // 선택 일괄 거절
  const handleRejectSelected = () => {
    if (selectedIds.length === 0) return;
    const firstName =
      members.find((m) => m.memberId === selectedIds[0])?.name ?? '';
    const title =
      selectedIds.length === 1
        ? `${firstName}님의 가입을 거절하시겠습니까?`
        : `${firstName}님 외 ${selectedIds.length - 1}명의 가입을 거절하시겠습니까?`;
    setModalConfig({
      title,
      description: (
        <>
          확인 버튼 클릭 시<br className='lg:hidden' /> 가입 거절 메일이
          전송됩니다.
        </>
      ),
      onConfirm: () => {
        actions.reject(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  // 선택 일괄 복원
  const handleRestoreSelected = () => {
    if (selectedIds.length === 0) return;
    const firstName =
      members.find((m) => m.memberId === selectedIds[0])?.name ?? '';
    const title =
      selectedIds.length === 1
        ? `${firstName}님을 복원하시겠습니까?`
        : `${firstName}님 외 ${selectedIds.length - 1}명을 복원하시겠습니까?`;
    setModalConfig({
      title,
      description: (
        <>
          확인 버튼 클릭 시<br className='lg:hidden' /> 가입 요청 상태로
          복원됩니다.
        </>
      ),
      onConfirm: () => {
        actions.restore(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  // 선택 일괄 영구 삭제
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setModalConfig({
      title: '거절 항목 기록을 삭제하시겠습니까?',
      description: '확인 버튼 클릭 시 영구 삭제됩니다.',
      onConfirm: () => {
        actions.deleteRejected(selectedIds, {
          onSuccess: () => {
            setSelectedIds([]);
            setModalConfig(null);
          },
        });
      },
    });
  };

  return {
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
  };
};
