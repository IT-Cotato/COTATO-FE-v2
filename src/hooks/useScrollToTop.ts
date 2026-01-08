import {useCallback, useRef, type RefObject} from 'react';

/**
 * 페이지나 특정 엘리먼트를 최상단으로 스크롤하는 함수를 반환합니다.
 * @param elementRef 스크롤할 특정 엘리먼트의 ref. 없으면 window를 스크롤합니다.
 * @returns scrollToTop 함수 - 호출 시 스크롤이 실행됩니다.
 */
export const useScrollToTop = (elementRef?: RefObject<HTMLElement>) => {
  const animationFrameIdRef = useRef<number | null>(null);

  const scrollToTop = useCallback(() => {
    // 이전 animation frame이 있으면 취소
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }

    animationFrameIdRef.current = requestAnimationFrame(() => {
      const target = elementRef?.current;

      if (target) {
        // ref로 받은 엘리먼트가 있으면, 그 엘리먼트를 스크롤
        target.scrollTo({top: 0, behavior: 'instant'});
      } else {
        // 없으면 window와 document 모두 스크롤
        window.scrollTo({top: 0, behavior: 'instant'});
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }

      animationFrameIdRef.current = null;
    });
  }, [elementRef]);

  return scrollToTop;
};
