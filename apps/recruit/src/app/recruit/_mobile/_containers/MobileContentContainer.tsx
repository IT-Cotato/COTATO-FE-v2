import {ActivityList} from '@/app/recruit/_components/ActivityList';
import {
  ActivityCardType,
  PositionCardType,
  TimelineType,
} from '@/schemas/recruit/recruit.schema';
import {QualificationList} from '@/app/recruit/_mobile/_components/QualificationList';
import {PositionList} from '@/app/recruit/_mobile/_components/PositionList';
import {TimelineList} from '@/app/recruit/_mobile/_components/TimelineList';

interface MobileContentContainerProps {
  timelines?: TimelineType[];
  parts?: PositionCardType[];
  activities?: ActivityCardType[];
}

export const MobileContentContainer = ({
  timelines,
  parts,
  activities,
}: MobileContentContainerProps) => {
  return (
    <div className='flex w-full flex-col lg:hidden'>
      <TimelineList timelines={timelines} />
      <QualificationList />
      <PositionList parts={parts} />
      <ActivityList activities={activities} />
    </div>
  );
};
