import {
  AdminSession,
  AdminSessionSchema,
  SessionData,
  AdminSessionDetailResponse,
  AdminSessionDetailResponseSchema,
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionResponseSchema,
  UpdateSessionRequest,
  PresignedUrlRequest,
  PresignedUrlResponse,
  PresignedUrlResponseSchema,
  CompleteImageUploadRequest,
  CompleteImageUploadResponse,
  CompleteImageUploadResponseSchema,
  ChangeImageOrderRequest,
  DeleteSessionImageRequest,
} from '@/schemas/admin/session.schema';
import {privateAxios} from '@/services/config/axios';
import {extractISODate, extractISOTime} from '@repo/ui/utils/date';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

const mapToSessionData = (data: AdminSessionDetailResponse): SessionData => ({
  sessionId: data.sessionId,
  title: data.title,
  description: data.description,
  content: data.content,
  placeName: data.placeName || '',
  detailAddress: data.roadNameAddress || '',
  date: extractISODate(data.sessionDateTime),
  generation: data.generationId ? `코테이토 ${data.generationId}기` : '',
  attendanceStartTime: extractISOTime(data.sessionDateTime),
  images: data.sessionImages?.slice().sort((a, b) => a.order - b.order) || [],
  location: data.attendance?.location || {latitude: 0, longitude: 0},
  attendTime: {
    attendanceEndTime: extractISOTime(data.attendance?.attendanceDeadLine),
    lateEndTime: extractISOTime(data.attendance?.lateDeadLine),
  },
  isOffline: data.isOffline,
  isOnline: data.isOnline,
});

/** 기수별 세션 목록 조회 */
export const getAdminSessions = async (
  generationId?: number
): Promise<AdminSession[]> => {
  try {
    const {data} = await privateAxios.get<AdminSession[]>(
      ENDPOINT.SESSIONS.ADMIN_LIST,
      {
        params: {generationId},
      }
    );
    return AdminSessionSchema.array().parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 세션 상세 조회 (공용 API 사용) */
export const getSessionDetail = async (
  sessionId: number
): Promise<SessionData> => {
  try {
    const {data} = await privateAxios.get<AdminSessionDetailResponse>(
      ENDPOINT.SESSIONS.DETAIL(sessionId)
    );
    const parsed = AdminSessionDetailResponseSchema.parse(data);
    return mapToSessionData(parsed);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 세션 추가 API */
export const createSession = async (
  request: CreateSessionRequest
): Promise<CreateSessionResponse> => {
  try {
    const {data} = await privateAxios.post<CreateSessionResponse>(
      ENDPOINT.SESSIONS.ADMIN_LIST,
      request
    );
    return CreateSessionResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 세션 수정 API */
export const updateSession = async (
  request: UpdateSessionRequest
): Promise<void> => {
  try {
    await privateAxios.patch(ENDPOINT.SESSIONS.ADMIN_LIST, request);
  } catch (error) {
    return handleApiError(error);
  }
};

/** presigned URL 발급 */
export const getPresignedUrl = async (
  request: PresignedUrlRequest
): Promise<PresignedUrlResponse> => {
  try {
    const {data} = await privateAxios.post<PresignedUrlResponse>(
      ENDPOINT.SESSIONS.IMAGE.PRESIGNED_URL,
      request
    );
    return PresignedUrlResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** S3에 직접 업로드 */
export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  const contentType = file.type || 'application/octet-stream';
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {'Content-Type': contentType},
  });

  if (!response.ok) {
    throw new Error('S3 업로드 실패');
  }

  return true;
};

/** 이미지 업로드 완료 알림 */
export const completeImageUpload = async (
  request: CompleteImageUploadRequest
): Promise<CompleteImageUploadResponse> => {
  try {
    const {data} = await privateAxios.post<CompleteImageUploadResponse>(
      ENDPOINT.SESSIONS.IMAGE.COMPLETE,
      request
    );
    return CompleteImageUploadResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 이미지 순서 변경 */
export const changeImageOrder = async (
  request: ChangeImageOrderRequest
): Promise<void> => {
  try {
    await privateAxios.patch(ENDPOINT.SESSIONS.IMAGE.ORDER, request);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 이미지 삭제 */
export const deleteSessionImage = async (
  request: DeleteSessionImageRequest
): Promise<void> => {
  try {
    await privateAxios.delete(ENDPOINT.SESSIONS.IMAGE.DELETE, {
      data: request,
    });
  } catch (error) {
    return handleApiError(error);
  }
};

/** 세션 삭제 API */
export const deleteSession = async (sessionId: number): Promise<void> => {
  await privateAxios.delete(ENDPOINT.SESSIONS.DELETE(sessionId));
};
