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
