'use client';

import {useRecruitmentNoticeQuery} from '@/hooks/queries/useRecruitmentNotice.query';
import {TimelineItem} from '@/app/(with-footer)/recruit/_components/TimelineItem';
import {QualificationsCard} from '@/app/(with-footer)/recruit/_components/QualificationsCard';
import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit-components';
import {PositionCard} from '@/app/(with-footer)/recruit/_components/PositionCard';
import {ActivityCard} from '@/app/(with-footer)/recruit/_components/ActivityCard';
import {Button} from '@repo/ui/components/buttons/Button';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';

export const ContentContainer = () => {
  const {data} = useRecruitmentNoticeQuery();
  const router = useRouter();

  const dataTimeline = data?.schedule;
  const dataPosition = data?.parts;
  const dataActivity = data?.activities;

  return (
    <div className='w-360 pt-10 pb-30'>
      <div className='mb-30'>
        <p className='text-h2 mb-7.5 text-center text-neutral-800'>모집 일정</p>
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
        <p className='text-h4 mb-2.5 text-center text-neutral-600'>
          막연함이 확신으로 변하는 시간, 함께 도달하는 성장의 종착지.
        </p>
        <p className='text-h4 mb-7.5 text-center text-neutral-600'>
          코테이토에서, &apos;말하는 감자&apos;에서 &apos;행동하는 감자&apos;로
          도약할 당신을 기다립니다.
        </p>
        <div className='flex justify-center gap-20'>
          {QUALIFICATIONS_CARD_ITEMS.map((item) => (
            <QualificationsCard key={item.qualification} item={item} />
          ))}
        </div>
      </div>

      <div className='mb-30'>
        <p className='text-h2 mb-7.5 text-center text-neutral-800'>모집 파트</p>
        <div className='flex justify-center gap-4.5'>
          {dataPosition?.map((item) => (
            <PositionCard key={item.short} item={item} />
          ))}
        </div>
      </div>

      <div className='mb-30'>
        <p className='text-h2 mb-2.5 text-center text-neutral-800'>
          주요 활동 일정
        </p>
        <p className='text-h5 mb-1 text-center text-neutral-600'>
          정기 세션은 <span className='text-primary'>매주 금요일 19시</span>
          에&nbsp;<span className='text-primary'>오프라인</span>으로 진행됩니다
        </p>
        <p className='text-body-l mb-7.5 text-center text-neutral-500'>
          세부 일정은 추후 변경될 수 있습니다.
        </p>
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-6'>
          {dataActivity?.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Button
        label='알림 신청하러 가기'
        onClick={() => router.push(ROUTES.HOME)}
      />
    </div>
  );
};
