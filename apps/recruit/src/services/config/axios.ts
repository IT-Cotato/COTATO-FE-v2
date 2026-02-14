import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import {API_BASE_URL} from '@/services/constant/endpoint';
import {
  clearAuthState,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/services/utils/tokenManager';
import {refreshToken} from '@/services/utils/tokenRefresh';

/**
 * Axios 인스턴스 생성 함수
 */
const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
};

/**
 * Public Axios - 인증 불필요
 */
export const publicAxios = createAxiosInstance();

/**
 * Public Axios Request Interceptor
 */
publicAxios.interceptors.request.use(
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
 * Private Axios - 인증 필요
 */
export const privateAxios = createAxiosInstance();

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * 큐에 쌓인 요청들을 처리
 */
const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

/**
 * Private Axios Request Interceptor
 * localStorage의 accessToken을 헤더에 추가
 */
privateAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 개발 환경에서 요청 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url} ${JSON.stringify(config.data)} ${JSON.stringify(config.params)}`
      );
    }
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Private Axios Response Interceptor
 * 401 에러 시 토큰 갱신 및 재요청 큐 관리
 */
privateAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러가 아니거나 이미 재시도한 경우
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 토큰 갱신 중인 경우 큐에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({resolve, reject});
      })
        .then(() => {
          const token = getAccessToken();
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return privateAxios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshTokenValue = getRefreshToken();
    if (!refreshTokenValue) {
      isRefreshing = false;
      await clearAuthState();
      return Promise.reject(error);
    }

    try {
      const validatedResponse = await refreshToken({
        refreshToken: refreshTokenValue,
      });

      setAccessToken(validatedResponse.accessToken);
      setRefreshToken(validatedResponse.refreshToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${validatedResponse.accessToken}`;
      }

      processQueue();
      isRefreshing = false;

      return privateAxios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError);
      isRefreshing = false;
      await clearAuthState();
      return Promise.reject(refreshError);
    }
  }
);
