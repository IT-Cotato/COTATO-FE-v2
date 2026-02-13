import {TermsContainer} from '@/app/(with-header)/mypage/terms/_containers/TermsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function TermsPage() {
  return (
    <section className='flex min-w-250 flex-col px-11.25 py-16'>
      <SuspenseWrapper>
        <TermsContainer />
      </SuspenseWrapper>
    </section>
  );
}
