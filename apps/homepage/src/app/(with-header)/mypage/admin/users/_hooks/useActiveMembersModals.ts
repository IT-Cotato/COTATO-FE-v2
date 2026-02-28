import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {MemberMenuAction} from '@/constants/admin/admin';
import {QUERY_KEYS} from '@/constants/query-keys';
import {MemberType} from '@/schemas/admin/admin-members.schema';
import {
  useDeleteActiveMember,
  usePatchActiveMember,
} from '@/hooks/mutations/useAdminActiveMembers.mutation';
import {getAdminMemberDetail} from '@/services/api/admin/admin-members.api';

interface UseActiveMembersModalsProps {
  members: MemberType[];
  /** 현재 선택된 기수가 실제 활동 기수인지 여부 */
  isCurrentGeneration: boolean;
}

export const useActiveMembersModals = ({
  members,
  isCurrentGeneration,
}: UseActiveMembersModalsProps) => {
  const queryClient = useQueryClient();
  const {mutate: deleteActiveMemberMutate} = useDeleteActiveMember();
  const {mutate: patchActiveMemberMutate} = usePatchActiveMember();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<MemberType | null>(null);

  const handleConfirmDelete = () => {
    if (!memberToDelete?.generationMemberId) return;
    deleteActiveMemberMutate(memberToDelete.generationMemberId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setMemberToDelete(null);
      },
    });
  };

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null);

  /**
   * 메뉴 액션 핸들러
   * edit 클릭 시: 활동 회원 목록에 gender가 없으므로
   * 상세 조회 API를 먼저 호출해서 gender를 포함한 전체 데이터를 가져온 뒤 모달 열기
   */
  const handleMenuAction = async (
    action: MemberMenuAction,
    memberId: number
  ) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member) return;

    if (action === 'delete' || action === 'exclude') {
      setMemberToDelete(member);
      setIsDeleteModalOpen(true);
    } else if (action === 'edit') {
      if (!isCurrentGeneration) {
        alert('현재 활동 기수의 회원만 정보를 수정할 수 있습니다.');
        return;
      }
      try {
        const detail = await queryClient.fetchQuery({
          queryKey: QUERY_KEYS.ADMIN_MEMBERS.DETAIL(memberId),
          queryFn: () => getAdminMemberDetail(memberId),
        });
        if (detail) {
          setSelectedMember({
            ...detail,
            generationMemberId: member.generationMemberId,
          });
          setIsDetailModalOpen(true);
        }
      } catch {
        alert('회원 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSaveMember = (memberData: MemberType) => {
    if (!memberData.generationMemberId || !memberData.gender) return;
    patchActiveMemberMutate(
      {
        generationMemberId: memberData.generationMemberId,
        body: {
          name: memberData.name,
          gender: memberData.gender,
          university: memberData.university,
          phoneNumber: memberData.phoneNumber.replace(/-/g, ''),
          position: memberData.position,
          role: memberData.role,
          status: memberData.status ?? 'APPROVED',
        },
      },
      {
        onSuccess: () => setIsDetailModalOpen(false),
      }
    );
  };

  return {
    // 삭제 모달
    isDeleteModalOpen,
    memberToDelete,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    // 수정 모달
    isDetailModalOpen,
    selectedMember,
    setIsDetailModalOpen,
    handleMenuAction,
    handleSaveMember,
  };
};
