export interface SessionLocation {
  latitude: number;
  longitude: number;
}

export interface SessionAttendTime {
  attendanceEndTime: string;
  lateEndTime: string;
}

export type NewSessionData = Omit<SessionData, 'sessionId'>;

export interface SessionData {
  sessionId: number;
  date: string;
  generation: string;
  title: string;
  description: string;
  attendanceStartTime: string;
  placeName: string;
  roadNameAddress: string;
  location: SessionLocation;
  attendTime: SessionAttendTime;
  isOffline: boolean;
  isOnline: boolean;
  content: string;
}
