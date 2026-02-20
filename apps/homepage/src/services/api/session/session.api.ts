import {AdminSession, AdminSessionDetail, CreateSessionRequest, CreateSessionResponse, UpdateSessionRequest} from '@/schemas/admin/session.schema';
import {privateAxios, publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';

/** 기수별 세션 목록 조회 */
export const getAdminSessions = async (
  generationId?: number
): Promise<AdminSession[]> => {
  const {data} = await privateAxios.get(ENDPOINT.SESSIONS.ADMIN_LIST, {
    params: {generationId},
  });
  return data;
};

/** 세션 상세 조회 (공용 API 사용) */
export const getSessionDetail = async (
  sessionId: number
): Promise<AdminSessionDetail> => {
  const {data} = await publicAxios.get(ENDPOINT.SESSIONS.DETAIL(sessionId));
  return data;
};

/** 세션 추가 API */
export const createSession = async (
  request: CreateSessionRequest
): Promise<CreateSessionResponse> => {
  const {data} = await privateAxios.post(ENDPOINT.SESSIONS.ADMIN_LIST, request);
  return data;
};

/** 세션 수정 API */
export const updateSession = async (
  request: UpdateSessionRequest
): Promise<void> => {
  await privateAxios.patch(ENDPOINT.SESSIONS.ADMIN_LIST, request);
};