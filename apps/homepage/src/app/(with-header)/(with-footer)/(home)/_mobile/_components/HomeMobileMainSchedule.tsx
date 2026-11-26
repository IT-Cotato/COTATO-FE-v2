import {BlackPlusKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackPlusKeycap';
import {BlackRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackRowKeycap';
import {OrangeColKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeColKeycap';
import {ScheduleKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/ScheduleKeycap';

export const HomeMobileMainSchedule = () => {
  return (
    <div className='grid max-w-81 grid-cols-2 gap-2'>
      <ScheduleKeycap
        imageSrc='/images/main-schedule/ot.webp'
        imageSlot='SCHEDULE_OT'
        title='OT'
        subTitle='2026.03.06'
      />
      <ScheduleKeycap
        imageSrc='/images/main-schedule/mt.webp'
        imageSlot='SCHEDULE_MT'
        title='MT'
        subTitle='2026.03.27'
      />
      <div className='col-span-2 col-start-1'>
        <BlackRowKeycap
          imageSrc='/images/main-schedule/cokerthon.webp'
          imageSlot='SCHEDULE_COKERTHON'
          title='코커톤'
          subTitle='2026.07.10'
        />
      </div>

      <BlackPlusKeycap />

      <div className='col-start-2 row-span-2'>
        <OrangeColKeycap
          imageSrc='/images/main-schedule/session.webp'
          imageSlot='SCHEDULE_SESSION'
          title='정기 세션'
          subTitle='매주 금요일 19시'
        />
      </div>

      <ScheduleKeycap
        imageSrc='/images/main-schedule/devtalk.webp'
        imageSlot='SCHEDULE_DEVTALK'
        title='데브톡'
        subTitle='2026.05.08'
      />

      <BlackRowKeycap
        imageSrc='/images/main-schedule/demoday.webp'
        imageSlot='SCHEDULE_DEMODAY'
        title='데모데이'
        subTitle='2026.08.21'
      />
    </div>
  );
};
