import {RecruitmentInitializer} from '@/app/admin/recruitment/_components/RecruitmentInitializer';
import {ResultsContainer} from '@/app/admin/results/_components/ResultsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminResultsPage() {
  return (
    <RecruitmentInitializer>
      <SuspenseWrapper>
        <ResultsContainer />
      </SuspenseWrapper>
    </RecruitmentInitializer>
  );
}
