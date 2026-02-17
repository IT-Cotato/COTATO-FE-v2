import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {ApprovalContainer} from './_containers/ApprovalContainer';

export default function ApprovalPage() {
  return (
    <section className='flex flex-col p-12.5'>
      <div className='flex min-w-275 flex-col gap-6.75'>
        <h1 className='text-h4'>신규 가입 승인</h1>
        <SuspenseWrapper>
          <ApprovalContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
