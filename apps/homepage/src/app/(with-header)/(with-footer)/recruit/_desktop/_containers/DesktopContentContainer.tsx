import {QualificationList} from '@/app/(with-header)/(with-footer)/recruit/_desktop/_components/QualificationList';
import {PositionList} from '@/app/(with-header)/(with-footer)/recruit/_desktop/_components/PositionList';
import {
  ActivityCardType,
  PositionCardType,
} from '@/schemas/recruit/recruit.schema';
import {ActivityList} from '@/app/(with-header)/(with-footer)/recruit/_components/ActivityList';
import {FaqContainer} from '@/app/(with-header)/(with-footer)/recruit/_containers/FaqContainer';

interface DesktopContentContainerProps {
  parts?: PositionCardType[];
  activities?: ActivityCardType[];
}

export const DesktopContentContainer = ({
  parts,
  activities,
}: DesktopContentContainerProps) => {
  return (
    <div className='relative z-1 hidden w-full flex-col gap-45 pt-73 pb-23 lg:flex'>
      <QualificationList />
      <PositionList parts={parts} />
      <ActivityList activities={activities} />
      <FaqContainer />
    </div>
  );
};
