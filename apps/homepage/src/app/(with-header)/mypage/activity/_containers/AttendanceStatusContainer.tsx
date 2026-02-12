import {StatusCard} from '@/app/(with-header)/mypage/activity/_components/StatusCard';
import {
  attendanceCards,
  penaltyCards,
  TabType,
} from '@/schemas/mypage-mem/activity/mypage-mem-type';

export const AttendanceStatusContainer = ({
  activeTab,
}: {
  activeTab: TabType;
}) => {
  const currentCards =
    activeTab === 'attendance' ? attendanceCards : penaltyCards;

  return (
    <div className='flex w-full items-center gap-10'>
      {currentCards.map((card) => (
        <StatusCard key={card.label} {...card} />
      ))}
    </div>
  );
};
