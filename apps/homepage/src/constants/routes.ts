export const ROUTES = {
  HOME: '/',
  ABOUTUS: '/about-us',
  PROJECT: '/project',
  STUDY: '/study',
  MYPAGE: '/mypage',
  ONBOARDING: '/onboarding',
  RECRUIT: '/recruit',

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
  ADMIN_HOMEPAGE_IMAGES: '/mypage/admin/homepage-images',

  ADD_PROJECT: (editId?: number | string) =>
    editId !== undefined
      ? `/project/add-project?edit=${editId}`
      : '/project/add-project',
  ADD_STUDY: (editId?: number | string) =>
    editId !== undefined
      ? `/study/add-study?edit=${editId}`
      : '/study/add-study',
  STUDY_DETAIL: (studyId: number | string) => `/study/${studyId}`,
  PROJECT_DETAIL: (projectId: number | string) => `/project/${projectId}`,
};
