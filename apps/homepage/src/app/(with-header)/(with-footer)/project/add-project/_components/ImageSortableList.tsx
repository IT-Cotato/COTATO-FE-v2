import {useId} from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';
import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {restrictToParentElement} from '@dnd-kit/modifiers';
import {SortableImageItem} from './SortableImageItem';
import {ImageInfo} from '@/schemas/project/project-type';

interface ImageSortableListProps {
  images: ImageInfo[];
  sensors: SensorDescriptor<SensorOptions>[];
  onDragEnd: (event: DragEndEvent) => void;
  onSelect: (id: string) => void;
}

export const ImageSortableList = ({
  images,
  sensors,
  onDragEnd,
  onSelect,
}: ImageSortableListProps) => {
  const dndContextId = useId();

  return (
    <div
      className='project-scrollbar h-70 flex-1 overflow-y-auto rounded-[5px] pr-1.5'
      role='region'
      aria-label='업로드된 이미지 목록 (순서 변경 가능)'>
      <div className='min-h-full w-170 rounded-[5px] bg-[rgba(189,189,189,0.2)] px-2.25 py-4'>
        {images.length === 0 ? (
          <div
            className='text-body-l flex h-57 items-center justify-center text-neutral-400'
            role='status'>
            업로드한 이미지가 없습니다.
          </div>
        ) : (
          <DndContext
            id={dndContextId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToParentElement]}>
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className='grid grid-cols-[repeat(auto-fill,204px)] gap-x-6 gap-y-5'>
                {images.map((img) => (
                  <SortableImageItem
                    key={img.id}
                    img={img}
                    onSelect={() => onSelect(img.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};
