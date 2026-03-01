import {
  ApplicantsPageResponse,
  ApprovalMemberType,
} from '@/schemas/admin/admin-members.schema';
import {ApprovalTabType} from '@/constants/admin/admin';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

export type GetApplicantsParams = {
  status: ApprovalTabType;
  name?: string;
  page?: number;
  size?: number;
};

export const getApplicants = async (
  params: GetApplicantsParams
): Promise<ApplicantsPageResponse> => {
  try {
    const {data} = await privateAxios.get<ApplicantsPageResponse>(
      ENDPOINT.APPROVALS.LIST,
      {
        params: {
          status: params.status,
          name: params.name || undefined,
          page: params.page ?? 0,
          size: params.size ?? 11,
        },
      }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const approveMembers = async (memberIds: number[]): Promise<void> => {
  try {
    await privateAxios.patch(ENDPOINT.APPROVALS.APPROVE, {memberIds});
  } catch (error) {
    return handleApiError(error);
  }
};

export const rejectMembers = async (memberIds: number[]): Promise<void> => {
  try {
    await privateAxios.patch(ENDPOINT.APPROVALS.REJECT, {memberIds});
  } catch (error) {
    return handleApiError(error);
  }
};

export const restoreMembers = async (memberIds: number[]): Promise<void> => {
  try {
    await privateAxios.patch(ENDPOINT.APPROVALS.RESTORE, {memberIds});
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteRejectedMembers = async (
  memberIds: number[]
): Promise<void> => {
  try {
    await privateAxios.delete(ENDPOINT.APPROVALS.DELETE, {data: {memberIds}});
  } catch (error) {
    return handleApiError(error);
  }
};
