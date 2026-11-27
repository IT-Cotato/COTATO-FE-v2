'use client';

import {useHomepageTitles} from '@/hooks/useHomepageSchedules';
import {useHomepageSchedules} from '@/hooks/useHomepageSchedules';
import {BlackPlusKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackPlusKeycap';
import {BlackRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackRowKeycap';
import {OrangeColKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeColKeycap';
import {OrangeRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeRowKeycap';
import {ScheduleKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/ScheduleKeycap';
import {WhiteArrowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/WhiteArrowKeycap';
import {WhiteOrangeKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/WhiteOrangeKeycap';

export const HomeDesktopMainSchedule = () => {
  const schedule = useHomepageSchedules();
  const title = useHomepageTitles();
  return (
    <div className='grid grid-cols-[repeat(4,auto)] gap-2'>
      <ScheduleKeycap
        imageSrc='/images/main-schedule/ot.webp'
        imageSlot='SCHEDULE_OT'
        title={title('SCHEDULE_OT', 'OT')}
        subTitle={schedule('SCHEDULE_OT', '2026.03.06')}
      />
      <BlackPlusKeycap />
      <div className='col-span-2 col-start-3 row-span-2 row-start-1'>
        <WhiteOrangeKeycap
          imageSrc='/images/main-schedule/mt.webp'
          imageSlot='SCHEDULE_MT'
          imageSecondSrc='/images/main-schedule/session.webp'
          secondImageSlot='SCHEDULE_SESSION'
          title={title('SCHEDULE_MT', 'MT')}
          subTitle={schedule('SCHEDULE_MT', '2026.03.27')}
          secondTitle={title('SCHEDULE_SESSION', '정기 세션')}
          secondSubTitle={schedule('SCHEDULE_SESSION', '매주 금요일 19시')}
        />
      </div>
      <div className='col-start-1 row-span-2'>
        <OrangeColKeycap
          imageSrc='/images/main-schedule/devtalk.webp'
          imageSlot='SCHEDULE_DEVTALK'
          title={title('SCHEDULE_DEVTALK', '데브톡')}
          subTitle={schedule('SCHEDULE_DEVTALK', '2026.05.08')}
        />
      </div>
      <div className='col-start-2 row-start-2'>
        <WhiteArrowKeycap direction='left' />
      </div>
      <div className='col-span-2 col-start-2 row-start-3'>
        <BlackRowKeycap
          imageSrc='/images/main-schedule/cokerthon.webp'
          imageSlot='SCHEDULE_COKERTHON'
          title={title('SCHEDULE_COKERTHON', '코커톤')}
          subTitle={schedule('SCHEDULE_COKERTHON', '2026.07.10')}
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
          imageSlot='SCHEDULE_DEMODAY'
          title={title('SCHEDULE_DEMODAY', '데모데이')}
          subTitle={schedule('SCHEDULE_DEMODAY', '2026.08.21')}
        />
      </div>
    </div>
  );
};
