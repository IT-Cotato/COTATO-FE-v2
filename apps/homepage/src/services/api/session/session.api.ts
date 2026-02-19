import {AdminSession, AdminSessionDetail} from '@/schemas/admin/session.schema';
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