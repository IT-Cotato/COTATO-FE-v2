import {RecruitmentInitializer} from '@/app/admin/(with-sidebar)/recruitment/_components/RecruitmentInitializer';
import {ResultsContainer} from '@/app/admin/(with-sidebar)/results/_components/ResultsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminResultsPage() {
  return (
    <section className='flex min-w-275 flex-col items-center justify-center p-20'>
      <RecruitmentInitializer>
        <SuspenseWrapper>
          <ResultsContainer />
        </SuspenseWrapper>
      </RecruitmentInitializer>
    </section>
  );
}
