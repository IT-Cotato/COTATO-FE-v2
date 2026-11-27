'use client';

import HeroMainBanner from '@repo/ui/components/banner/HeroMainBanner';
import Image from 'next/image';
import HeroBanner from '@/assets/backgrounds/banner/hero-main.webp';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

export default function ProjectBanner({
  kind = 'project',
}: {
  kind?: 'project' | 'study';
}) {
  const pathname = usePathname();

  // 상세 페이지인지 확인
  const isProjectDetailPage = /^\/(?:project|study)\/\d+$/.test(pathname);

  return (
    <div
      className={clsx(
        'w-full',
        // 상세 페이지일 때만 모바일(lg 미만)에서 hidden
        isProjectDetailPage && 'max-lg:hidden'
      )}>
      <HeroMainBanner
        paddingVertical={true}
        heading={
          <>
            함께 만들어 도착한,
            <br className='lg:hidden' /> COTATO의{' '}
            {kind === 'study' ? '스터디' : '프로젝트'}를 만나보세요
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
    </div>
  );
}
