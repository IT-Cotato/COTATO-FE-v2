'use client';

import {useEffect, useState} from 'react';

type KakaoLoadStatus = 'idle' | 'loading' | 'ready' | 'error';

let cachedStatus: KakaoLoadStatus = 'idle';
const listeners = new Set<(status: KakaoLoadStatus) => void>();

const notifyListeners = (status: KakaoLoadStatus) => {
  cachedStatus = status;
  listeners.forEach((fn) => fn(status));
};

const loadKakaoSDK = () => {
  if (typeof window === 'undefined') return;

  const existingScript = document.getElementById('kakao-map-sdk');

  if (existingScript) {
    if (cachedStatus === 'error') {
      existingScript.remove();
    } else {
      return;
    }
  }

  if (window.kakao?.maps?.services) {
    notifyListeners('ready');
    return;
  }

  notifyListeners('loading');

  const script = document.createElement('script');
  script.id = 'kakao-map-sdk';
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_JS_KEY}&libraries=services&autoload=false`;
  script.async = true;

  script.onload = () => {
    try {
      window.kakao.maps.load(() => {
        notifyListeners('ready');
      });
    } catch {
      notifyListeners('error');
    }
  };
  script.onerror = () => notifyListeners('error');

  document.head.appendChild(script);
};

export const useKakaoLoader = () => {
  const [status, setStatus] = useState<KakaoLoadStatus>(cachedStatus);

  useEffect(() => {
    // 이미 ready면 바로 반영
    if (cachedStatus === 'ready') {
      setStatus('ready');
      return;
    }

    const listener = (s: KakaoLoadStatus) => setStatus(s);
    listeners.add(listener);

    loadKakaoSDK();

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return status;
};
