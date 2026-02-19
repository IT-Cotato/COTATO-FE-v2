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
  location: SessionLocation;
  attendTime: SessionAttendTime;
  isOffline: boolean;
  isOnline: boolean;
  content: string;
  images: SessionImage[];
}

export type NewSessionData = Omit<SessionData, 'sessionId'>;
