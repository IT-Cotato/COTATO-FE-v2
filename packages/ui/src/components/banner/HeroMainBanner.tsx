import clsx from 'clsx';

interface HeroMainBannerProps {
  subheading?: string;
  heading: string;
  headingStyle?: string;
  paddingVertical?: number;
  bannerImage: React.ReactNode;
}

const HeroMainBanner = ({
  subheading,
  heading,
  headingStyle,
  paddingVertical = 104,
  bannerImage,
}: HeroMainBannerProps) => {
  return (
    <aside
      role='banner'
      className='relative h-61 w-full px-60'
      style={{
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
      }}>
      {bannerImage && <>{bannerImage}</>}
      <div
        className='absolute inset-0 h-full w-full bg-[#000000]/60'
        aria-hidden='true'
      />

      <div className='relative z-10 flex flex-col gap-6'>
        {subheading && (
          <p className='text-h4 whitespace-nowrap text-neutral-400'>
            {subheading}
          </p>
        )}
        <h1
          className={clsx(
            'text-h3 w-min whitespace-nowrap text-neutral-100',
            headingStyle
          )}>
          {heading}
        </h1>
      </div>
    </aside>
  );
};

export default HeroMainBanner;
