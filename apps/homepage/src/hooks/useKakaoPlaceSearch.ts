'use client';

import {useState, useCallback} from 'react';
import {useKakaoLoader} from './useKakaoLoader';

export interface Place {
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

  const search = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      if (status !== 'ready' || !window.kakao?.maps?.services) {
        setError('지도 서비스를 불러오는 중입니다.');
        return;
      }

      setError(null);
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setResults(
            data.map((place) => ({
              placeName: place.place_name,
              address: place.address_name,
              roadAddress: place.road_address_name,
              x: place.x,
              y: place.y,
            }))
          );
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
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
