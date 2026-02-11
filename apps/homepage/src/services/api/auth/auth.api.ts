import {
  JoinRequestType,
  JoinResponseType,
  LoginResponseType,
  LoginType,
  SendCodeRequestType,
  SendResetCodeRequestType,
  VerifyCodeRequestType,
  VerifyResetCodeRequestType,
  VerifyResetCodeResponse,
} from '@/schemas/auth/auth.schema';
import {privateAxios, publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

/**
 * 로그인
 */
export const loginApi = async (data: LoginType) => {
  try {
    const response = await publicAxios.post<LoginResponseType>(
      ENDPOINT.AUTH.LOGIN,
      data,
      {withCredentials: true}
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 회원가입
 */
export const joinApi = async (data: JoinRequestType) => {
  try {
    const response = await publicAxios.post<JoinResponseType>(
      ENDPOINT.AUTH.JOIN,
      data
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 회원가입 인증 코드 발송
 */
export const sendSignUpCode = async (data: SendCodeRequestType) => {
  try {
    const response = await publicAxios.post(ENDPOINT.AUTH.VERIFICATION, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 회원가입 인증 코드 확인
 */
export const verifySignUpCode = async ({
  email,
  code,
}: VerifyCodeRequestType) => {
  try {
    const response = await publicAxios.get(ENDPOINT.AUTH.VERIFICATION, {
      params: {email, code},
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const passwordApi = {
  // 비밀번호 찾기 인증 코드 발송
  sendResetCode: async (data: SendResetCodeRequestType) => {
    try {
      const response = await publicAxios.post(ENDPOINT.AUTH.PASSWORD, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // 비밀번호 찾기 인증 코드 확인
  verifyResetCode: async ({
    email,
    code,
  }: VerifyResetCodeRequestType): Promise<VerifyResetCodeResponse> => {
    try {
      const response = await publicAxios.get(ENDPOINT.AUTH.PASSWORD, {
        params: {email, code},
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

/**
 * 로그아웃
 */
export const logoutApi = async (accessToken: string) => {
  try {
    return await privateAxios.post(ENDPOINT.AUTH.LOGOUT, {accessToken});
  } catch (error) {
    return handleApiError(error);
  }
};
