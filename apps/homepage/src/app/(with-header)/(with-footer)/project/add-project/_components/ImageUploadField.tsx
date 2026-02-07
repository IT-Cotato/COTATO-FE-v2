'use client';

import {useState, useRef} from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {SortableImageItem} from './SortableImageItem';
import Image from 'next/image';
import XIcon from '@/assets/cancel/cancel.svg';
import PlusIcon from '@/assets/plus/plus.svg';
import {FullButton} from '@repo/ui/components/buttons/FullButton';

interface ImageInfo {
  id: string; // dnd-kit을 위한 고유 id
  s3Key: string;
  publicUrl: string;
  order: number;
}

export const ImageUploadField = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 8}}),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 추후 presigned url 발급 및 S3 업로드 로직 추가 예정
    const newImages = Array.from(files).map((file, index) => ({
      id: Math.random().toString(36).slice(2, 11),
      s3Key: `mock/${file.name}`,
      publicUrl: URL.createObjectURL(file), // 임시 url
      order: images.length + index + 1,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // 드래그 종료
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);

        return newArray.map((item, index) => ({...item, order: index + 1}));
      });
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      return filtered.map((item, index) => ({...item, order: index + 1}));
    });
    if (selectedIndex >= images.length - 1) setSelectedIndex(0);
  };

  return (
    <div className='flex w-full gap-4'>
      <div className='flex flex-col gap-4.75'>
        {/*이미지 미리보기 필드 */}
        <div className='group relative h-53.5 w-98.75 overflow-hidden rounded-[10px] bg-neutral-200'>
          {images.length > 0 ? (
            <>
              <Image
                src={images[selectedIndex]?.publicUrl}
                fill
                className='object-cover'
                alt='Preview'
              />
              {/* 이미지 있을 때 호버 시에만 나타나는 삭제 버튼 */}
              <div className='invisible absolute inset-0 z-10 flex items-center justify-center group-hover:visible'>
                <button
                  type='button'
                  onClick={() => removeImage(images[selectedIndex].id)}
                  className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(229,72,77,0.60)] p-[16px_23px] transition-all'>
                  <XIcon className='h-5 w-5 text-white' />
                </button>
              </div>
            </>
          ) : (
            /* 이미지가 없을 때 중앙 플러스 버튼 */
            <div className='flex h-full items-center justify-center'>
              <div className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(158,158,158,0.60)] p-[16px_23px] text-white'>
                <PlusIcon className='h-5 w-5 text-white' />
              </div>
            </div>
          )}
        </div>
        <FullButton
          label='이미지 업로드'
          labelTypo='body_l_sb'
          height={46}
          borderRadius={5}
          backgroundColor='neutral-400'
          textColor='neutral-50'
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept='image/jpg,image/png,image/jpeg'
          multiple
          onChange={handleFileChange}
        />
      </div>
      {/* 이미지 전체 보기 필드 */}
      <div className='project-scrollbar h-70 flex-1 overflow-y-auto rounded-[5px] pr-1.5'>
        <div className='min-h-full w-170 rounded-[5px] bg-[rgba(189,189,189,0.2)] px-2.25 py-4'>
          {images.length === 0 ? (
            <div className='text-body-l flex h-57 items-center justify-center text-neutral-400'>
              업로드한 이미지가 없습니다.
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}>
              <SortableContext items={images} strategy={rectSortingStrategy}>
                <div className='grid grid-cols-[repeat(auto-fill,204px)] gap-x-6 gap-y-5'>
                  {images.map((img, index) => (
                    <SortableImageItem
                      key={img.id}
                      img={img}
                      onSelect={() => setSelectedIndex(index)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};
