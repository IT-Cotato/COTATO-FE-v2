'use client';

import {usePathname} from 'next/navigation';
import {AuthProvider} from '@/components/providers/AuthProvider';

interface ConditionalAuthProviderProps {
  children: React.ReactNode;
}

export const ConditionalAuthProvider = ({
  children,
}: ConditionalAuthProviderProps) => {
  const pathname = usePathname();

  // OAuth 콜백 경로에서는 AuthProvider 초기화 스킵
  if (pathname === '/oauth2/callback') {
    return <>{children}</>;
  }

  return <AuthProvider>{children}</AuthProvider>;
};
