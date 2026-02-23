import {
  AdminSession,
  SessionData,
  AdminSessionDetailResponse,
  CreateSessionRequest,
  CreateSessionResponse,
  UpdateSessionRequest,
} from '@/schemas/admin/session.schema';
import {privateAxios} from '@/services/config/axios';
import {extractISODate, extractISOTime} from '@repo/ui/utils/date';
import {ENDPOINT} from '@/services/constant/endpoint';

/** 기수별 세션 목록 조회 */
export const getAdminSessions = async (
  generationId?: number
): Promise<AdminSession[]> => {
  const {data} = await privateAxios.get<AdminSession[]>(
    ENDPOINT.SESSIONS.ADMIN_LIST,
    {
      params: {generationId},
    }
  );
  return data;
};

/** 세션 상세 조회 (공용 API 사용) */
export const getSessionDetail = async (
  sessionId: number
): Promise<SessionData> => {
  const {data} = await privateAxios.get<AdminSessionDetailResponse>(
    ENDPOINT.SESSIONS.DETAIL(sessionId)
  );

  return {
    sessionId: data.sessionId,
    title: data.title,
    description: data.description,
    content: data.content,
    placeName: data.placeName || '',
    detailAddress: data.roadNameAddress || '',
    date: extractISODate(data.sessionDateTime),
    generation: data.generationId ? `코테이토 ${data.generationId}기` : '',
    attendanceStartTime: extractISOTime(data.sessionDateTime),
    images: data.sessionImages || [],
    location: data.attendance?.location || {latitude: 0, longitude: 0},
    attendTime: {
      attendanceEndTime: extractISOTime(data.attendance?.attendanceDeadLine),
      lateEndTime: extractISOTime(data.attendance?.lateDeadLine),
    },
    isOffline: data.isOffline,
    isOnline: data.isOnline,
  };
};

/** 세션 추가 API */
export const createSession = async (
  request: CreateSessionRequest
): Promise<CreateSessionResponse> => {
  const {data} = await privateAxios.post<CreateSessionResponse>(
    ENDPOINT.SESSIONS.ADMIN_LIST,
    request
  );
  return data;
};

/** 세션 수정 API */
export const updateSession = async (
  request: UpdateSessionRequest
): Promise<void> => {
  await privateAxios.patch(ENDPOINT.SESSIONS.ADMIN_LIST, request);
};
