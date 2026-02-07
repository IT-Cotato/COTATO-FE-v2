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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='shadow-default relative aspect-204/114 w-full cursor-grab overflow-hidden rounded-[10px]'
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}>
      <div className='relative h-full w-full' {...attributes} {...listeners}>
        <Image
          src={img.publicUrl}
          alt={`upload-${img.order}`}
          fill
          sizes='204px'
          className='object-cover'
        />
        <div className='absolute inset-0 z-10 flex items-center justify-center'>
          <div className='flex h-14 w-15.75 items-center justify-center rounded-[10px] bg-[rgba(158,158,158,0.60)]'>
            <span className='text-h4 text-neutral-50'>{img.order}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
