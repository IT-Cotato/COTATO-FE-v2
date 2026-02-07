'use client';

import {useState, useRef, useEffect} from 'react';
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
import {restrictToParentElement} from '@dnd-kit/modifiers';
import {SortableImageItem} from './SortableImageItem';
import Image from 'next/image';
import XIcon from '@/assets/cancel/cancel.svg';
import PlusIcon from '@/assets/plus/plus.svg';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {ImageInfo} from '@/schemas/project/project-type';

interface ImageUploadFieldProps {
  onImagesChange: (images: ImageInfo[]) => void;
}

export const ImageUploadField = ({onImagesChange}: ImageUploadFieldProps) => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 8}}),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
  );

  // 추후 실제 presigned url 발급 로직 연결 예정
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newUploadedImages = await Promise.all(
      Array.from(files).map(async (file) => {
        const mockS3Key = `projects/${Date.now()}-${file.name}`;
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
          id: Math.random().toString(36).slice(2, 11),
          s3Key: mockS3Key,
          publicUrl: URL.createObjectURL(file),
          order: 0,
        };
      })
    );

    setImages((prev) => {
      const updated = [
        ...prev,
        ...newUploadedImages.map((img, idx) => ({
          ...img,
          order: prev.length + idx + 1,
        })),
      ];
      if (prev.length === 0 && updated.length > 0) setSelectedId(updated[0].id);
      return updated;
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
      const updated = filtered.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      if (selectedId === id)
        setSelectedId(updated.length > 0 ? updated[0].id : null);
      return updated;
    });
  };

  const selectedImage = images.find((img) => img.id === selectedId);

  return (
    <div className='flex w-full gap-4'>
      <div className='flex flex-col gap-4.75'>
        <div className='group relative h-53.5 w-98.75 overflow-hidden rounded-[10px] bg-neutral-200'>
          {selectedImage ? (
            <>
              <Image
                src={selectedImage.publicUrl}
                fill
                className='object-cover'
                alt='Preview'
              />
              <div className='invisible absolute inset-0 z-10 flex items-center justify-center group-hover:visible'>
                <button
                  type='button'
                  onClick={() => removeImage(selectedImage.id)}
                  className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(229,72,77,0.60)] p-[16px_23px] transition-all'>
                  <XIcon className='h-5 w-5 text-white' />
                </button>
              </div>
            </>
          ) : (
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
              onDragEnd={handleDragEnd}
              modifiers={[restrictToParentElement]}>
              <SortableContext items={images} strategy={rectSortingStrategy}>
                <div className='grid grid-cols-[repeat(auto-fill,204px)] gap-x-6 gap-y-5'>
                  {images.map((img) => (
                    <SortableImageItem
                      key={img.id}
                      img={img}
                      onSelect={() => setSelectedId(img.id)}
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
