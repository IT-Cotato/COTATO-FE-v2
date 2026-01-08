import {useEffect, type RefObject} from 'react';

/**
 * 의존성이 변경될 때마다 페이지나 특정 엘리먼트를 최상단으로 스크롤합니다.
 * @param dependencies 스크롤을 트리거할 의존성 배열
 * @param elementRef 스크롤할 특정 엘리먼트의 ref. 없으면 window를 스크롤합니다.
 */
export const useScrollToTop = (
  dependencies: React.DependencyList = [],
  elementRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      const target = elementRef?.current;

      if (target) {
        // ref로 받은 엘리먼트가 있으면, 그 엘리먼트를 스크롤
        target.scrollTo({top: 0});
      } else {
        // 없으면 window를 스크롤
        window.scrollTo({top: 0});
      }
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, [...dependencies, elementRef]);
};
