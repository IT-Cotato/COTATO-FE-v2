import {useEffect, useMemo} from 'react';
import {MemberType} from '@/schemas/admin/admin-members.schema';
import {useInfiniteActiveMembersQuery} from '@/hooks/queries/useAdminMembers.query';
import {usePatchActiveMemberRole} from '@/hooks/mutations/useAdminActiveMembers.mutation';
import {useActiveMembersUrlState} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersUrlState';
import {useActiveMembersGeneration} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersGeneration';
import {useActiveMembersModals} from '@/app/(with-header)/mypage/admin/users/_hooks/useActiveMembersModals';
import {MemberRole} from '@/schemas/admin/admin-members.schema';

export const useActiveMembersTable = () => {
  const urlState = useActiveMembersUrlState();
  const generation = useActiveMembersGeneration();
  const isGenerationReady = generation.selectedGeneration !== null;

  const {
    data,
    isLoading: isQueryLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteActiveMembersQuery(
    {
      generationId: generation.selectedGeneration ?? 0,
      size: 100, // 청크 단위로 분할 Fetch
    },
    isGenerationReady
  );

  // 모든 데이터를 확보할 때까지 자동으로 다음 페이지 Fetch (리뷰어 Option B안)
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 기수가 아직 결정되지 않았거나 데이터를 가져오는 중이면 로딩 중으로 처리
  const isLoading = !isGenerationReady || (isQueryLoading && !data);

  const keyword = urlState.searchParam?.toLowerCase() ?? '';

  // 확보된 모든 페이지의 데이터를 하나로 통합
  const allMembers: MemberType[] = useMemo(() => {
    return data?.pages.flatMap((page) => page?.content ?? []) ?? [];
  }, [data]);

  const filteredMembers: MemberType[] = useMemo(() => {
    if (!keyword) return allMembers;
    return allMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(keyword) ||
        m.university.toLowerCase().includes(keyword) ||
        m.position.toLowerCase().includes(keyword)
    );
  }, [allMembers, keyword]);

  const isCurrentGeneration =
    generation.selectedGeneration !== null &&
    generation.selectedGeneration === generation.defaultGenerationId;

  const pageSize = 10;
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;

  const clampedPage = Math.max(1, Math.min(urlState.currentPage, totalPages));

  const members = useMemo(() => {
    return filteredMembers.slice(
      (clampedPage - 1) * pageSize,
      clampedPage * pageSize
    );
  }, [filteredMembers, clampedPage, pageSize]);

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
    isLoading: isLoading || isFetchingNextPage,
    handleRoleChange,
    ...urlState,
    ...generation,
    ...modals,
  };
};
