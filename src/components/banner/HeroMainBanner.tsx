import Image from 'next/image';
import HeroBanner from '@/assets/banners/hero-main.webp';

const HeroMainBanner = () => {
  return (
    <aside role='banner' className='relative flex h-106.5 w-full'>
      <div
        className='absolute top-0 right-0 left-0 h-full w-full bg-linear-to-b from-[#000000] from-0% to-[#00000000] to-58% opacity-70'
        aria-hidden='true'
      />
      <Image
        src={HeroBanner}
        alt='FAQ 페이지 상단 배너'
        width={1920}
        height={426.67}
        priority={true}
        className='h-full w-full object-cover'
      />
    </aside>
  );
};

export default HeroMainBanner;
