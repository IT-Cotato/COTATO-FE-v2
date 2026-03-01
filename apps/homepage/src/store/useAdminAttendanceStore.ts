import {create} from 'zustand';

interface AdminAttendanceState {
  attendanceId: number | null;
  selectedSessionType: 'FULL' | 'SPECIFIC';
  setAttendanceId: (attendanceId: number | null) => void;
  setSelectedSessionType: (selectedSessionType: 'FULL' | 'SPECIFIC') => void;
}

export const useAdminAttendanceStore = create<AdminAttendanceState>((set) => ({
  attendanceId: null,
  selectedSessionType: 'FULL',

  setAttendanceId: (attendanceId) =>
    set({
      attendanceId,
    }),

  setSelectedSessionType: (selectedSessionType) =>
    set({
      selectedSessionType,
    }),
}));
