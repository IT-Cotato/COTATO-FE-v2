import Image from 'next/image';
import Bg from '@/assets/backgrounds/session-schedule/ot-bg.webp';

export const ActivityCard = () => {
  return (
    <div className='group relative h-68.5 w-96.5 overflow-hidden rounded-[10px] bg-neutral-800 px-10 py-6 select-none'>
      <Image
        src={Bg}
        alt='SessionSchedule Cover'
        fill={true}
        draggable={false}
        className='object-cover object-center opacity-100 transition-opacity duration-300 group-hover:opacity-0'
      />
      <Image
        src='https://picsum.photos/id/60/300/200'
        alt='SessionSchedule Content'
        fill={true}
        draggable={false}
        unoptimized={true}
        className='object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'
      />

      <div className='absolute inset-0 z-10 bg-linear-to-b from-[#000000]/90 from-0% to-transparent to-48% transition-transform duration-300 group-hover:from-white group-hover:to-58%' />

      <div className='relative z-20 flex justify-between'>
        <p className='text-h4 text-neutral-50 transition-colors duration-300 group-hover:text-neutral-800'>
          OT
        </p>
        <p className='text-h5 text-neutral-200 transition-colors duration-300 group-hover:text-neutral-600'>
          2025.9.36
        </p>
      </div>
    </div>
  );
};
