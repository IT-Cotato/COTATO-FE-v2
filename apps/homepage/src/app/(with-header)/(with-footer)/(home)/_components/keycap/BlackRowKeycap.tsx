import Image from 'next/image';
interface BlackRowKeycapProps {
  imageSrc: string;
  title: string;
  subTitle: string;
}

export const BlackRowKeycap = ({
  imageSrc,
  title,
  subTitle,
}: BlackRowKeycapProps) => {
  return (
    <div
      role='button'
      tabIndex={0}
      className='group relative h-39 w-81 cursor-pointer overflow-hidden rounded-[27px] xl:h-67 xl:w-140 xl:rounded-[50px]'>
      <Image
        src='/keycap/black-keycap-long.svg'
        alt=''
        fill
        unoptimized={true}
        className='h-full w-full transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 group-focus-visible:opacity-0'
      />
      <span className='text-h3 xl:text-h2 absolute top-9.5 left-15.25 z-10 font-bold text-white transition-colors xl:top-16.5 xl:left-16.5'>
        {title}
      </span>
      <span className='text-h5 xl:text-h4 absolute bottom-4.25 left-15.25 z-10 text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100 group-focus-visible:opacity-100 xl:top-30.5 xl:left-16.5'>
        {subTitle}
      </span>
      <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 group-focus-visible:opacity-100'>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className='object-cover'
          unoptimized={true}
        />
        <div className='absolute inset-0 bg-black/20' />
      </div>
    </div>
  );
};
