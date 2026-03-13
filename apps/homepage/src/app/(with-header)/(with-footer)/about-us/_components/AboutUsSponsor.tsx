import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import Link from 'next/link';
import Image from 'next/image';

export const AboutUsSponsor = () => {
  return (
    <div className='flex flex-col items-center gap-15 py-20 lg:gap-25 lg:py-40'>
      <AboutUsDescription
        title='Sponsored by'
        titleColor='text-neutral-800'
        subTitleColor='text-neutral-500'
        subTitle='COde Together, Arrive TOgether!'
        subTitleOption='코테이토의 여정에 동행해주시는 공식 파트너 단체입니다.'
        className='text-left sm:text-center'
      />

      <div className='z-20 grid grid-cols-2 gap-x-2 gap-y-2 md:flex-row md:items-center lg:flex lg:gap-11'>
        {SPONSORS.map(
          ({id, src, link, alt, width, height, mobileWidth, mobileHeight}) => (
            <Link
              key={id}
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center transition-transform hover:scale-105 active:scale-95'>
              <div className='relative flex items-center justify-center'>
                <div className='hidden md:block'>
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    unoptimized
                    className='object-contain'
                  />
                </div>

                <div className='block md:hidden'>
                  <Image
                    src={src}
                    alt={alt}
                    width={mobileWidth}
                    height={mobileHeight}
                    unoptimized
                    className='object-contain'
                  />
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const SPONSORS = [
  {
    id: 'jikhaeng',
    src: '/sponsor/jikhaeng.svg',
    link: 'https://zighang.com/',
    alt: '직행 로고',
    width: 224,
    height: 224,
    mobileWidth: 145,
    mobileHeight: 145,
  },
  {
    id: 'hspace',
    src: '/sponsor/hspace.svg',
    link: 'https://hspace.io/',
    alt: 'HSpace 로고',
    width: 224,
    height: 224,
    mobileWidth: 145,
    mobileHeight: 145,
  },
  {
    id: 'crycheese',
    src: '/sponsor/crycheeseburger.svg',
    link: 'https://www.instagram.com/crycheeseburger.official/',
    alt: '크라이치즈버거 로고',
    width: 224,
    height: 224,
    mobileWidth: 145,
    mobileHeight: 145,
  },
  {
    id: 'onetime',
    src: '/sponsor/onetime.svg',
    link: 'https://www.onetime-with-members.com/ko/landing',
    alt: '원타임 로고',
    width: 224,
    height: 224,
    mobileWidth: 145,
    mobileHeight: 145,
  },
];
