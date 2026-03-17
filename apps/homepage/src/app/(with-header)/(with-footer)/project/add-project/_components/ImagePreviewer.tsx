import Image from 'next/image';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
import PlusIcon from '@repo/ui/assets/icons/plus-nobackground.svg';
import {ImageInfo} from '@/schemas/project/project-type';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';

interface ImagePreviewerProps {
  selectedImage?: ImageInfo;
  onRemove: (id: string) => void;
  index?: number;
  images?: ImageInfo[];
  onSelect?: (id: string) => void;
}

export const ImagePreviewer = ({
  selectedImage,
  onRemove,
  index = 0,
  images = [],
  onSelect,
}: ImagePreviewerProps) => {
  const currentIndex = selectedImage
    ? images.findIndex((img) => img.id === selectedImage.id)
    : 0;

  const isMultiple = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect && currentIndex > 0) {
      onSelect(images[currentIndex - 1].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect && currentIndex < images.length - 1) {
      onSelect(images[currentIndex + 1].id);
    }
  };

  return (
    <div
      className='group relative aspect-327/186 w-full overflow-hidden rounded-[10px] bg-neutral-200'
      role='region'
      aria-label={`이미지 미리보기 ${index + 1}`}>
      {selectedImage ? (
        <>
          <Image
            src={selectedImage.publicUrl}
            fill
            className='object-cover'
            alt={`${index + 1}번 이미지`}
          />
          {isMultiple && (
            <>
              <button
                type='button'
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className='absolute top-1/2 left-5.25 z-30 -translate-y-1/2 cursor-pointer disabled:opacity-30 lg:hidden'
                aria-label='이전 이미지'>
                <ChevronLeftIcon className='h-6 w-6 text-white' />
              </button>
              <button
                type='button'
                onClick={handleNext}
                disabled={currentIndex === images.length - 1}
                className='absolute top-1/2 right-5.25 z-30 -translate-y-1/2 cursor-pointer disabled:opacity-30 lg:hidden'
                aria-label='다음 이미지'>
                <ChevronRightIcon className='h-6 w-6 text-white' />
              </button>
            </>
          )}
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onRemove(selectedImage.id);
            }}
            className='absolute top-3.5 right-5.25 z-20 flex h-5.25 w-5.25 items-center justify-center rounded-full bg-neutral-800/60 active:scale-90 lg:hidden'
            aria-label='이미지 삭제'>
            <XIcon className='h-2.5 w-2.5 text-white' aria-hidden='true' />
          </button>
          <div className='pointer-events-none absolute inset-0 z-10 hidden items-center justify-center bg-black/10 opacity-0 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100 lg:flex'>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                onRemove(selectedImage.id);
              }}
              aria-label={`이미지 ${index + 1} 삭제`}
              className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(229,72,77,0.60)] p-[16px_23px] transition-all hover:bg-[rgba(229,72,77,0.80)]'>
              <XIcon className='h-5 w-5 text-white' aria-hidden='true' />
            </button>
          </div>
        </>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <div
            className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(158,158,158,0.60)] text-white'
            aria-hidden='true'>
            <PlusIcon className='h-5 w-5 text-white' />
          </div>
          <span className='sr-only'>이미지가 업로드되지 않았습니다.</span>
        </div>
      )}
    </div>
  );
};
