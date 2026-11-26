'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {HomeContentLayout} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeContentLayout';
import {HomeMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeMainScheduleContainer';
import {HomePartSectionContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomePartSectionContainer';
import {
  CENTERED_IMAGE_CROP,
  getHomepageImageDefinition,
} from '@/constants/homepage-images';
import {API_BASE_URL} from '@/services/constant/endpoint';
import {
  HomepageImageDraftMessageSchema,
  type HomepageImageDraftMessage,
} from '@/schemas/homepage-image-frame.schema';
import type {HomepageImageSlot} from '@/schemas/homepage-images.schema';
import {HomepageImageDraftContext} from './HomepageImageDraftContext';
import {
  HomepageImagePreviewContext,
  HOMEPAGE_IMAGE_PREVIEW_ENABLED,
} from './HomepageImagePreviewContext';

/** 실제 홈 부품의 반응형 레이아웃·마스크·텍스트를 iframe에서 재사용하며 미저장 초안을 화면에만 적용한다. */
export const HomepageImageFrameProbe = ({slot}: {slot: HomepageImageSlot}) => {
  const root = useRef<HTMLElement>(null);
  const definition = getHomepageImageDefinition(slot);
  const [draft, setDraft] = useState<HomepageImageDraftMessage>({
    type: 'homepage-image-draft',
    slot,
    source: definition.fallback,
    desktop: {...CENTERED_IMAGE_CROP},
    mobile: {...CENTERED_IMAGE_CROP},
  });
  const part =
    slot === 'PART_DESIGN'
      ? 'design'
      : slot === 'PART_FRONTEND'
        ? 'frontend'
        : slot === 'PART_BACKEND'
          ? 'backend'
          : 'pm';

  const measure = useCallback(() => {
    if (!root.current || window.parent === window) return;
    const image = Array.from(
      root.current.querySelectorAll<HTMLImageElement>(
        'img[data-homepage-image-slot]'
      )
    ).find(
      (value) =>
        value.dataset.homepageImageSlot === slot &&
        value.getBoundingClientRect().width > 0
    );
    if (!image?.parentElement) return;
    // 1. 최초 진입 애니메이션 대신 실제 표시가 완료된 상태를 측정한다. 사진 자체의 크롭 transform은 유지한다.
    root.current.querySelectorAll<HTMLElement>('[style]').forEach((element) => {
      if (
        element.tagName !== 'IMG' &&
        (element.style.opacity ||
          element.style.transform ||
          element.style.filter)
      ) {
        element.dataset.photoPreviewStill = 'true';
      }
    });
    const active = image.closest<HTMLElement>('[role="button"]');
    if (active) active.dataset.photoPreviewActive = 'true';
    const bounds = image.parentElement.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const style = getComputedStyle(image);
    const mode = style.getPropertyValue('--homepage-crop-device').trim();
    if (mode !== 'desktop' && mode !== 'mobile') return;
    const positions = style.objectPosition.split(' ').map(parseFloat);
    const zoom =
      style.transform === 'none' ? 1 : new DOMMatrixReadOnly(style.transform).a;
    const expected = new URL(draft.source, window.location.origin).href;
    const actual = new URL(
      image.currentSrc || image.src,
      window.location.origin
    ).href;
    // 2. 같은 출처의 편집창에만 치수와 실제 CSS 적용 결과를 보낸다. 저장 작업은 없다.
    window.parent.postMessage(
      {
        type: 'homepage-image-frame',
        slot,
        source: draft.source,
        viewportWidth: window.innerWidth,
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
        mode,
        crop: {x: positions[0], y: positions[1], zoom},
        imageReady:
          actual === expected && image.complete && image.naturalWidth > 0,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      },
      window.location.origin
    );
  }, [draft.source, slot]);

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== window.parent ||
        window.parent === window
      )
        return;
      const parsed = HomepageImageDraftMessageSchema.safeParse(event.data);
      if (!parsed.success || parsed.data.slot !== slot) return;
      let url: URL;
      try {
        url = new URL(parsed.data.source, window.location.origin);
      } catch {
        return;
      }
      const localApi = new URL(API_BASE_URL);
      const allowed =
        (url.protocol === 'blob:' && url.origin === window.location.origin) ||
        (url.origin === window.location.origin &&
          url.pathname.startsWith('/images/')) ||
        (url.protocol === 'https:' &&
          url.hostname === 'storage.googleapis.com' &&
          url.pathname.includes('/homepage/')) ||
        (HOMEPAGE_IMAGE_PREVIEW_ENABLED &&
          url.origin === localApi.origin &&
          url.pathname === '/v1/api/homepage-images/local-file');
      if (!allowed) return;
      setDraft((previous) =>
        JSON.stringify(previous) === JSON.stringify(parsed.data)
          ? previous
          : parsed.data
      );
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [slot]);

  useEffect(() => {
    const observer = new ResizeObserver(measure);
    if (root.current) observer.observe(root.current);
    window.addEventListener('resize', measure);
    document.addEventListener('load', measure, true);
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
      document.removeEventListener('load', measure, true);
    };
  }, [measure, draft]);

  return (
    <HomepageImagePreviewContext.Provider
      value={HOMEPAGE_IMAGE_PREVIEW_ENABLED ? 'current-operation' : undefined}>
      <HomepageImageDraftContext.Provider value={draft}>
        <style>{`
          [data-photo-preview-still] {opacity:1!important;transform:none!important;filter:none!important;transition:none!important;animation:none!important}
          [data-photo-preview-active] [class~="group-hover:opacity-100"] {opacity:1!important}
          [data-photo-preview-active] [class~="group-hover:opacity-0"] {opacity:0!important}
          [data-photo-preview-active] [class~="group-hover:text-white"] {color:white!important}
        `}</style>
        <main ref={root}>
          <HomeContentLayout>
            {definition.group === 'part' ? (
              <HomePartSectionContainer initialPart={part} />
            ) : (
              <HomeMainScheduleContainer />
            )}
          </HomeContentLayout>
        </main>
      </HomepageImageDraftContext.Provider>
    </HomepageImagePreviewContext.Provider>
  );
};
