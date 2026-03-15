import SmallLogo from '@/assets/small-logo/small-logo.svg';
import SmallLogoHover from '@/assets/small-logo/small-logo-hover.svg';
import Image from 'next/image';

export const BlackPlusKeycap = () => {
  return (
    <div
      className='group shadow-home-keycap relative inline-block h-39 w-39 rounded-[50px] xl:h-67 xl:w-67'
      role='button'
      tabIndex={0}>
      <Image src='/keycap/black-keycap.svg' alt='' fill unoptimized={true} />
      <Image
        src='/keycap/black-keycap-hover.svg'
        alt=''
        fill
        className='absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100'
        unoptimized={true}
      />
      <SmallLogo className='absolute top-1/2 left-1/2 h-12.5 w-12.5 -translate-x-1/2 -translate-y-1/2 text-neutral-500 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0 group-focus-visible:opacity-0 xl:h-21 xl:w-20' />
      <SmallLogoHover className='absolute top-1/2 left-1/2 h-22.5 w-22.5 -translate-x-1/2 -translate-y-1/2 text-neutral-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 group-focus-visible:opacity-100 xl:h-40 xl:w-40' />
    </div>
  );
};
