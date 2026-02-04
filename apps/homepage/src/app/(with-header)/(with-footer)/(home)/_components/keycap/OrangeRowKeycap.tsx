import Image from 'next/image';
import OrangeKeycapLongRow from '@/assets/home/keycap/orange-keycap-long-row.svg';

interface OrangeRowKeycapProps {
  imageSrc: string;
  title: string;
  subTitle: string;
}

export const OrangeRowKeycap = ({
  imageSrc,
  title,
  subTitle,
}: OrangeRowKeycapProps) => {
  return (
    <div className='group relative col-span-3 col-start-2 row-start-4 h-72.25 w-223.5 cursor-pointer overflow-hidden rounded-[50px]'>
      <OrangeKeycapLongRow className='h-full w-full transition-opacity duration-300 group-hover:opacity-0' />

      <span className='text-h2 absolute top-16.5 left-16.5 z-10 font-bold text-white transition-colors'>
        {title}
      </span>
      <span className='text-h4 absolute top-30.5 left-16.5 z-10 font-medium text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100'>
        {subTitle}
      </span>
      <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <Image src={imageSrc} alt={title} fill className='object-cover' />
        <div className='absolute inset-0 bg-black/20' />
      </div>
    </div>
  );
};
