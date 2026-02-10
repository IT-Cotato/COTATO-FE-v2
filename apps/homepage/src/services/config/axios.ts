import axios, {AxiosInstance} from 'axios';
import {API_BASE_URL} from '@/services/constant/endpoint';

/**
 * Axios 인스턴스 생성 함수
 */
const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: API_BASE_URL,
    adapter: 'fetch',
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
 * Private Axios - 인증 필요
 */
export const privateAxios = createAxiosInstance();
