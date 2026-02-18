import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Image from 'next/image';

interface SortableImageItemProps {
  img: {
    id: string;
    publicUrl: string;
    order: number;
  };
  onSelect: () => void;
}

export const SortableImageItem = ({img, onSelect}: SortableImageItemProps) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id: img.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='shadow-default relative aspect-204/114 w-full cursor-grab overflow-hidden rounded-[10px]'
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      role='button'
      tabIndex={0}
      aria-label={`${img.order + 1}번 이미지`}
      aria-description='엔터나 스페이스를 눌러 선택하거나, 화살표 키로 드래그하여 순서를 변경할 수 있습니다.'
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}>
      <div className='relative h-full w-full' {...attributes} {...listeners}>
        <Image
          src={img.publicUrl}
          alt=''
          fill
          sizes='204px'
          className='object-cover'
          priority={img.order <= 4}
        />
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
          <div className='flex h-14 w-15.75 items-center justify-center rounded-[10px] bg-[rgba(158,158,158,0.60)]'>
            <span className='text-h4 text-neutral-50' aria-hidden='true'>
              {img.order + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
