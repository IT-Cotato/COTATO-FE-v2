'use client';

import {useState} from 'react';
import Image from 'next/image';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';
import ThumbnailImage from '@/assets/thumbnail/thumbnail.svg';
import {SessionImage} from '@/schemas/admin/session.schema';

interface SessionImageCarouselViewProps {
  images: SessionImage[];
}

export const SessionImageCarouselView = ({
  images,
}: SessionImageCarouselViewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeIndex =
    images.length === 0 ? -1 : Math.min(currentIndex, images.length - 1);
  const currentImage = safeIndex >= 0 ? images[safeIndex] : null;

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));

  return (
    <div className='flex flex-col'>
      <div className='relative h-57.5 w-87.5 overflow-hidden rounded-[10px] bg-neutral-200'>
        {currentImage ? (
          <>
            <Image
              src={currentImage.imageUrl}
              alt={`세션 이미지 ${safeIndex + 1}`}
              fill
              sizes='350px'
              className='object-cover'
            />

            {images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className='absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer disabled:opacity-30'
                  aria-label='이전 이미지'>
                  <ChevronLeftIcon className='h-6 w-6 text-white' />
                </button>
                <button
                  type='button'
                  onClick={handleNext}
                  disabled={safeIndex === images.length - 1}
                  className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer disabled:opacity-30'
                  aria-label='다음 이미지'>
                  <ChevronRightIcon className='h-6 w-6 text-white' />
                </button>
              </>
            )}
          </>
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <ThumbnailImage />
          </div>
        )}
      </div>
    </div>
  );
};
