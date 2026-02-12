export const ROUTES = {
  HOME: '/',
  ABOUTUS: '/about-us',
  PROJECT: '/project',
  MYPAGE: '/mypage',
  ONBOARDING: '/onboarding',

  //mypage routes
  MYPAGE_ACTIVITY: '/mypage/activity',
  MYPAGE_ATTENDANCE: '/mypage/attendance',
  MYPAGE_ACCOUNT: '/mypage/account',
  MYPAGE_ACCOUNT_DELETE: '/mypage/account/delete',
  MYPAGE_TERMS: '/mypage/terms',

  //admin routes
  ADMIN_USERS: '/mypage/admin/users',
  ADMIN_APPROVALS: '/mypage/admin/approvals',
  ADMIN_SESSIONS: '/mypage/admin/sessions',
  ADMIN_ATTENDANCE: '/mypage/admin/attendance',
  ADMIN_PENALTIES: '/mypage/admin/penalties',
  ADMIN_RECRUIT: '/mypage/admin/recruit',

  ADD_PROJECT: (editId?: number | string) =>
    editId !== undefined
      ? `/project/add-project?edit=${editId}`
      : '/project/add-project',
  PROJECT_DETAIL: (projectId: number | string) => `/project/${projectId}`,
};
