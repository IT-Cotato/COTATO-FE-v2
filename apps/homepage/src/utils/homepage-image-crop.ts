import type {CSSProperties} from 'react';
import type {HomepageImageCrop} from '@/schemas/homepage-images.schema';

export const clampImagePosition = (value: number) =>
  Math.min(100, Math.max(0, value));

/** 사진 위치와 확대의 기준점을 일치시켜 편집 미리보기와 공개 화면에 같은 크롭을 적용한다. */
export const homepageImageCropStyle = (
  crop: HomepageImageCrop
): CSSProperties => ({
  objectFit: 'cover',
  objectPosition: `${crop.x}% ${crop.y}%`,
  transform: `scale(${crop.zoom})`,
  transformOrigin: `${crop.x}% ${crop.y}%`,
});

export const draggedHomepageImageCrop = (
  crop: HomepageImageCrop,
  natural: {width: number; height: number},
  frame: {width: number; height: number},
  delta: {x: number; y: number}
): HomepageImageCrop => {
  if (!natural.width || !natural.height || !frame.width || !frame.height)
    return crop;
  const fit =
    Math.max(frame.width / natural.width, frame.height / natural.height) *
    crop.zoom;
  const overflowX = natural.width * fit - frame.width;
  const overflowY = natural.height * fit - frame.height;
  return {
    ...crop,
    x:
      overflowX > 0.01
        ? clampImagePosition(crop.x - (delta.x / overflowX) * 100)
        : crop.x,
    y:
      overflowY > 0.01
        ? clampImagePosition(crop.y - (delta.y / overflowY) * 100)
        : crop.y,
  };
};

/** 브라우저에서 크기를 제한하고 재인코딩해 큰 원본을 서버에서 디코딩하지 않도록 한다. */
export const prepareHomepageImageFile = async (file: File): Promise<File> => {
  if (
    !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
    file.size === 0 ||
    file.size > 8 * 1024 * 1024
  )
    throw new Error('8MB 이하의 JPG, PNG, WEBP 파일을 선택해 주세요.');
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error(
      '사진을 읽지 못했습니다. 올바른 이미지 파일을 선택해 주세요.'
    );
  });
  try {
    const scale = Math.min(1, 2560 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context)
      throw new Error(
        '사진을 준비하지 못했습니다. 다른 브라우저에서 다시 시도해 주세요.'
      );
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (value) =>
          value
            ? resolve(value)
            : reject(new Error('사진을 준비하지 못했습니다.')),
        'image/webp',
        0.9
      )
    );
    if (blob.size > 8 * 1024 * 1024)
      throw new Error('사진 용량이 큽니다. 더 작은 사진을 선택해 주세요.');
    return new File([blob], 'homepage-image.webp', {type: 'image/webp'});
  } finally {
    bitmap.close();
  }
};
