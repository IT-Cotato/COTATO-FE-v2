'use client';

import {usePathname} from 'next/navigation';
import {AuthProvider} from '@/components/providers/AuthProvider';
import {ROUTES} from '@/constants/routes';

interface ConditionalAuthProviderProps {
  children: React.ReactNode;
}

export const ConditionalAuthProvider = ({
  children,
}: ConditionalAuthProviderProps) => {
  const pathname = usePathname();

  // OAuth 콜백 경로에서는 AuthProvider 초기화 스킵
  if (pathname === ROUTES.OAUTH2_CALLBACK) {
    return <>{children}</>;
  }

  return <AuthProvider>{children}</AuthProvider>;
};
