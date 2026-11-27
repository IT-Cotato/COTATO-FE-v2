'use client';

import {useHomepageTitles} from '@/hooks/useHomepageSchedules';
import {useHomepageSchedules} from '@/hooks/useHomepageSchedules';
import {BlackPlusKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackPlusKeycap';
import {BlackRowKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/BlackRowKeycap';
import {OrangeColKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/OrangeColKeycap';
import {ScheduleKeycap} from '@/app/(with-header)/(with-footer)/(home)/_components/keycap/ScheduleKeycap';

export const HomeMobileMainSchedule = () => {
  const schedule = useHomepageSchedules();
  const title = useHomepageTitles();
  return (
    <div className='grid max-w-81 grid-cols-2 gap-2'>
      <ScheduleKeycap
        imageSrc='/images/main-schedule/ot.webp'
        imageSlot='SCHEDULE_OT'
        title={title('SCHEDULE_OT', 'OT')}
        subTitle={schedule('SCHEDULE_OT', '2026.03.06')}
      />
      <ScheduleKeycap
        imageSrc='/images/main-schedule/mt.webp'
        imageSlot='SCHEDULE_MT'
        title={title('SCHEDULE_MT', 'MT')}
        subTitle={schedule('SCHEDULE_MT', '2026.03.27')}
      />
      <div className='col-span-2 col-start-1'>
        <BlackRowKeycap
          imageSrc='/images/main-schedule/cokerthon.webp'
          imageSlot='SCHEDULE_COKERTHON'
          title={title('SCHEDULE_COKERTHON', '코커톤')}
          subTitle={schedule('SCHEDULE_COKERTHON', '2026.07.10')}
        />
      </div>

      <BlackPlusKeycap />

      <div className='col-start-2 row-span-2'>
        <OrangeColKeycap
          imageSrc='/images/main-schedule/session.webp'
          imageSlot='SCHEDULE_SESSION'
          title={title('SCHEDULE_SESSION', '정기 세션')}
          subTitle={schedule('SCHEDULE_SESSION', '매주 금요일 19시')}
        />
      </div>

      <ScheduleKeycap
        imageSrc='/images/main-schedule/devtalk.webp'
        imageSlot='SCHEDULE_DEVTALK'
        title={title('SCHEDULE_DEVTALK', '데브톡')}
        subTitle={schedule('SCHEDULE_DEVTALK', '2026.05.08')}
      />

      <BlackRowKeycap
        imageSrc='/images/main-schedule/demoday.webp'
        imageSlot='SCHEDULE_DEMODAY'
        title={title('SCHEDULE_DEMODAY', '데모데이')}
        subTitle={schedule('SCHEDULE_DEMODAY', '2026.08.21')}
      />
    </div>
  );
};
