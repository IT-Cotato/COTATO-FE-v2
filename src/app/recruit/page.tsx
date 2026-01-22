import {TimelineItem} from '@/app/recruit/_components/TimelineItem';
import {QualificationsCard} from '@/app/recruit/_components/QualificationsCard';
import {QUALIFICATIONS_CARD_ITEMS} from '@/constants/recruit/recruit-components';
import {RecruitmentPosition} from '@/app/recruit/_components/RecruitmentPosition';
import {ActivityCard} from '@/app/recruit/_components/ActivityCard';
import {
  MOCK_ACTIVITY_CARD,
  MOCK_RECRUITMENT_POSITION,
  MOCK_TIMELINE_ITEM,
} from '@/mocks/mock-recruitment-components';

export default function RecruitmentNoticePage() {
  return (
    <section>
      {/* UI 확인용 */}

      <div className='flex w-360 justify-center'>
        {MOCK_TIMELINE_ITEM.map((item, index) => (
          <TimelineItem
            key={item.date}
            item={item}
            isLast={index === MOCK_TIMELINE_ITEM.length - 1}
          />
        ))}
      </div>

      <div className='flex w-360 justify-center gap-20'>
        {QUALIFICATIONS_CARD_ITEMS.map((item) => (
          <QualificationsCard key={item.qualification} item={item} />
        ))}
      </div>

      <div className='flex w-360 justify-center gap-4.5'>
        {MOCK_RECRUITMENT_POSITION.map((item) => (
          <RecruitmentPosition key={item.short} item={item} />
        ))}
      </div>

      <div className='flex w-360 flex-wrap justify-center gap-x-5 gap-y-6'>
        {MOCK_ACTIVITY_CARD.map((item) => (
          <ActivityCard key={item.short} item={item} />
        ))}
      </div>
    </section>
  );
}
