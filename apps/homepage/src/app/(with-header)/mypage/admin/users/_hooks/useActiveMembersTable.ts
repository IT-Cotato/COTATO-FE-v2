import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useActiveMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {usePatchActiveMemberRole} from '@/hooks/mutations/useAdminActiveMembers.mutation';
import {useActiveMembersUrlState} from './useActiveMembersUrlState';
import {useActiveMembersGeneration} from './useActiveMembersGeneration';
import {useActiveMembersModals} from './useActiveMembersModals';
import {MemberRole} from '@/schemas/admin/admin-members.schema';

export const useActiveMembersTable = () => {
  const urlState = useActiveMembersUrlState();
  const generation = useActiveMembersGeneration();
  const {data, isLoading} = useActiveMembersQuery(
    {
      generationId: generation.selectedGeneration ?? 0,
      search: urlState.searchParam,
      page: urlState.currentPage - 1,
      size: 11,
    },
    generation.selectedGeneration !== null
  );

  const members: MemberType[] = data?.content ?? [];
  const isCurrentGeneration =
    generation.selectedGeneration !== null &&
    generation.selectedGeneration === generation.defaultGenerationId;

  const modals = useActiveMembersModals({members, isCurrentGeneration});
  const {mutate: patchRoleMutate} = usePatchActiveMemberRole();

  const handleRoleChange = (memberId: number, role: MemberRole) => {
    const member = members.find((m) => m.memberId === memberId);
    if (!member?.generationMemberId) return;
    patchRoleMutate({generationMemberId: member.generationMemberId, body: {role}});
  };

  return {
    members,
    isLoading,
    handleRoleChange,
    ...urlState,
    ...generation,
    ...modals,
  };
};
