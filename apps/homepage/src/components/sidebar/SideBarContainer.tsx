'use client';

import {useAuthStore} from '@/store/useAuthStore';
import {SideBar} from './SideBar';

export const SideBarContainer = () => {
  const {user, isInitialized} = useAuthStore();
  if (!isInitialized) return <div className='w-50' />;
  return <SideBar isAdmin={user?.isAdmin === true} />;
};
