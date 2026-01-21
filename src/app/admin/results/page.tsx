import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {ResultsContainer} from '@/app/admin/results/_components/ResultsContainer';

export default function AdminResultsPage() {
  return (
    <SuspenseWrapper>
      <ResultsContainer />
    </SuspenseWrapper>
  );
}
