'use client';

import {useRef} from 'react';
import Image from 'next/image';
import {DndContext, closestCenter} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';
import CameraIcon from '@/assets/camera/camera.svg';
import ThumbnailImage from '@/assets/thumbnail/thumbnail.svg';
import ThumbnailMobileImage from '@/assets/thumbnail/thumbnail-mobile.svg';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
import {SessionImage} from '@/schemas/admin/admin-sessions.schema';
import {SortableThumbnail} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SortableThumbnail';
import {
  MAX_IMAGES,
  useSessionImageCarousel,
} from '@/app/(with-header)/mypage/admin/sessions/_hooks/useSessionImageCarousel';
import clsx from 'clsx';

interface SessionImageCarouselEditProps {
  sessionId: number;
  images: SessionImage[];
  onChange: (updater: (prev: SessionImage[]) => SessionImage[]) => void;
}

export const SessionImageCarouselEdit = ({
  sessionId,
  images,
  onChange,
}: SessionImageCarouselEditProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    safeIndex,
    currentImage,
    canAddMore,
    sensors,
    handlePrev,
    handleNext,
    handleThumbnailClick,
    handleAdd,
    handleDelete,
    handleDragEnd,
  } = useSessionImageCarousel({sessionId, images, onChange});

  return (
    <div className='mx-auto flex w-full max-w-81.75 flex-col md:mx-0 md:w-87.5 md:max-w-none'>
      {/* 큰 미리보기 영역 */}
      <div className='relative aspect-327/186 w-full overflow-hidden rounded-[10px] bg-neutral-200 md:aspect-auto md:h-57.5 md:w-87.5'>
        {currentImage ? (
          <>
            {currentImage.imageId < 0 ? (
              // 새 세션 임시 이미지: blob URL이므로 일반 img 태그 사용
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentImage.imageUrl}
                alt={`세션 이미지 ${safeIndex + 1}`}
                className='h-full w-full object-cover'
              />
            ) : (
              <Image
                src={currentImage.imageUrl}
                alt={`세션 이미지 ${safeIndex + 1}`}
                fill
                sizes='350px'
                className='object-cover'
              />
            )}

            {/* X 삭제 버튼 */}
            <button
              type='button'
              onClick={handleDelete}
              className='absolute top-3.5 right-3.5 flex h-5 w-5 cursor-pointer items-center justify-center'
              aria-label='이미지 삭제'>
              <XIcon className='h-3 w-3 text-white' />
            </button>

            {/* 좌우 chevron */}
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
          <>
            <div className='absolute inset-0 flex items-center justify-center md:hidden'>
              <ThumbnailMobileImage width='100%' height='100%' />
            </div>
            <div className='absolute inset-0 hidden items-center justify-center md:flex'>
              <ThumbnailImage width='100%' height='100%' />
            </div>
          </>
        )}
      </div>

      {/* 썸네일 목록 */}
      <div className='mt-3.25 flex flex-col gap-3'>
        <div className='session-scrollbar flex gap-2.25 overflow-x-scroll pb-2'>
          {/* 추가 버튼 */}
          <button
            type='button'
            onClick={() => {
              if (!canAddMore) {
                alert(`이미지는 최대 ${MAX_IMAGES}장까지 추가할 수 있습니다.`);
                return;
              }
              fileInputRef.current?.click();
            }}
            title={`최대 ${MAX_IMAGES}장`}
            aria-disabled={!canAddMore}
            className={clsx(
              'flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-neutral-200',
              {
                'cursor-pointer': canAddMore,
                'cursor-not-allowed opacity-50': !canAddMore,
              }
            )}
            aria-label='이미지 추가'>
            <CameraIcon className='h-5 w-5 text-neutral-600' />
            <span className='text-h5 text-neutral-200'>추가</span>
          </button>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={images.map((img) => img.imageId)}
              strategy={horizontalListSortingStrategy}>
              {images.map((image, index) => (
                <SortableThumbnail
                  key={image.imageId}
                  image={image}
                  index={index}
                  isSelected={index === safeIndex}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* 숨겨진 파일 input */}
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
        </div>
        <p className='text-body-l text-center text-neutral-600'>
          드래그로 순서를 변경하세요.
        </p>
      </div>
    </div>
  );
};
