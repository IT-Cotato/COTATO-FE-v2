import {
  ActiveMembersPageResponseSchema,
  AdminMemberDetailSchema,
  AdminMembersPageResponseSchema,
  DeleteMembersRequest,
  GetActiveMembersParams,
  GetAdminMembersParams,
  PatchActiveMemberRoleRequest,
  PatchMembersStatusRequest,
  UpdateActiveMemberInfoRequest,
} from '@/schemas/admin/admin-members.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/** 전체 회원 검색 */
export const getAdminMembers = async (params: GetAdminMembersParams) => {
  try {
    const response = await privateAxios.get(ENDPOINT.ADMIN_MEMBERS.LIST, {
      params,
      paramsSerializer: (p) => {
        const searchParams = new URLSearchParams();
        Object.entries(p).forEach(([key, value]) => {
          if (value === undefined) return;
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else {
            searchParams.append(key, String(value));
          }
        });
        return searchParams.toString();
      },
    });
    return AdminMembersPageResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 회원 상세 조회 */
export const getAdminMemberDetail = async (memberId: number) => {
  try {
    const response = await privateAxios.get(
      ENDPOINT.ADMIN_MEMBERS.DETAIL(memberId)
    );
    return AdminMemberDetailSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 일괄 활동 여부 변경 */
export const patchAdminMembersStatus = async (
  body: PatchMembersStatusRequest
) => {
  try {
    await privateAxios.patch(ENDPOINT.ADMIN_MEMBERS.PATCH_STATUS, body);
  } catch (error) {
    handleApiError(error);
  }
};

/** 회원 영구 삭제 */
export const deleteAdminMembers = async (body: DeleteMembersRequest) => {
  try {
    await privateAxios.delete(ENDPOINT.ADMIN_MEMBERS.DELETE, {data: body});
  } catch (error) {
    handleApiError(error);
  }
};

/** 활동 회원 목록 조회 */
export const getActiveMembers = async (params: GetActiveMembersParams) => {
  try {
    const response = await privateAxios.get(ENDPOINT.ADMIN_MEMBERS.ACTIVE_LIST, {params});
    return ActiveMembersPageResponseSchema.parse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 활동 회원 정보 수정 */
export const patchActiveMember = async ({
  generationMemberId,
  body,
}: {
  generationMemberId: number;
  body: UpdateActiveMemberInfoRequest;
}) => {
  try {
    await privateAxios.patch(
      ENDPOINT.ADMIN_MEMBERS.ACTIVE(generationMemberId),
      body
    );
  } catch (error) {
    handleApiError(error);
  }
};

/** 활동 회원 역할 변경 */
export const patchActiveMemberRole = async ({
  generationMemberId,
  body,
}: {
  generationMemberId: number;
  body: PatchActiveMemberRoleRequest;
}) => {
  try {
    await privateAxios.patch(
      ENDPOINT.ADMIN_MEMBERS.ACTIVE_ROLE(generationMemberId),
      body
    );
  } catch (error) {
    handleApiError(error);
  }
};

/** 활동 회원 삭제 */
export const deleteActiveMember = async (generationMemberId: number) => {
  try {
    await privateAxios.delete(
      ENDPOINT.ADMIN_MEMBERS.ACTIVE(generationMemberId)
    );
  } catch (error) {
    handleApiError(error);
  }
};
