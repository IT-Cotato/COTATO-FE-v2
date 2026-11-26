'use client';

import {usePathname} from 'next/navigation';
import {useLogoutMutation} from '@/hooks/mutations/auth/useAuth.mutations';
import {SideBarView} from './SideBarView';

interface SideBarProps {
  isAdmin?: boolean;
  canManageHomepageImages?: boolean;
}

/** 기존 로그인 상태와 로그아웃 동작을 유지하며 공통 마이페이지 메뉴를 표시한다. */
export const SideBar = ({
  isAdmin = false,
  canManageHomepageImages = false,
}: SideBarProps) => {
  const pathname = usePathname();
  const {mutate: logout} = useLogoutMutation();

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
    }
  };

  return (
    <SideBarView
      isAdmin={isAdmin}
      canManageHomepageImages={canManageHomepageImages}
      pathname={pathname}
      onLogout={handleLogout}
    />
  );
};
