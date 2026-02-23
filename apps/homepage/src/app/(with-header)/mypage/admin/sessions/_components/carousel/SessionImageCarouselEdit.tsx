'use client';

import {useRef} from 'react';
import Image from 'next/image';
import {DndContext, closestCenter} from '@dnd-kit/core';
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';
import PlusIcon from '@repo/ui/assets/icons/plus-nobackground.svg';
import ThumbnailImage from '@/assets/thumbnail/thumbnail.svg';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
import {SessionImage} from '@/schemas/admin/session.schema';
import {SortableThumbnail} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SortableThumbnail';
import {useSessionImageCarousel} from '@/app/(with-header)/mypage/admin/sessions/_hooks/useSessionImageCarousel';

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
    <div className='flex flex-col'>
      {/* 큰 미리보기 영역 */}
      <div className='relative h-57.5 w-87.5 overflow-hidden rounded-[10px] bg-neutral-200'>
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
          <div className='flex h-full w-full items-center justify-center'>
            <ThumbnailImage />
          </div>
        )}
      </div>

      {/* 썸네일 목록 */}
      <div className='mt-3.25 flex flex-col gap-3'>
        <div className='flex gap-2.25'>
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

          {/* 추가 버튼 */}
          {canAddMore && (
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-300 bg-neutral-50'
              aria-label='이미지 추가'>
              <PlusIcon className='h-5 w-5 text-neutral-600' />
              <span className='text-body-s text-neutral-600'>추가</span>
            </button>
          )}

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
