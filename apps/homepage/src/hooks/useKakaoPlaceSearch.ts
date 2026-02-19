'use client';

import {useState, useCallback, useRef} from 'react';
import {useKakaoLoader} from './useKakaoLoader';

export interface Place {
  id: string;
  placeName: string;
  address: string;
  roadAddress: string;
  x: string;
  y: string;
}

export const useKakaoPlaceSearch = () => {
  const status = useKakaoLoader();
  const [results, setResults] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchCountRef = useRef(0);

  const search = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      if (status === 'error') {
        setError(
          '지도 서비스를 불러오지 못했습니다. 페이지를 새로고침 해주세요.'
        );
        return;
      }

      if (status !== 'ready' || !window.kakao?.maps?.services) {
        setError('지도 서비스를 불러오는 중입니다.');
        return;
      }

      setError(null);
      const ps = new window.kakao.maps.services.Places();
      const currentCount = ++searchCountRef.current;

      ps.keywordSearch(keyword, (data, searchStatus) => {
        if (currentCount !== searchCountRef.current) return;

        if (searchStatus === window.kakao.maps.services.Status.OK) {
          setResults(
            data.map((place) => ({
              id: place.id,
              placeName: place.place_name,
              address: place.address_name,
              roadAddress: place.road_address_name,
              x: place.x,
              y: place.y,
            }))
          );
        } else if (
          searchStatus === window.kakao.maps.services.Status.ZERO_RESULT
        ) {
          setResults([]);
        } else {
          setError('검색 중 오류가 발생했습니다.');
          setResults([]);
        }
      });
    },
    [status]
  );

  return {results, search, status, error};
};
