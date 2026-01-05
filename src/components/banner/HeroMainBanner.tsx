import Image from 'next/image';
import HeroBanner from '@/assets/banners/hero-main.webp';

interface HeroMainBannerProps {
  heading?: string;
  subheading?: string;
}

const HeroMainBanner = ({heading, subheading}: HeroMainBannerProps) => {
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
      {heading && (
        <div className='absolute top-0 right-0 left-0 flex justify-center py-21.75'>
          <div className='w-292.75'>
            <h1 className='text-4xl leading-12.5 whitespace-nowrap text-white'>
              {heading}
            </h1>
            {subheading && (
              <p className='text-xl leading-12.5 whitespace-nowrap text-white'>
                {subheading}
              </p>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default HeroMainBanner;
