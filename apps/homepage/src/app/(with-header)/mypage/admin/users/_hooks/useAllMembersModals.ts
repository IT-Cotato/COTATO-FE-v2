import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {MemberMenuAction} from '@/constants/admin/admin';
import {QUERY_KEYS} from '@/constants/query-keys';
import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useDeleteAdminMembers} from '@/hooks/mutations/useAdminMembers.mutation';
import {getAdminMemberDetail} from '@/services/api/admin/admin-members.api';

interface UseAllMembersModalsProps {
  members: MemberType[];
  onDeleteSuccess: (memberId: number) => void;
}

export const useAllMembersModals = ({
  members,
  onDeleteSuccess,
}: UseAllMembersModalsProps) => {
  const queryClient = useQueryClient();
  const {mutate: deleteMember} = useDeleteAdminMembers();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberType | null>(null);

  const handleConfirmDelete = () => {
    if (!memberToDelete) return;
    deleteMember(
      {memberIds: [memberToDelete.memberId]},
      {
        onSuccess: () => {
          onDeleteSuccess(memberToDelete.memberId);
          setIsDeleteModalOpen(false);
          setMemberToDelete(null);
        },
      }
    );
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

  /** ALL 탭 메뉴 액션: 상세보기 / 삭제하기만 지원 */
  const handleMenuAction = async (
    action: MemberMenuAction,
    memberId: number
  ) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;

    if (action === 'delete') {
      setMemberToDelete(member);
      setIsDeleteModalOpen(true);
    } else if (action === 'detail') {
      const detail = await queryClient.fetchQuery({
        queryKey: QUERY_KEYS.ADMIN_MEMBERS.DETAIL(memberId),
        queryFn: () => getAdminMemberDetail(memberId),
      });
      if (detail) {
        setSelectedMember(detail);
        setIsDetailModalOpen(true);
      }
    }
  };

  return {
    // 삭제 모달
    isDeleteModalOpen,
    memberToDelete,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    // 상세 모달 (읽기 전용)
    isDetailModalOpen,
    selectedMember,
    setIsDetailModalOpen,
    handleMenuAction,
  };
};
