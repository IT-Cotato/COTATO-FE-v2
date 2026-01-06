import {GetMeResponse} from '@/services/types/auth.types';
import {create} from 'zustand';

interface AuthState {
  user: GetMeResponse | null;
  isAuthenticated: boolean;
  setUser: (user: GetMeResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
