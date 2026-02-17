'use client';

import {useRef, useState} from 'react';
import Image from 'next/image';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';
import PlusIcon from '@repo/ui/assets/icons/plus-nobackground.svg';
import ThumbnailImage from '@/assets/thumbnail/thumbnail.svg';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
import {SessionImage} from '@/schemas/admin/session.schema';
import {SortableThumbnail} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SortableThumbnail';

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

  const safeIndex =
    images.length === 0 ? -1 : Math.min(currentIndex, images.length - 1);
  const currentImage = safeIndex >= 0 ? images[safeIndex] : null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {distance: 5},
    })
  );

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
    if (!isEdit || safeIndex < 0) return;
    (props as SessionImageCarouselEditProps).onChange((prev) =>
      prev
        .filter((_, i) => i !== safeIndex)
        .map((img, i) => ({...img, order: i}))
    );
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isEdit) return;
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    (props as SessionImageCarouselEditProps).onChange((prev) => {
      const oldIdx = prev.findIndex((img) => img.imageId === active.id);
      const newIdx = prev.findIndex((img) => img.imageId === over.id);
      if (oldIdx === -1 || newIdx === -1) return prev;
      return arrayMove(prev, oldIdx, newIdx).map((img, i) => ({
        ...img,
        order: i,
      }));
    });
    const newIndex = images.findIndex((img) => img.imageId === active.id);
    setCurrentIndex(newIndex);
  };

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <div className='flex flex-col'>
      {/* 큰 미리보기 영역 */}
      <div className='relative h-57.5 w-87.5 overflow-hidden rounded-[10px] bg-neutral-200'>
        {currentImage ? (
          <>
            <Image
              src={currentImage.imageUrl}
              alt={`세션 이미지 ${safeIndex + 1}`}
              fill
              sizes='350px'
              className='object-cover'
            />

            {/* X 삭제 버튼 */}
            {isEdit && (
              <button
                type='button'
                onClick={handleDelete}
                className='absolute top-3.5 right-3.5 flex h-5 w-5 cursor-pointer items-center justify-center'
                aria-label='이미지 삭제'>
                <XIcon className='h-3 w-3 text-white' />
              </button>
            )}

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
          // 이미지 없을 때 빈 상태
          <div className='flex h-full w-full items-center justify-center'>
            <ThumbnailImage />
          </div>
        )}
      </div>

      {/* 썸네일 목록 - edit 모드에서만 표시 */}
      {isEdit && (
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

            {/* 추가 버튼 - 5개 미만일 때만 */}
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
      )}
    </div>
  );
};
