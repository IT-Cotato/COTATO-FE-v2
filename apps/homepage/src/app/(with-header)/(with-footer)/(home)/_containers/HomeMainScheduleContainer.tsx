'use client';

/**
 * 홈 메인 스케줄 사진, 일정 등 데이터 조회 로직을 포함하는 메인 스케줄 컨테이너

 */

import {BlackPlusKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackPlusKeycap';
import {WhiteArrowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/WhiteArrowKeycap';
import {HomeSectionHeader} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionHeader';
import {ScheduleKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/ScheduleKeycap';
import {WhiteOrangeKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/WhiteOrangeKeycap';
import {OrangeColKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeColKeycap';
import {BlackRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackRowKeycap';
import {OrangeRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeRowKeycap';
import {useEffect, useState} from 'react';

export const HomeMainScheduleContainer = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className='flex flex-col items-center gap-5 sm:gap-10'>
      <HomeSectionHeader
        mainHeading='Main Schedule'
        subHeading='주요 활동일정'
      />
      {isMobile ? <MobileMainScheduleLayout /> : <DesktopMainScheduleLayout />}
    </section>
  );
};

const MobileMainScheduleLayout = () => (
  <div className='grid max-w-81 grid-cols-2 gap-2'>
    <ScheduleKeycap
      imageSrc='/images/main-schedule/ot.webp'
      title='OT'
      subTitle='2026.03.06'
    />
    <ScheduleKeycap
      imageSrc='/images/main-schedule/mt.webp'
      title='MT'
      subTitle='2026.03.27'
    />
    <div className='col-span-2 col-start-1'>
      <BlackRowKeycap
        imageSrc='/images/main-schedule/cokerthon.webp'
        title='코커톤'
        subTitle='2026.07.24'
      />
    </div>

    <BlackPlusKeycap />

    <div className='col-start-2 row-span-2'>
      <OrangeColKeycap
        imageSrc='/images/main-schedule/session.webp'
        title='정기 세션'
        subTitle='매주 금요일 19시'
      />
    </div>

    <ScheduleKeycap
      imageSrc='/images/main-schedule/devtalk.webp'
      title='데브톡'
      subTitle='2026.05.08'
    />

    <BlackRowKeycap
      imageSrc='/images/main-schedule/demoday.webp'
      title='데모데이'
      subTitle='2026.08.21'
    />
  </div>
);

const DesktopMainScheduleLayout = () => (
  <div className='grid grid-cols-[repeat(4,auto)] gap-2'>
    <ScheduleKeycap
      imageSrc='/images/main-schedule/ot.webp'
      title='OT'
      subTitle='2026.03.06'
    />
    <BlackPlusKeycap />
    <div className='col-span-2 col-start-3 row-span-2 row-start-1'>
      <WhiteOrangeKeycap
        imageSrc='/images/main-schedule/mt.webp'
        imageSecondSrc='/images/main-schedule/session.webp'
        title='MT'
        subTitle='2026.03.27'
        secondTitle='정기 세션'
        secondSubTitle='매주 금요일 19시'
      />
    </div>
    <div className='col-start-1 row-span-2'>
      <OrangeColKeycap
        imageSrc='/images/main-schedule/devtalk.webp'
        title='데브톡'
        subTitle='2026.05.08'
      />
    </div>
    <div className='col-start-2 row-start-2'>
      <WhiteArrowKeycap direction='left' />
    </div>
    <div className='col-span-2 col-start-2 row-start-3'>
      <BlackRowKeycap
        imageSrc='/images/main-schedule/cokerthon.webp'
        title='코커톤'
        subTitle='2026.07.24'
      />
    </div>
    <div className='col-start-4 row-start-3'>
      <WhiteArrowKeycap direction='down' />
    </div>
    <div className='col-start-1 row-start-4 inline-block'>
      <BlackPlusKeycap />
    </div>
    <div className='col-span-3 col-start-2 row-start-4'>
      <OrangeRowKeycap
        imageSrc='/images/main-schedule/demoday.webp'
        title='데모데이'
        subTitle='2026.08.21'
      />
    </div>
  </div>
);
