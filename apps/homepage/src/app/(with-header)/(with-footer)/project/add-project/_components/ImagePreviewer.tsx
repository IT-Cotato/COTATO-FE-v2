import Image from 'next/image';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
import PlusIcon from '@/assets/plus/plus.svg';
import {ImageInfo} from '@/schemas/project/project-type';

interface ImagePreviewerProps {
  selectedImage?: ImageInfo;
  onRemove: (id: string) => void;
}

export const ImagePreviewer = ({
  selectedImage,
  onRemove,
}: ImagePreviewerProps) => {
  return (
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
              onClick={() => onRemove(selectedImage.id)}
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
  );
};
