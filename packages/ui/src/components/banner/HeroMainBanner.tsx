import clsx from 'clsx';

interface HeroMainBannerProps {
  subheading?: string;
  heading: React.ReactNode;
  headingStyle?: string;
  /** paddingVertical이 true이면 웹 79px, 모바일 59px 적용 / false이거나 없으면 104px 적용 */
  paddingVertical?: boolean;
  bannerImage: React.ReactNode;
}

const HeroMainBanner = ({
  subheading,
  heading,
  headingStyle,
  paddingVertical,
  bannerImage,
}: HeroMainBannerProps) => {
  return (
    <aside
      role='banner'
      className={clsx(
        'relative w-full px-10 lg:h-61 lg:px-60',
        paddingVertical ? 'h-50 py-[59px] lg:py-[79px]' : 'h-auto py-[104px]'
      )}>
      {bannerImage && <>{bannerImage}</>}
      <div
        className='absolute inset-0 h-full w-full bg-[#000000]/60'
        aria-hidden='true'
      />

      <div className='relative z-10 flex flex-col gap-2.5 lg:gap-6'>
        {subheading && (
          <p className='text-h5 lg:text-h4 whitespace-nowrap text-neutral-400'>
            {subheading}
          </p>
        )}
        <h1
          className={clsx(
            'text-h5 lg:text-h3 w-min font-bold whitespace-nowrap text-neutral-100',
            headingStyle
          )}>
          {heading}
        </h1>
      </div>
    </aside>
  );
};

export default HeroMainBanner;
