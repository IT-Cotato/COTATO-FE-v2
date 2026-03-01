'use client';

import {
  useApproveMembers,
  useRejectMembers,
  useRestoreMembers,
  useDeleteRejectedMembers,
} from '@/hooks/mutations/useAdminApprovals.mutation';

interface ActionOptions {
  onSuccess?: () => void;
}

export const useApprovalActions = () => {
  const {mutate: approveMutate, isPending: isApprovePending} = useApproveMembers();
  const {mutate: rejectMutate, isPending: isRejectPending} = useRejectMembers();
  const {mutate: restoreMutate, isPending: isRestorePending} = useRestoreMembers();
  const {mutate: deleteRejectedMutate, isPending: isDeletePending} = useDeleteRejectedMembers();

  const isLoading =
    isApprovePending || isRejectPending || isRestorePending || isDeletePending;

  const approve = (memberIds: number[], options?: ActionOptions) => {
    approveMutate(memberIds, {onSuccess: options?.onSuccess});
  };

  const reject = (memberIds: number[], options?: ActionOptions) => {
    rejectMutate(memberIds, {onSuccess: options?.onSuccess});
  };

  const restore = (memberIds: number[], options?: ActionOptions) => {
    restoreMutate(memberIds, {onSuccess: options?.onSuccess});
  };

  const deleteRejected = (memberIds: number[], options?: ActionOptions) => {
    deleteRejectedMutate(memberIds, {onSuccess: options?.onSuccess});
  };

  return {
    approve,
    reject,
    restore,
    deleteRejected,
    isLoading,
  };
};
