'use client';

import {useRef, useState} from 'react';
import Image from 'next/image';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';
import PlusIcon from '@repo/ui/assets/icons/plus-nobackground.svg';
import ThumbnailImage from '@/assets/thumbnail/thumbnail.svg';
import XIcon from '@/assets/cancel/cancel.svg';
import {SessionImage} from '@/schemas/admin/session.schema';

const MAX_IMAGES = 5;

interface SessionImageCarouselViewProps {
  mode: 'view';
  images: SessionImage[];
}

interface SessionImageCarouselEditProps {
  mode: 'edit';
  images: SessionImage[];
  onChange: (updater: (prev: SessionImage[]) => SessionImage[]) => void;
}

type SessionImageCarouselProps =
  | SessionImageCarouselViewProps
  | SessionImageCarouselEditProps;

export const SessionImageCarousel = (props: SessionImageCarouselProps) => {
  const {images} = props;
  const isEdit = props.mode === 'edit';

  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // currentIndex가 images 범위를 벗어나지 않도록 보정
  const safeIndex = Math.min(currentIndex, images.length - 1);
  const currentImage = images[safeIndex] ?? null;

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));

  const handleThumbnailClick = (index: number) => setCurrentIndex(index);

  const handleAdd = (file: File) => {
    if (!isEdit) return;
    // TODO: API 연동 시 presigned-url 발급 후 S3 업로드로 교체
    const url = URL.createObjectURL(file);
    const newImage: SessionImage = {
      imageId: Date.now(), // 임시 id (API 연동 시 서버에서 받은 id로 교체)
      imageUrl: url,
      order: images.length,
    };
    (props as SessionImageCarouselEditProps).onChange((prev) => [
      ...prev,
      newImage,
    ]);
    setCurrentIndex(images.length);
  };

  const handleDelete = () => {
    if (!isEdit) return;
    (props as SessionImageCarouselEditProps).onChange((prev) =>
      prev
        .filter((_, i) => i !== safeIndex)
        .map((img, i) => ({...img, order: i}))
    );
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <div className='flex flex-col'>
      <div className='relative h-57.5 w-87.5 overflow-hidden rounded-[10px] bg-neutral-200'>
        {currentImage ? (
          <>
            <Image
              src={currentImage.imageUrl}
              alt={`세션 이미지 ${safeIndex + 1}`}
              fill
              className='object-cover'
            />

            {isEdit && (
              <button
                type='button'
                onClick={handleDelete}
                className='absolute top-3.5 right-3.5 flex h-5 w-5 cursor-pointer items-center justify-center'
                aria-label='이미지 삭제'>
                <XIcon className='h-3 w-3' />
              </button>
            )}

            {images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className='absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer disabled:opacity-30'
                  aria-label='이전 이미지'>
                  <ChevronLeftIcon className='h-6 w-6 text-white' />
                </button>
                <button
                  type='button'
                  onClick={handleNext}
                  disabled={safeIndex === images.length - 1}
                  className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer disabled:opacity-30'
                  aria-label='다음 이미지'>
                  <ChevronRightIcon className='h-6 w-6 text-white' />
                </button>
              </>
            )}
          </>
        ) : (
          // 이미지 없을 때 썸네일 표시
          <div className='flex h-full w-full items-center justify-center'>
            <ThumbnailImage />
          </div>
        )}
      </div>

      {/* 썸네일 목록 */}
      {isEdit && (
        <div className='mt-[13px] flex gap-[9px]'>
          {/* 썸네일들 */}
          {images.map((image, index) => (
            <button
              key={image.imageId}
              type='button'
              onClick={() => handleThumbnailClick(index)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                index === safeIndex ? 'border-primary' : 'border-transparent'
              }`}
              aria-label={`${index + 1}번째 이미지`}>
              <Image
                src={image.imageUrl}
                alt={`썸네일 ${index + 1}`}
                fill
                className='object-cover'
              />
            </button>
          ))}

          {isEdit && canAddMore && (
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-300 bg-neutral-50'
              aria-label='이미지 추가'>
              <PlusIcon className='h-5 w-5 text-neutral-600' />
              <span className='text-body-s text-neutral-600'>추가</span>
            </button>
          )}

          {isEdit && (
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAdd(file);
                e.target.value = '';
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
