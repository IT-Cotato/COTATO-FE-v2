import Image from 'next/image';
import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';
import HeroBanner from '@/assets/backgrounds/banner/hero-main.webp';

export default function ProjectLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='flex min-h-screen flex-col items-center'>
      <HeroMainBanner
        paddingVertical={true}
        heading={
          <>
            함께 만들어 도착한,
            <br className='lg:hidden' /> COTATO의 프로젝트를 만나보세요
          </>
        }
        subheading='COde Together, Arrive TOgether'
        bannerImage={
          <Image
            src={HeroBanner}
            alt='Hero Banner'
            fill
            priority
            className='object-cover object-left lg:object-center'
          />
        }
      />
      {children}
    </section>
  );
}
