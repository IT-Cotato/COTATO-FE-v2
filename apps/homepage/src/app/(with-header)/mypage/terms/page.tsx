import {TermsContainer} from '@/app/(with-header)/mypage/terms/_containers/TermsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function TermsPage() {
  return (
    <section className='flex w-full flex-col py-5 lg:min-w-250 lg:px-11.25 lg:py-16'>
      <SuspenseWrapper>
        <TermsContainer />
      </SuspenseWrapper>
    </section>
  );
}
