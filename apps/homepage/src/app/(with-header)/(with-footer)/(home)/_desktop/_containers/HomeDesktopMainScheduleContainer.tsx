import {BlackPlusKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackPlusKeycap';
import {BlackRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackRowKeycap';
import {OrangeColKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeColKeycap';
import {OrangeRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeRowKeycap';
import {ScheduleKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/ScheduleKeycap';
import {WhiteArrowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/WhiteArrowKeycap';
import {WhiteOrangeKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/WhiteOrangeKeycap';

export const HomeDesktopMainScheduleContainer = () => {
  return (
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
};
