import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {RecruitmentInitializer} from '@/app/admin/recruitment/_components/RecruitmentInitializer';
import {RecruitmentContainer} from '@/app/admin/recruitment/_components/RecruitmentContainer';

export default function AdminRecruitmentPage() {
  return (
    <RecruitmentInitializer>
      <SuspenseWrapper>
        <RecruitmentContainer />
      </SuspenseWrapper>
    </RecruitmentInitializer>
  );
}
