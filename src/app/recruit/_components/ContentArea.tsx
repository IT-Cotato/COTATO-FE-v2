'use client';

import {useRecruitmentNoticeQuery} from '@/hooks/queries/useRecruitmentNotice.query';
import {TimelineItem} from '@/app/recruit/_components/TimelineItem';
import {QualificationsCard} from '@/app/recruit/_components/QualificationsCard';
import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit-components';
import {PositionCard} from '@/app/recruit/_components/PositionCard';
import {ActivityCard} from '@/app/recruit/_components/ActivityCard';

export const ContentArea = () => {
  const {data} = useRecruitmentNoticeQuery();

  const dataTimeline = data?.schedule;
  const dataPosition = data?.parts;
  const dataActivity = data?.activities;

  return (
    <>
      <div className='flex'>
        {dataTimeline?.map((item, index) => (
          <TimelineItem
            key={item.title}
            item={item}
            isLast={index === dataTimeline?.length - 1}
          />
        ))}
      </div>

      <div className='flex gap-20'>
        {QUALIFICATIONS_CARD_ITEMS.map((item) => (
          <QualificationsCard key={item.qualification} item={item} />
        ))}
      </div>

      <div className='flex gap-4.5'>
        {dataPosition?.map((item) => (
          <PositionCard key={item.short} item={item} />
        ))}
      </div>

      <div className='flex flex-wrap justify-center gap-x-5 gap-y-6'>
        {dataActivity?.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};
