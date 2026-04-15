import {QualificationList} from '@/app/(with-header)/(with-footer)/recruit/_mobile/_components/QualificationList';
import {PositionList} from '@/app/(with-header)/(with-footer)/recruit/_mobile/_components/PositionList';
import {
  ActivityCardType,
  PositionCardType,
} from '@/schemas/recruit/recruit.schema';
import {ActivityList} from '@/app/(with-header)/(with-footer)/recruit/_components/ActivityList';
import {FaqContainer} from '@/app/(with-header)/(with-footer)/recruit/_containers/FaqContainer';

interface MobileContentContainerProps {
  parts?: PositionCardType[];
  activities?: ActivityCardType[];
}

export const MobileContentContainer = ({
  parts,
  activities,
}: MobileContentContainerProps) => {
  return (
    <div className='flex w-full flex-col lg:hidden'>
      <QualificationList />
      <PositionList parts={parts} />
      <ActivityList activities={activities} />
      <FaqContainer />
    </div>
  );
};
