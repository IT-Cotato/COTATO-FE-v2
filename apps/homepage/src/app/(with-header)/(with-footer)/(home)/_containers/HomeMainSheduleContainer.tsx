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

export const HomeMainScheduleContainer = () => {
  return (
    <div className='flex flex-col items-center gap-10 py-20'>
      <HomeSectionHeader
        mainHeading='Main Schedule'
        subHeading='주요 활동일정'
      />
      {/** 그리드 4*4 */}
      <div className='grid grid-cols-[repeat(4,auto)] gap-2'>
        <ScheduleKeycap
          imageSrc='https://picsum.photos/300/300?random=1'
          title='OT'
          subTitle='2026.02.04'
        />
        <BlackPlusKeycap />
        <div className='col-span-2 col-start-3 row-span-2 row-start-1'>
          <WhiteOrangeKeycap
            imageSrc='https://picsum.photos/300/300?random=11'
            imageSecondSrc='https://picsum.photos/600/600?random=12'
            title='MT'
            subTitle='2026.02.04'
            secondTitle='정기 세션'
            secondSubTitle='2026.02.04'
          />
        </div>
        <div className='col-start-1 row-span-2'>
          <OrangeColKeycap
            imageSrc='https://picsum.photos/400/800?random=10'
            title='데브토크'
            subTitle='2026.02.04'
          />
        </div>
        <div className='col-start-2 row-start-2'>
          <WhiteArrowKeycap direction='left' />
        </div>
        <div className='col-span-2 col-start-2 row-start-3'>
          <BlackRowKeycap
            imageSrc='https://picsum.photos/600/300?random=3'
            title='코커톤'
            subTitle='2026.02.04'
          />
        </div>
        <div className='col-start-4 row-start-3'>
          <WhiteArrowKeycap direction='down' />
        </div>
        <div className='col-start-1 row-start-4 inline-block'>
          <BlackPlusKeycap />
        </div>
        <div className='group relative col-span-3 col-start-2 row-start-4 h-72.25 w-223.5 cursor-pointer overflow-hidden rounded-[50px]'>
          <OrangeRowKeycap
            imageSrc='https://picsum.photos/900/300?random=4'
            title='Demo Day'
            subTitle='2026.02.04'
          />
        </div>
      </div>
    </div>
  );
};
