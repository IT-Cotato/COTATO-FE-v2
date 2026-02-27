import {useState} from 'react';
import {MemberStatusKey} from '@/constants/admin/admin';
import {MemberType} from '@/schemas/admin/admin-members.schema';
import {usePatchAdminMembersStatus} from '@/hooks/mutations/useAdminMembers.mutation';

interface UseAllMembersSelectionProps {
  members: MemberType[];
}

export const useAllMembersSelection = ({members}: UseAllMembersSelectionProps) => {
  const {mutate: patchStatus} = usePatchAdminMembersStatus();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleBatchStatusChange = (status: MemberStatusKey) => {
    patchStatus({memberIds: selectedIds, status});
    setSelectedIds([]);
  };

  const handleStatusChange = (memberId: number, status: MemberStatusKey) => {
    patchStatus({memberIds: [memberId], status});
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? members.map((m) => m.memberId) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  return {
    selectedIds,
    setSelectedIds,
    handleBatchStatusChange,
    handleStatusChange,
    handleSelectAll,
    handleSelect,
  };
};
