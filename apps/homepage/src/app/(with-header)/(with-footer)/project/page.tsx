import Image from 'next/image';
import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';
import HeroBanner from '@/assets/backgrounds/banner/hero-main.webp';
import {ProjectContainer} from '@/app/(with-header)/(with-footer)/project/_components/ProjectContainer';

export default function ProjectPage() {
  return (
    <section className='flex min-h-screen min-w-360 flex-col items-center'>
      <HeroMainBanner
        heading='함께 만들어 도착한, COTATO의 프로젝트를 만나보세요'
        subheading='COde Together, Arrive TOgether'
        paddingVertical={76}
        bannerImage={
          <Image
            src={HeroBanner}
            alt='Hero Banner'
            fill
            priority
            className='object-cover object-center'
          />
        }
      />
      <ProjectContainer />
    </section>
  );
}
