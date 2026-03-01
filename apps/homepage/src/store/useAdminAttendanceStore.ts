import {create} from 'zustand';

interface AdminAttendanceState {
  selectedGeneration: string;
  selectedGenerationNumber: number | null;
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
  selectedGenerationNumber: null,
  selectedSession: '세션',
  attendanceId: null,
  selectedSessionType: 'FULL',

  setSelectedGeneration: (selectedGeneration) => {
    const num = parseInt(selectedGeneration.split('기')[0]);
    set({selectedGeneration, selectedGenerationNumber: num});
  },

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
