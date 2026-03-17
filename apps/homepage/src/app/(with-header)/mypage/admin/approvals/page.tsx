import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {ApprovalContainer} from './_containers/ApprovalContainer';

export default function ApprovalPage() {
  return (
    <section className='flex flex-col px-4 pt-2.5 lg:p-12.5'>
      <div className='flex flex-col gap-6.75 lg:min-w-275'>
        <h1 className='text-h2 sr-only md:not-sr-only md:block'>
          신규 가입 승인
        </h1>
        <SuspenseWrapper>
          <ApprovalContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
