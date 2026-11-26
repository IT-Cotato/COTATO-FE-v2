'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {
  HomepageImageFrameMessageSchema,
  type HomepageImageFrameMessage,
} from '@/schemas/homepage-image-frame.schema';
import type {
  HomepageImageCrop,
  HomepageImageSlot,
} from '@/schemas/homepage-images.schema';

/** 창 크기가 아닌 선택한 홈페이지 너비에서 측정한 사진 영역과 실제 CSS 크롭을 편집창에 연결한다. */
export const useHomepageImageFrame = (
  slot: HomepageImageSlot,
  source: string,
  desktop: HomepageImageCrop,
  mobile: HomepageImageCrop
) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 1024 ? 375 : 1440
  );
  const [frame, setFrame] = useState<HomepageImageFrameMessage | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState('');
  const sendDraft = useCallback(() => {
    iframe.current?.contentWindow?.postMessage(
      {type: 'homepage-image-draft', slot, source, desktop, mobile},
      window.location.origin
    );
  }, [slot, source, desktop, mobile]);
  const current =
    frame?.slot === slot && Math.abs(frame.viewportWidth - viewportWidth) <= 1
      ? frame
      : null;
  const desired = current?.mode === 'mobile' ? mobile : desktop;
  const synced = Boolean(
    current &&
    current.source === source &&
    current.imageReady &&
    Math.abs(current.crop.x - desired.x) < 0.02 &&
    Math.abs(current.crop.y - desired.y) < 0.02 &&
    Math.abs(current.crop.zoom - desired.zoom) < 0.002
  );

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframe.current?.contentWindow
      )
        return;
      const parsed = HomepageImageFrameMessageSchema.safeParse(event.data);
      if (
        !parsed.success ||
        parsed.data.slot !== slot ||
        Math.abs(parsed.data.viewportWidth - viewportWidth) > 1
      )
        return;
      setFrame((previous) =>
        JSON.stringify(previous) === JSON.stringify(parsed.data)
          ? previous
          : parsed.data
      );
      sendDraft();
    };
    window.addEventListener('message', receive);
    sendDraft();
    return () => window.removeEventListener('message', receive);
  }, [slot, viewportWidth, sendDraft, attempt]);

  useEffect(() => {
    setError('');
    if (synced) return;
    const timer = window.setTimeout(
      () =>
        setError(
          '홈페이지 사진 영역을 불러오지 못했습니다. 다시 시도해 주세요.'
        ),
      10000
    );
    return () => window.clearTimeout(timer);
  }, [slot, viewportWidth, source, attempt, synced]);

  const retry = () => {
    setFrame(null);
    setAttempt((value) => value + 1);
  };
  return {
    iframe,
    viewportWidth,
    setViewportWidth,
    frame: current,
    synced,
    error,
    retry,
    attempt,
    onLoad: sendDraft,
  };
};
