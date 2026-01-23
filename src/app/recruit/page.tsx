import {TimelineItem} from '@/app/recruit/_components/TimelineItem';
import {QualificationsCard} from '@/app/recruit/_components/QualificationsCard';
import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit-components';
import {PositionCard} from '@/app/recruit/_components/PositionCard';
import {ActivityCard} from '@/app/recruit/_components/ActivityCard';
import {
  MOCK_ACTIVITY_CARD,
  MOCK_RECRUITMENT_POSITION,
  MOCK_TIMELINE_ITEM,
} from '@/mocks/mock-recruitment-components';

export default function RecruitmentNoticePage() {
  return (
    <section className='flex min-w-min justify-center'>
      <div className='flex w-360 flex-col items-center'>
        {/* UI 확인용 */}

        <div className='flex'>
          {MOCK_TIMELINE_ITEM.map((item, index) => (
            <TimelineItem
              key={item.title}
              item={item}
              isLast={index === MOCK_TIMELINE_ITEM.length - 1}
            />
          ))}
        </div>

        <div className='flex gap-20'>
          {QUALIFICATIONS_CARD_ITEMS.map((item) => (
            <QualificationsCard key={item.qualification} item={item} />
          ))}
        </div>

        <div className='flex gap-4.5'>
          {MOCK_RECRUITMENT_POSITION.map((item) => (
            <PositionCard key={item.short} item={item} />
          ))}
        </div>

        <div className='flex flex-wrap justify-center gap-x-5 gap-y-6'>
          {MOCK_ACTIVITY_CARD.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
