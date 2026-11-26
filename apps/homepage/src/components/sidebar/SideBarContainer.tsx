'use client';

import {useAuthStore} from '@/store/useAuthStore';
import {useHomepageImagePermissionQuery} from '@/hooks/queries/useHomepageImages.query';
import {SideBar} from './SideBar';

export const SideBarContainer = () => {
  const {user, isInitialized} = useAuthStore();
  const permission = useHomepageImagePermissionQuery(
    isInitialized && user?.isAdmin === true
  );
  if (!isInitialized) return <div className='w-50' />;
  return (
    <SideBar
      isAdmin={user?.isAdmin === true}
      canManageHomepageImages={permission.data?.canEdit === true}
    />
  );
};
