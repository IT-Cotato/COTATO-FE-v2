import {GetMeResponse} from '@/schemas/auth/auth-schema';
import {create} from 'zustand';

interface AuthState {
  user: GetMeResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // 로그인 성공/실패가 아니라, “판단이 끝났는지” 여부
  setUser: (user: GetMeResponse) => void;
  logout: () => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isInitialized: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    }),

  setInitialized: (value) =>
    set({
      isInitialized: value,
    }),
}));
