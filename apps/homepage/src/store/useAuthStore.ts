import {MemberInfo} from '@/schemas/members/members.schema';
import {create} from 'zustand';

interface AuthState {
  user: MemberInfo | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: MemberInfo) => void;
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
