'use client';

import {useEffect, useState} from 'react';

const DEFAULT_MOBILE_BREAKPOINT = 1024;

export const useIsMobile = (breakpoint = DEFAULT_MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return {isMobile, mounted};
};
