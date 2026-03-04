import {useState} from 'react';
import {MemberStatusKey} from '@/constants/admin/admin';
import {MemberType} from '@/schemas/admin/admin-members.schema';
import {usePatchAdminMembersStatus} from '@/hooks/mutations/usePatchAdminMembersStatus.mutation';

interface UseAllMembersSelectionProps {
  members: MemberType[];
}

export const useAllMembersSelection = ({
  members,
}: UseAllMembersSelectionProps) => {
  const {mutate: patchStatus} = usePatchAdminMembersStatus();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleBatchStatusChange = (status: MemberStatusKey) => {
    if (selectedIds.length === 0) return;
    patchStatus(
      {memberIds: selectedIds, status},
      {
        onSuccess: () => {
          setSelectedIds([]);
        },
      }
    );
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
