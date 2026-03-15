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
  onAddClick: () => void;
}

export const ImageSortableList = ({
  images,
  sensors,
  onDragEnd,
  onSelect,
  onAddClick,
}: ImageSortableListProps) => {
  const dndContextId = useId();

  const renderSortableItems = (isMobile: boolean) =>
    images.map((img) => (
      <SortableImageItem
        key={img.id}
        img={img}
        onSelect={() => onSelect(img.id)}
        isMobile={isMobile}
      />
    ));

  return (
    <div
      className='project-scrollbar flex w-full overflow-x-auto lg:h-70 lg:overflow-y-auto'
      role='region'
      aria-label='업로드된 이미지 목록 (순서 변경 가능)'>
      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        modifiers={[restrictToParentElement]}>
        <SortableContext items={images} strategy={rectSortingStrategy}>
          {/* 모바일 */}
          <div className='flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:hidden'>
            <button
              type='button'
              onClick={onAddClick}
              className='flex h-20 w-20 shrink-0 items-center justify-center rounded-[10px] border border-neutral-300'>
              추가
            </button>
            {renderSortableItems(true)}
          </div>
          {/* 데스크탑 */}
          <div className='hidden min-h-full w-full rounded-[5px] bg-[rgba(189,189,189,0.2)] px-2.25 py-4 lg:block'>
            {images.length === 0 ? (
              <div
                className='text-body-l flex h-57 items-center justify-center text-neutral-400'
                role='status'>
                업로드한 이미지가 없습니다.
              </div>
            ) : (
              <div className='grid grid-cols-[repeat(auto-fill,204px)] gap-x-6 gap-y-5'>
                {renderSortableItems(false)}
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
