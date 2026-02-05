import Arrow from '@/assets/home/keycap/arrow.svg';
import ArrowHover from '@/assets/home/keycap/arrow-hover.svg';
import Image from 'next/image';

interface WhiteArrowKeycapProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const WhiteArrowKeycap = ({
  direction = 'right',
}: WhiteArrowKeycapProps) => {
  const rotateClass = {
    right: 'rotate-0',
    left: 'rotate-180',
    up: 'rotate-[270deg]',
    down: 'rotate-90',
  };

  return (
    <div
      className='group relative h-72.25 w-72.25 cursor-pointer rounded-[50px]'
      role='button'
      tabIndex={0}>
      <Image src='/keycap/white-keycap.svg' alt='' fill />
      <Image
        src='/keycap/grap-keycap.svg'
        alt=''
        fill
        className='absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'
      />
      <Arrow
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 ${rotateClass[direction]}`}
      />
      <ArrowHover
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${rotateClass[direction]}`}
      />
    </div>
  );
};
