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
  isMobile?: boolean;
}

export const SortableImageItem = ({
  img,
  onSelect,
  isMobile = false,
}: SortableImageItemProps) => {
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
      className={`shadow-default relative cursor-grab overflow-hidden rounded-[10px] ${isMobile ? 'h-20 w-20 shrink-0' : 'aspect-204/114 w-full'} `}
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
          sizes={isMobile ? '80px' : '204px'}
          className='object-cover'
          priority={img.order <= 4}
        />
        <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
          <div
            className={`flex items-center justify-center rounded-sm bg-[rgba(158,158,158,0.60)] lg:rounded-[10px] ${isMobile ? 'h-7.5 w-7.5' : 'h-14 w-15.75'} `}>
            <span
              className={`text-neutral-50 ${isMobile ? 'text-h5 font-bold' : 'text-h4'} `}
              aria-hidden='true'>
              {img.order + 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
