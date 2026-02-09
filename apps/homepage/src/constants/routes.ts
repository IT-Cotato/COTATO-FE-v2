export const ROUTES = {
  HOME: '/',
  ABOUTUS: '/about-us',
  PROJECT: '/project',
  MYPAGE: '/mypage',
  ONBOARDING: '/onboarding',
  ADD_PROJECT: (editId?: number | string) =>
    editId !== undefined
      ? `/project/add-project?edit=${editId}`
      : '/project/add-project',
  PROJECT_DETAIL: (projectId: number | string) => `/project/${projectId}`,
};
