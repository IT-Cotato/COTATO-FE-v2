import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useActiveMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {usePatchActiveMemberRole} from '@/hooks/mutations/useAdminActiveMembers.mutation';
import {useActiveMembersUrlState} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersUrlState';
import {useActiveMembersGeneration} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersGeneration';
import {useActiveMembersModals} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersModals';
import {MemberRole} from '@/schemas/admin/admin-members.schema';

export const useActiveMembersTable = () => {
  const urlState = useActiveMembersUrlState();
  const generation = useActiveMembersGeneration();
  const isGenerationReady = generation.selectedGeneration !== null;
  const {data, isLoading: isQueryLoading} = useActiveMembersQuery(
    {
      generationId: generation.selectedGeneration ?? 0,
      page: 0,
      size: 1000,
    },
    isGenerationReady
  );

  // 기수가 아직 결정되지 않았으면 로딩 중으로 처리
  const isLoading = !isGenerationReady || isQueryLoading;
  const keyword = urlState.searchParam?.toLowerCase() ?? '';
  const allMembers: MemberType[] = data?.content ?? [];
  const filteredMembers: MemberType[] = keyword
    ? allMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(keyword) ||
          m.university.toLowerCase().includes(keyword) ||
          m.position.toLowerCase().includes(keyword)
      )
    : allMembers;

  const isCurrentGeneration =
    generation.selectedGeneration !== null &&
    generation.selectedGeneration === generation.defaultGenerationId;

  const pageSize = 10;
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const members = filteredMembers.slice(
    (urlState.currentPage - 1) * pageSize,
    urlState.currentPage * pageSize
  );

  const modals = useActiveMembersModals({members, isCurrentGeneration});
  const {mutate: patchRoleMutate} = usePatchActiveMemberRole();

  const handleRoleChange = (memberId: number, role: MemberRole) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member?.generationMemberId) return;
    patchRoleMutate({
      generationMemberId: member.generationMemberId,
      body: {role},
    });
  };

  return {
    members,
    totalPages,
    isLoading,
    handleRoleChange,
    ...urlState,
    ...generation,
    ...modals,
  };
};
