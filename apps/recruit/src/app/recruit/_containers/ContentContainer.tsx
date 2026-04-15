'use client';

import {useRecruitmentNoticeQuery} from '@/hooks/queries/useRecruitmentNotice.query';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {DesktopContentContainer} from '@/app/recruit/_desktop/_containers/DesktopContentContainer';
import {MobileContentContainer} from '@/app/recruit/_mobile/_containers/MobileContentContainer';

export const ContentContainer = () => {
  const {data} = useRecruitmentNoticeQuery();
  const router = useRouter();
  const {data: recruitmentStatus} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.isActive ?? false;

  const dataTimeline = data?.schedule;
  const dataPosition = data?.parts;
  const dataActivity = data?.activities;

  return (
    <div className='w-full lg:pt-10 lg:pb-30'>
      {/* content */}
      <DesktopContentContainer
        timelines={dataTimeline}
        parts={dataPosition}
        activities={dataActivity}
      />
      <MobileContentContainer
        timelines={dataTimeline}
        parts={dataPosition}
        activities={dataActivity}
      />

      <div className='mb-12.5 lg:mb-0'>
        <Button
          label={isRecruiting ? '지원하러 가기' : '알림 신청 바로가기'}
          onClick={() => {
            router.push(isRecruiting ? ROUTES.APPLY : ROUTES.HOME);
          }}
        />
      </div>
    </div>
  );
};
