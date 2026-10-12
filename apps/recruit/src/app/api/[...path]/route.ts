import {proxyToBackend} from '@/lib/auth/bff';

/** /api/* 요청을 백엔드로 전달하는 BFF 프록시 (전용 Route Handler가 있는 경로는 그쪽이 우선) */
export {
  proxyToBackend as GET,
  proxyToBackend as POST,
  proxyToBackend as PUT,
  proxyToBackend as PATCH,
  proxyToBackend as DELETE,
};
