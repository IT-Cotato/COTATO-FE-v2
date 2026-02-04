import Image from 'next/image';

interface OrangeColKeycapProps {
  imageSrc: string;
  title: string;
  subTitle: string;
}

export const OrangeColKeycap = ({
  imageSrc,
  title,
  subTitle,
}: OrangeColKeycapProps) => {
  return (
    <div className='group relative h-146.5 w-72.25 cursor-pointer overflow-hidden rounded-[50px]'>
      <Image
        src='/keycap/orange-keycap-long-col.svg'
        alt='keycap'
        fill
        className='h-full w-full transition-opacity duration-300 group-hover:opacity-0'
      />
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
