'use client';

import {useState} from 'react';
import Image from 'next/image';
import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';
import ThumbnailImage from '@/assets/thumbnail/thumbnail.svg';
import ThumbnailMobileImage from '@/assets/thumbnail/thumbnail-mobile.svg';
import {SessionImage} from '@/schemas/admin/admin-sessions.schema';

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
    <div className='mx-auto flex w-full max-w-81.75 flex-col md:mx-0 md:w-87.5 md:max-w-none'>
      <div className='relative aspect-327/186 w-full overflow-hidden rounded-[10px] bg-neutral-200 md:aspect-auto md:h-57.5 md:w-87.5'>
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
          <>
            <div className='absolute inset-0 flex items-center justify-center md:hidden'>
              <ThumbnailMobileImage width='100%' height='100%' />
            </div>
            <div className='absolute inset-0 hidden items-center justify-center md:flex'>
              <ThumbnailImage width='100%' height='100%' />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
