import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {AUTH_RETRY_HEADER} from '@/lib/auth/constants';
import {ENDPOINT} from '@/services/constant/endpoint';
import {resetAuthState} from '@/services/utils/authState';

/**
 * 모든 요청은 같은 origin의 BFF(/api/*)를 거쳐 백엔드로 전달된다.
 * 토큰은 HttpOnly 쿠키로 브라우저가 자동 전송하고, 부착·갱신은 BFF가 담당한다.
 */

/** 다른 요청의 토큰 회전 응답(Set-Cookie)이 먼저 반영되도록 잠시 기다린 뒤 재시도한다. */
const AUTH_RETRY_DELAY_MS = 300;

/**
 * Axios 인스턴스 생성 함수
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 개발 환경에서 요청 로깅
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url} ${JSON.stringify(config.data)} ${JSON.stringify(config.params)}`
        );
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * 401 처리
   * - BFF가 재시도를 요청한 경우(다른 요청이 토큰을 먼저 회전시킴): 1회 재시도
   * - 그 외: 세션이 끝났으므로 로그인 상태였다면 클라이언트 상태 초기화
   */
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & {_authRetried?: boolean})
        | undefined;

      if (error.response?.status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      const isRotationConflict = Boolean(
        error.response.headers[AUTH_RETRY_HEADER]
      );

      if (isRotationConflict && !originalRequest._authRetried) {
        originalRequest._authRetried = true;
        await new Promise((resolve) =>
          setTimeout(resolve, AUTH_RETRY_DELAY_MS)
        );
        return instance(originalRequest);
      }

      if (isRotationConflict) {
        // 재시도해도 경합 응답이면 쿠키의 refresh 토큰이 이미 폐기된 것이므로 세션 쿠키를 정리한다.
        await instance.post(ENDPOINT.AUTH.LOGOUT).catch(() => undefined);
      }

      const {useAuthStore} = await import('@/store/useAuthStore');
      if (useAuthStore.getState().isAuthenticated) {
        await resetAuthState();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Public Axios - 인증 불필요
 */
export const publicAxios = createAxiosInstance();

/**
 * Private Axios - 인증 필요 (쿠키는 BFF가 처리하므로 설정은 publicAxios와 같다)
 */
export const privateAxios = createAxiosInstance();
