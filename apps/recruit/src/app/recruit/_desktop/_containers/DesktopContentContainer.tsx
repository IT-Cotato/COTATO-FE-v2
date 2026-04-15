import {ActivityList} from '@/app/recruit/_components/ActivityList';
import {
  ActivityCardType,
  PositionCardType,
  TimelineType,
} from '@/schemas/recruit/recruit.schema';
import {QualificationList} from '@/app/recruit/_desktop/_components/QualificationList';
import {PositionList} from '@/app/recruit/_desktop/_components/PositionList';
import {TimelineList} from '@/app/recruit/_desktop/_components/TimelineList';

interface DesktopContentContainerProps {
  parts?: PositionCardType[];
  activities?: ActivityCardType[];
  timelines?: TimelineType[];
}

export const DesktopContentContainer = ({
  parts,
  activities,
  timelines,
}: DesktopContentContainerProps) => {
  return (
    <div className='relative z-1 hidden w-full flex-col gap-45 pt-73 pb-23 lg:flex'>
      <TimelineList timelines={timelines} />
      <QualificationList />
      <PositionList parts={parts} />
      <ActivityList activities={activities} />
    </div>
  );
};
