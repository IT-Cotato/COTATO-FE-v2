import {useEffect, useState} from 'react';

/**
 * 주어진 값을 디바운스하여 반환하는 커스텀 훅입니다.
 *
 * 값이 변경될 때마다 지정한 지연 시간(delay) 동안 변경을 보류하고,
 * 해당 시간 동안 추가 변경이 없을 경우에만 최신 값을 반영합니다.
 *
 * 주로 자동 저장, 검색어 입력, API 호출 최적화 등에 사용됩니다.
 *
 * @template T 디바운스할 값의 타입
 * @param value 디바운스 대상 값
 * @param delay 디바운스 지연 시간(ms). 기본값은 500ms입니다.
 * @returns 지연 시간 이후에 확정된 디바운스 값
 *
 * @example
 * const debouncedText = useDebounce(text, 300);
 *
 * // text 입력이 멈춘 후 300ms 뒤에 debouncedText가 업데이트됩니다.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
