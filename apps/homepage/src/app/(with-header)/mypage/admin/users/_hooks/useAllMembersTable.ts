import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useAdminMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {useAllMembersUrlState} from '@/app/(with-header)/mypage/admin/users/_hooks/useAllMembersUrlState';
import {useAllMembersSelection} from '@/app/(with-header)/mypage/admin/users/_hooks/useAllMembersSelection';
import {useAllMembersModals} from '@/app/(with-header)/mypage/admin/users/_hooks/useAllMembersModals';

export const useAllMembersTable = () => {
  const urlState = useAllMembersUrlState();
  const normalizedPage =
    Number.isFinite(urlState.currentPage) && urlState.currentPage > 0
      ? urlState.currentPage
      : 1;
  const {data, isLoading} = useAdminMembersQuery({
    search: urlState.searchParam,
    statuses:
      urlState.selectedStatuses.length > 0
        ? urlState.selectedStatuses
        : undefined,
    page: normalizedPage - 1,
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
