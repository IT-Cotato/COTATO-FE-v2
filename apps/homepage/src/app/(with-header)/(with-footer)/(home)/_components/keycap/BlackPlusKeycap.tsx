import BlackKeycap from '@/assets/home/keycap/black-keycap.svg';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import SmallLogoHover from '@/assets/small-logo/small-logo-hover.svg';
import BlackKeycapHover from '@/assets/home/keycap/black-keycap-hover.svg';

export const BlackPlusKeycap = () => {
  return (
    <div className='group relative inline-block'>
      <BlackKeycap />
      <BlackKeycapHover className='absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      <SmallLogo className='absolute top-1/2 left-1/2 h-21 w-20 -translate-x-1/2 -translate-y-1/2 text-neutral-500 opacity-100 transition-opacity duration-300 group-hover:opacity-0' />
      <SmallLogoHover className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    </div>
  );
};
