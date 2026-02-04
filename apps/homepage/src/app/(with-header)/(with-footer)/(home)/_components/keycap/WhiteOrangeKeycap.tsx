import Image from 'next/image';
import WhiteOrangeKeycapEnter from '@/assets/home/keycap/white-orange-enter-keycap.svg';

interface WhiteOrangeKeycapProps {
  imageSrc: string;
  imageSecondSrc: string;
  title: string;
  secondTitle: string;
  subTitle: string;
  secondSubTitle: string;
}

export const WhiteOrangeKeycap = ({
  imageSrc,
  imageSecondSrc,
  title,
  secondTitle,
  subTitle,
  secondSubTitle,
}: WhiteOrangeKeycapProps) => {
  return (
    <div className='group relative cursor-pointer overflow-hidden rounded-[50px]'>
      <WhiteOrangeKeycapEnter className='h-full w-full transition-opacity duration-300 group-hover:opacity-0' />

      <div className='absolute top-0 left-0 z-12 h-1/2 w-1/2 overflow-hidden rounded-[50px] opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <Image src={imageSrc} alt={title} fill className='object-cover' />
        <div className='absolute inset-0 bg-black/20' />
      </div>
      <span className='text-h2 absolute top-16.5 left-16.5 z-20 font-bold text-neutral-500 transition-colors group-hover:text-white'>
        {title}
      </span>
      <span className='text-h4 absolute top-30.5 left-16.5 z-20 font-bold text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100'>
        {subTitle}
      </span>

      <div className='absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='relative h-full w-full'
          style={{
            WebkitMaskImage: "url('/keycap/white-orange-enter-keycap.svg')",
            WebkitMaskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskImage: "url('/keycap/white-orange-enter-keycap.svg')",
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
          }}>
          <Image
            src={imageSecondSrc}
            alt={secondTitle}
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 bg-black/30' />
        </div>
      </div>
      <span className='text-h2 absolute bottom-22.25 left-22.25 z-20 font-bold text-white'>
        {secondTitle}
      </span>
      <span className='text-h4 absolute right-37.5 bottom-22.25 z-20 font-bold text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100'>
        {secondSubTitle}
      </span>
    </div>
  );
};
