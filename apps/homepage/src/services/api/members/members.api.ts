import {MemberInfo, MemberInfoSchema} from '@/schemas/members/members.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 *
 * 회원 정보
 */
export const getMemberInfo = async (): Promise<MemberInfo> => {
  try {
    const {data} = await privateAxios.get(ENDPOINT.MEMBERS.INFO);
    return MemberInfoSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 비밀번호 업데이트
 */
export const updatePasswordApi = async (password: string) => {
  try {
    return await privateAxios.patch(ENDPOINT.MEMBERS.UPDATE_PASSWORD, {
      password,
    });
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 현재 비밀번호 확인 API
 */
export const verifyPasswordApi = async (password: string) => {
  try {
    const {data} = await privateAxios.post(ENDPOINT.MEMBERS.VERIFY_PASSWORD, {
      password,
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 회원 탈퇴 API
 * @param memberId 회원 고유 ID
 * @param leavingPolicyAgreed 탈퇴 정책 동의 여부
 */
export const deactivateMemberApi = async (
  memberId: number,
  leavingPolicyAgreed: boolean
) => {
  try {
    const {data} = await privateAxios.post(
      ENDPOINT.MEMBERS.DEACTIVATE(memberId),
      {leavingPolicyAgreed}
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
