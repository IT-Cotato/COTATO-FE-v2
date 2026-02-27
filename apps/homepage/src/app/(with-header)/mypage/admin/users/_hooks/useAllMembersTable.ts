import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useAdminMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {useAllMembersUrlState} from './useAllMembersUrlState';
import {useAllMembersSelection} from './useAllMembersSelection';
import {useAllMembersModals} from './useAllMembersModals';

export const useAllMembersTable = () => {
  const urlState = useAllMembersUrlState();
  const {data, isLoading} = useAdminMembersQuery({
    search: urlState.searchParam,
    statuses:
      urlState.selectedStatuses.length > 0
        ? urlState.selectedStatuses
        : undefined,
    page: urlState.currentPage - 1,
    size: 11,
  });

  const members: MemberType[] = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const selection = useAllMembersSelection({members});
  const modals = useAllMembersModals({
    members,
    onDeleteSuccess: (memberId) => {
      selection.setSelectedIds((prev) => prev.filter((id) => id !== memberId));
    },
  });

  return {
    members,
    totalPages,
    isLoading,
    ...urlState,
    ...selection,
    ...modals,
  };
};
