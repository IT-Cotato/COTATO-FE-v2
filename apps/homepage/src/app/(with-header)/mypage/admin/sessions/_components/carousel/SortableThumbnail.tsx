import Image from 'next/image';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {SessionImage} from '@/schemas/admin/admin-sessions.schema';

interface SortableThumbnailProps {
  image: SessionImage;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export const SortableThumbnail = ({
  image,
  index,
  isSelected,
  onClick,
}: SortableThumbnailProps) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id: image.imageId});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      type='button'
      onClick={onClick}
      className={`relative h-20 w-20 shrink-0 cursor-grab overflow-hidden rounded-[10px] border active:cursor-grabbing ${
        isSelected ? 'border-primary' : 'border-transparent'
      }`}
      aria-label={`${index + 1}번째 이미지`}>
      <Image
        src={image.imageUrl}
        alt={`썸네일 ${index + 1}`}
        fill
        sizes='80px'
        className='object-cover'
      />
      <span className='text-h5 absolute top-1/2 left-1/2 flex h-7.5 w-7.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm bg-neutral-400/60 font-bold text-white'>
        {index + 1}
      </span>
    </button>
  );
};
