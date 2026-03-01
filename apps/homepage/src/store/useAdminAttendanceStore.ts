import {create} from 'zustand';

interface AdminAttendanceState {
  selectedGeneration: string;
  selectedSession: string;
  attendanceId: number | null;
  selectedSessionType: 'FULL' | 'SPECIFIC';
  setSelectedGeneration: (selectedGeneration: string) => void;
  setSelectedSession: (selectedSession: string) => void;
  setAttendanceId: (attendanceId: number | null) => void;
  setSelectedSessionType: (selectedSessionType: 'FULL' | 'SPECIFIC') => void;
}

export const useAdminAttendanceStore = create<AdminAttendanceState>((set) => ({
  selectedGeneration: '기수',
  selectedSession: '세션',
  attendanceId: null,
  selectedSessionType: 'FULL',

  setSelectedGeneration: (selectedGeneration) => set({selectedGeneration}),

  setSelectedSession: (selectedSession) => set({selectedSession}),

  setAttendanceId: (attendanceId) =>
    set({
      attendanceId,
    }),

  setSelectedSessionType: (selectedSessionType) =>
    set({
      selectedSessionType,
    }),
}));
