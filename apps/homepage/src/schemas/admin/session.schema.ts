export interface SessionLocation {
  latitude: number;
  longitude: number;
}

export interface SessionAttendTime {
  attendanceEndTime: string;
  lateEndTime: string;
}

// 조회 시 서버에서 받는 이미지 정보
export interface SessionImage {
  imageId: number;
  imageUrl: string;
  order: number;
  s3Key?: string;
}

// 업로드 시 서버로 보내는 이미지 정보
export interface SessionImageUpload {
  s3Key: string;
  order: number;
}

export interface SessionData {
  sessionId: number;
  date: string;
  generation: string;
  title: string;
  description: string;
  attendanceStartTime: string;
  placeName: string;
  detailAddress: string;
  location?: SessionLocation;
  attendTime: SessionAttendTime;
  isOffline: boolean;
  isOnline: boolean;
  content: string;
  images: SessionImage[];
}

export interface AdminSession {
  sessionId: number;
  sessionNumber: number;
  title: string;
  imageInfos: SessionImage[];
  description: string;
  generationId: number;
  placeName: string;
  sessionDateTime: string;
  content: string;
}

export type NewSessionData = Omit<SessionData, 'sessionId'>;

export interface AdminSessionDetailResponse {
  sessionId: number;
  sessionNumber: number;
  title: string;
  sessionImages: SessionImage[];
  description: string;
  generationId: number;
  placeName: string;
  roadNameAddress: string;
  sessionDateTime: string;
  content: string;
  isOffline: boolean;
  isOnline: boolean;
  attendance?: {
    sessionId: number;
    attendanceDeadLine: string;
    lateDeadLine: string;
    location: SessionLocation;
  };
}

export interface CreateSessionRequest {
  generationId: number;
  imageInfos?: SessionImageUpload[];
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  placeName?: string;
  roadNameAddress?: string;
  attendanceStartTime: string;
  isOffline?: boolean;
  isOnline?: boolean;
  attendanceEndTime?: string;
  lateEndTime?: string;
  content?: string;
}

export interface CreateSessionResponse {
  sessionId: number;
  sessionNumber: number;
  sessionType: string;
}

export interface UpdateSessionRequest {
  sessionId: number;
  title?: string;
  description?: string;
  attendanceStartTime: string;
  placeName?: string;
  roadNameAddress?: string;
  location?: SessionLocation;
  attendTime?: SessionAttendTime;
  isOffline?: boolean;
  isOnline?: boolean;
  content?: string;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  s3Key: string;
  expireAt: string;
}

export interface CompleteImageUploadRequest {
  sessionId: number;
  s3Key: string;
  order: number;
}

export interface CompleteImageUploadResponse {
  imageId: number;
  imageUrl: string;
  order: number;
  s3Key?: string; // 새 세션 생성 시 임시 저장용 (서버 응답에는 없음)
}

export interface ChangeImageOrderRequest {
  sessionId: number;
  orderInfos: {imageId: number; order: number}[];
}

export interface DeleteSessionImageRequest {
  imageId: number;
}
