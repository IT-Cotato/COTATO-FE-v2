'use client';

import {MobileMyPageNav} from '@/app/(with-header)/mypage/_components/MyPageMobileNav';
import {ProtectedRoute} from '@/components/auth/ProtectedRoute';
import {useAuthStore} from '@/store/useAuthStore';

export const MyPageClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedRoute>
      <MobileMyPageNav isAdmin={user?.isAdmin} />
      {children}
    </ProtectedRoute>
  );
};
