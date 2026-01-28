import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {RecruitmentInitializer} from '@/app/admin/(with-sidebar)/recruitment/_components/RecruitmentInitializer';
import {RecruitmentContainer} from '@/app/admin/(with-sidebar)/recruitment/_components/RecruitmentContainer';

export default function AdminRecruitmentPage() {
  return (
    <RecruitmentInitializer>
      <SuspenseWrapper>
        <RecruitmentContainer />
      </SuspenseWrapper>
    </RecruitmentInitializer>
  );
}
