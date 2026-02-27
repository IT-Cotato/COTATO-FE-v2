import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useActiveMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {useActiveMembersUrlState} from '../_hooks/useActiveMembersUrlState';
import {useActiveMembersGeneration} from '../_hooks/useActiveMembersGeneration';
import {useActiveMembersModals} from '../_hooks/useActiveMembersModals';

export const ActiveMembersTable = () => {
  const urlState = useActiveMembersUrlState();
  const generation = useActiveMembersGeneration();
  const {data, isLoading} = useActiveMembersQuery(
    {
      generationId: generation.selectedGeneration ?? 0,
      search: urlState.searchParam,
      page: urlState.currentPage - 1,
      size: 10,
    },
    generation.selectedGeneration !== null
  );

  const members: MemberType[] = data?.content ?? [];
  const modals = useActiveMembersModals({members});

  return {
    members,
    isLoading,
    ...urlState,
    ...generation,
    ...modals,
  };
};
