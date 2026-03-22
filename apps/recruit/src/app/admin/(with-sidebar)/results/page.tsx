import {RecruitmentInitializer} from '@/app/admin/(with-sidebar)/recruitment/_components/RecruitmentInitializer';
import {ResultsContainer} from '@/app/admin/(with-sidebar)/results/_components/ResultsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminResultsPage() {
  return (
    <section className='flex flex-col items-center justify-center lg:p-12.5'>
      <RecruitmentInitializer>
        <SuspenseWrapper>
          <ResultsContainer />
        </SuspenseWrapper>
      </RecruitmentInitializer>
    </section>
  );
}
