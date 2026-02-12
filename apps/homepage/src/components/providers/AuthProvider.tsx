'use client';

import {useEffect} from 'react';
import {useAuthStore} from '@/store/useAuthStore';
import {getAccessToken} from '@/services/utils/tokenManager';
import {getMemberInfo} from '@/services/api/members/members.api';

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const {setUser, setInitialized} = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedAccessToken = getAccessToken();
      if (!storedAccessToken) {
        setInitialized(true);
        return;
      }

      try {
        const userResponse = await getMemberInfo();
        setUser(userResponse);
      } catch (error) {
        console.error('[AuthProvider - Failed to initialize auth]', error);
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [setInitialized, setUser]);

  return <>{children}</>;
};
