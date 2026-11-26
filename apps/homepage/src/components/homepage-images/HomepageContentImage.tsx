'use client';

import Image from 'next/image';
import {useHomepageImageDraft} from './HomepageImageDraftContext';
import type {CSSProperties} from 'react';
import {useHomepageImagesQuery} from '@/hooks/queries/useHomepageImages.query';
import {CENTERED_IMAGE_CROP} from '@/constants/homepage-images';
import {HOMEPAGE_IMAGE_PREVIEW_ENABLED} from './HomepageImagePreviewContext';
import type {HomepageImageSlot} from '@/schemas/homepage-images.schema';
import styles from './HomepageContentImage.module.css';

interface HomepageContentImageProps {
  slot?: HomepageImageSlot;
  fallbackSrc: string;
  alt: string;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
  desktopFrom?: 'lg' | 'xl';
}

/** 기존 사진 프레임과 효과를 유지하며, 저장된 PC·모바일 크롭만 공통 방식으로 적용한다. */
export const HomepageContentImage = ({
  slot,
  fallbackSrc,
  alt,
  className = '',
  priority = false,
  unoptimized = false,
  desktopFrom = 'xl',
}: HomepageContentImageProps) => {
  const {data} = useHomepageImagesQuery(Boolean(slot));
  const image = data?.find((value) => value.slot === slot);
  const candidate = useHomepageImageDraft();
  const draft = candidate?.slot === slot ? candidate : undefined;
  const desktop = draft?.desktop ?? image?.desktop ?? CENTERED_IMAGE_CROP;
  const mobile = draft?.mobile ?? image?.mobile ?? CENTERED_IMAGE_CROP;
  const variables = {
    '--crop-desktop-position': `${desktop.x}% ${desktop.y}%`,
    '--crop-desktop-zoom': desktop.zoom,
    '--crop-mobile-position': `${mobile.x}% ${mobile.y}%`,
    '--crop-mobile-zoom': mobile.zoom,
  } as CSSProperties;
  return (
    <Image
      src={draft?.source ?? image?.imageUrl ?? fallbackSrc}
      data-homepage-image-slot={slot}
      alt={alt}
      fill
      priority={priority}
      sizes='(min-width: 1280px) 960px, 100vw'
      unoptimized={
        unoptimized || HOMEPAGE_IMAGE_PREVIEW_ENABLED || Boolean(draft)
      }
      className={`${styles.image} ${desktopFrom === 'lg' ? styles.desktopLg : styles.desktopXl} ${className}`}
      style={variables}
    />
  );
};
