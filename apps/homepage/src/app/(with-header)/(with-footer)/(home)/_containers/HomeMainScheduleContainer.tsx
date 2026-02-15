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
          imageSrc='/images/main-schedule/ot.png'
          title='OT'
          subTitle='2026.03.06'
        />
        <BlackPlusKeycap />
        <div className='col-span-2 col-start-3 row-span-2 row-start-1'>
          <WhiteOrangeKeycap
            imageSrc='/images/main-schedule/mt.png'
            imageSecondSrc='/images/main-schedule/session.png'
            title='MT'
            subTitle='2026.03.27'
            secondTitle='정기 세션'
            secondSubTitle='매주 금요일'
          />
        </div>
        <div className='col-start-1 row-span-2'>
          <OrangeColKeycap
            imageSrc='/images/main-schedule/devtalk.png'
            title='데브톡'
            subTitle='2026.05.08'
          />
        </div>
        <div className='col-start-2 row-start-2'>
          <WhiteArrowKeycap direction='left' />
        </div>
        <div className='col-span-2 col-start-2 row-start-3'>
          <BlackRowKeycap
            imageSrc='/images/main-schedule/cokerthon.png'
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
            imageSrc='/images/main-schedule/demoday.png'
            title='데모데이'
            subTitle='2026.08.21'
          />
        </div>
      </div>
    </div>
  );
};
