'use client';

import {useEffect} from 'react';

/**
 * 페이지 이탈 방지 훅
 * - isDirty가 true일 때(변경 사항이 있을 때) 브라우저 종료나 새로고침을 방지
 */
export const usePreventNavigation = (isDirty: boolean) => {
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = true;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
};
