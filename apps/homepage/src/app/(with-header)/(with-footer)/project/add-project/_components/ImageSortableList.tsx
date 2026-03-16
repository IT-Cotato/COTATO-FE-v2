import {useId, useState, useEffect} from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {restrictToParentElement} from '@dnd-kit/modifiers';
import {SortableImageItem} from './SortableImageItem';
import {ImageInfo} from '@/schemas/project/project-type';
import CameraIcon from '@/assets/camera/camera.svg';

interface ImageSortableListProps {
  images: ImageInfo[];
  onDragEnd: (event: DragEndEvent) => void;
  onSelect: (id: string) => void;
  onAddClick: () => void;
}

export const ImageSortableList = ({
  images,
  onDragEnd,
  onSelect,
  onAddClick,
}: ImageSortableListProps) => {
  const dndContextId = useId();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {distance: 6},
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      className='project-scrollbar flex w-full overflow-x-auto lg:h-70 lg:overflow-y-auto lg:bg-[rgba(189,189,189,0.2)]'
      role='region'
      aria-label='업로드된 이미지 목록 (순서 변경 가능)'>
      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        modifiers={[restrictToParentElement]}>
        {/* 모바일 */}
        {isMobile ? (
          <SortableContext
            items={images}
            strategy={horizontalListSortingStrategy}>
            <div className='flex gap-2.25 overflow-x-auto pb-3'>
              <button
                type='button'
                onClick={onAddClick}
                className='flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-[10px] border border-neutral-200 bg-white'
                aria-label='이미지 추가'>
                <CameraIcon
                  className='h-6 w-6 text-neutral-200'
                  aria-hidden='true'
                />
                <span className='text-h5 font-bold text-neutral-200'>추가</span>
              </button>
              {renderSortableItems(true)}
            </div>
          </SortableContext>
        ) : (
          /* 데스크탑 */
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className='min-h-full w-full rounded-[5px] px-2.25 py-4'>
              {images.length === 0 ? (
                <div
                  className='text-body-l flex h-57 items-center justify-center text-neutral-400'
                  role='status'>
                  업로드한 이미지가 없습니다.
                </div>
              ) : (
                <div className='grid grid-cols-[repeat(auto-fill,204px)] justify-center gap-x-6 gap-y-5 pb-4'>
                  {renderSortableItems(false)}
                </div>
              )}
            </div>
          </SortableContext>
        )}
      </DndContext>
    </div>
  );
};
