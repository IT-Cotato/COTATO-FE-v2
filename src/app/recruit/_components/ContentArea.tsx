'use client';

import {useRecruitmentNoticeQuery} from '@/hooks/queries/useRecruitmentNotice.query';
import {TimelineItem} from '@/app/recruit/_components/TimelineItem';
import {QualificationsCard} from '@/app/recruit/_components/QualificationsCard';
import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit-components';
import {PositionCard} from '@/app/recruit/_components/PositionCard';
import {ActivityCard} from '@/app/recruit/_components/ActivityCard';
import {Button} from '@/components/button/Button';

export const ContentArea = () => {
  const {data} = useRecruitmentNoticeQuery();

  const dataTimeline = data?.schedule;
  const dataPosition = data?.parts;
  const dataActivity = data?.activities;

  return (
    <div className='w-360 pt-10 pb-30'>
      <div className='mb-30'>
        <p className='mb-7.5 text-center text-h2 text-neutral-800'>모집 일정</p>
        <div className='flex justify-center'>
          {dataTimeline?.map((item, index) => (
            <TimelineItem
              key={item.title}
              item={item}
              isLast={index === dataTimeline?.length - 1}
            />
          ))}
        </div>
      </div>

      <div className='mb-30'>
        <p className='mb-2.5 text-center text-h4 text-neutral-600'>
          나는 그냥 말하는 감자인데.. 사망년이라니.. 취준을 하라니..프로젝트
          경험을 쓰라고요?
        </p>
        <p className='mb-7.5 text-center text-h4 text-neutral-600'>
          발등에 불 떨어져 군감자가 되어가는 감자들을 모집합니다.
        </p>
        <div className='flex justify-center gap-20'>
          {QUALIFICATIONS_CARD_ITEMS.map((item) => (
            <QualificationsCard key={item.qualification} item={item} />
          ))}
        </div>
      </div>

      <div className='mb-30'>
        <p className='mb-7.5 text-center text-h2 text-neutral-800'>모집 파트</p>
        <div className='flex justify-center gap-4.5'>
          {dataPosition?.map((item) => (
            <PositionCard key={item.short} item={item} />
          ))}
        </div>
      </div>

      <div className='mb-30'>
        <p className='mb-2.5 text-center text-h2 text-neutral-800'>
          주요 활동 일정
        </p>
        <p className='mb-1 text-center text-h5 text-neutral-600'>
          정기 세션은 <span className='text-primary'>매주 금요일 19시</span>에{' '}
          <span className='text-primary'>오프라인</span>으로 진행됩니다
        </p>
        <p className='mb-7.5 text-center text-body-l text-neutral-500'>
          세부 일정은 추후 변경될 수 있습니다.
        </p>
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-6'>
          {dataActivity?.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Button
        label='지원하러 가기'
        onClick={() => (window.location.href = '/apply')}
      />
    </div>
  );
};
