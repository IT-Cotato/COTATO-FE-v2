import Image from 'next/image';
import XIcon from '@/assets/cancel/cancel.svg';
import PlusIcon from '@/assets/plus/plus.svg';
import {ImageInfo} from '@/schemas/project/project-type';

interface ImagePreviewerProps {
  selectedImage?: ImageInfo;
  onRemove: (id: string) => void;
  index?: number;
}

export const ImagePreviewer = ({
  selectedImage,
  onRemove,
  index = 0,
}: ImagePreviewerProps) => {
  return (
    <div
      className='group relative h-53.5 w-98.75 overflow-hidden rounded-[10px] bg-neutral-200'
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
          <div className='invisible absolute inset-0 z-10 flex items-center justify-center bg-black/10 group-focus-within:visible group-hover:visible'>
            <button
              type='button'
              onClick={() => onRemove(selectedImage.id)}
              aria-label={`이미지 ${index + 1} 삭제`}
              className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(229,72,77,0.60)] p-[16px_23px] transition-all'>
              <XIcon className='h-5 w-5 text-white' aria-hidden='true' />
            </button>
          </div>
        </>
      ) : (
        <div className='flex h-full items-center justify-center'>
          <div
            className='shadow-default flex h-14 w-17.5 items-center justify-center rounded-[10px] bg-[rgba(158,158,158,0.60)] p-[16px_23px] text-white'
            aria-hidden='true'>
            <PlusIcon className='h-5 w-5 text-white' />
          </div>
          <span className='sr-only'>이미지가 업로드되지 않았습니다.</span>
        </div>
      )}
    </div>
  );
};
